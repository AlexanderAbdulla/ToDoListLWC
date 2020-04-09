import { LightningElement, api, track } from 'lwc';
import updateToDoStatus from '@salesforce/apex/toDoController.updateToDoStatus';

export default class ToDoComponent extends LightningElement {
    @api todo;
    @track todo;
    @track value = '';

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

}