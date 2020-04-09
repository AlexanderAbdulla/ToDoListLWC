import { LightningElement, wire, track } from 'lwc';
import getAllToDos from '@salesforce/apex/toDoController.getAllToDos';

export default class ToDoContainer extends LightningElement {
    @track ToDos;
    @track showCreateModal = false;

    @wire(getAllToDos)
    toDos({error, data}) {
        if(data) {
            this.ToDos = data;
            console.log("succesfully loaded data");
            console.log(data);
        } else if (error) {
            this.ToDos = undefined;
            console.log("there was an error");
            console.log(error);
        }
     }

    closeCreateModal() {
        this.showCreateModal = false
    }

    addNewToDoModal() {
        console.log('hey hey hey');
        this.showCreateModal = true;
    }

    saveCreateModal() {
        this.showCreateModal = false
    }
}