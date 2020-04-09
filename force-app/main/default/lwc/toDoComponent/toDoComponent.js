import { LightningElement, api, track } from 'lwc';
import updateToDoStatus from '@salesforce/apex/toDoController.updateToDoStatus';
import updateToDoNameDescription from '@salesforce/apex/toDoController.updateToDoNameDescription'

export default class ToDoComponent extends LightningElement {
    @api todo;
    @track todo;
    @track value = '';
    @track showModal = false;


    get options() {
        return [
            { label: 'Not Started', value: 'Not Started' },
            { label: 'In Progress', value: 'In Progress' },
            { label: 'Completed', value: 'Completed' },
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
        //update this todo's Status__c 
        console.log('handlinbg the status update');
        console.log('the todo we will update has an id of: ' + this.todo.Id);
     
        updateToDoStatus({toDoId : this.todo.Id, toDoValue : this.value})
            .then(result => {
                console.log("success!!");
                console.log(result);
                this.todo = result;
            })
            .catch(error => {
                console.log("failure!!!");
                console.log(error);
        });
    }

    openmodal() {
        this.showModal = true
    }

    closeModal() {
        this.showModal = false
    }

    saveMethod() {
        console.log('save method invoked');
        //console.log(this.template.querySelector("input[data-my-id=name-input]").value);
        //console.log(this.template.querySelector("input[data-my-id=name-input]").placeholder);
        var newName = this.template.querySelector("input[data-my-id=name-input]").placeholder;
        var newDescription = this.template.querySelector("input[data-my-id=description-input]").placeholder;

        console.log('passed variable dec');

        if(this.template.querySelector("input[data-my-id=name-input]").value != "") {
            newName = this.template.querySelector("input[data-my-id=name-input]").value;
        } else {
            console.log('in else');
            newName = this.todo.Name;
        }

        if(this.template.querySelector("input[data-my-id=description-input]").value != "") {
            newDescription = this.template.querySelector("input[data-my-id=description-input]").value;
        } else {
            console.log('in else 2');
            newDescription = this.todo.Description__c;
        }

        updateToDoNameDescription({toDoId : this.todo.Id, name : newName, description : newDescription})
        .then(result => {
            console.log("success!!");
            console.log(result);
            this.todo = result;
        })
        .catch(error => {
            console.log("failure!!!");
            console.log(error);
        });
        this.closeModal();
    }


}