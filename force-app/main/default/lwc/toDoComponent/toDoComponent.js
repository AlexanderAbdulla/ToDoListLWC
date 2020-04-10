import { LightningElement, api, track } from 'lwc';
import updateToDoStatus from '@salesforce/apex/toDoController.updateToDoStatus';
import updateToDoNameDescription from '@salesforce/apex/toDoController.updateToDoNameDescription';

export default class ToDoComponent extends LightningElement {
    @api todo;
    @track todo;
    @track value = '';
    @track showModal = false;
    @track showDeleteModal = false;


    get options() {
        return [
            { label: 'Not Started', value: 'Not Started' },
            { label: 'In Progress', value: 'In Progress' },
            { label: 'Completed', value: 'Completed' },
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
     
        updateToDoStatus({toDoId : this.todo.Id, toDoValue : this.value})
            .then(result => {
                this.todo = result;
            })
            .catch(error => {
                console.log(error);
        });
    }

    openDeleteModal() {
        console.log('delete modal fx open');
        this.showDeleteModal = true;
    }

    closeDeleteModal() {
        console.log('close delete modal');
        this.showDeleteModal = false;
    }

    confirmDeleteModal() {
        console.log('confirm, delete modal child');
        
        // event bubble this to top
        const deleteToDoEvent = new CustomEvent("handledeletetodo", {
            detail : {
                toDoId : this.todo.Id
            }
        });
        this.dispatchEvent(deleteToDoEvent);

        /*

        deleteToDo({toDoId : this.todo.Id})
        .then(result => {
            console.log('success');
            this.todo = result;
        })
        .catch(error => {
            console.log('failure');
            console.log(error);
        });

        */

        // end event bubble 

        this.showDeleteModal = false;
    }

    openmodal() {
        this.showModal = true
    }

    closeModal() {
        this.showModal = false
    }

    saveMethod() {
        var newName = this.template.querySelector("input[data-my-id=name-input]").placeholder;
        var newDescription = this.template.querySelector("input[data-my-id=description-input]").placeholder;

        if(this.template.querySelector("input[data-my-id=name-input]").value != "") {
            newName = this.template.querySelector("input[data-my-id=name-input]").value;
        } else {
            newName = this.todo.Name;
        }

        if(this.template.querySelector("input[data-my-id=description-input]").value != "") {
            newDescription = this.template.querySelector("input[data-my-id=description-input]").value;
        } else {
            newDescription = this.todo.Description__c;
        }

        updateToDoNameDescription({toDoId : this.todo.Id, name : newName, description : newDescription})
        .then(result => {
            this.todo = result;
        })
        .catch(error => {
            console.log(error);
        });
        this.closeModal();
    }


}