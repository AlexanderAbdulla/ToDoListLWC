import { LightningElement, wire, track } from 'lwc';
import getAllToDos from '@salesforce/apex/toDoController.getAllToDos';
import createNewToDo from '@salesforce/apex/toDoController.createNewToDo';
import deleteToDo from '@salesforce/apex/toDoController.deleteToDo';


export default class ToDoContainer extends LightningElement {
    @track ToDos;
    @track showCreateModal = false;

    @wire(getAllToDos)
    toDos({error, data}) {
        if(data) {
            this.ToDos = data;
        } else if (error) {
            this.ToDos = undefined;
        }
     }

    closeCreateModal() {
        this.showCreateModal = false
    }

    addNewToDoModal() {
        this.showCreateModal = true;
    }

    saveCreateModal() {
        var newName = this.template.querySelector("input[data-my-id=name-input]").value;
        var newDescription = this.template.querySelector("input[data-my-id=description-input]").value;
   
        createNewToDo({name : newName, description : newDescription})
        .then(result => {
            console.log("success!!");
            console.log(result);
            // this.todo = result;
            getAllToDos()
            .then(result => {
                console.log('successfully repopulated');
                this.ToDos = result;
            })
            .catch(error => {
                console.log(error);
            })
        })
        .catch(error => {
            console.log(error);
        });
        this.showCreateModal = false
    }

    handleDeleteToDo(event) {
        console.log('in parent handling event');
        console.log(event.detail.toDoId);

        deleteToDo({toDoId : event.detail.toDoId})
        .then(result => {
            console.log('success');
            
            getAllToDos()
            .then(result => {
                console.log('successfully repopulated');
                this.ToDos = result;
            })
            .catch(error => {
                console.log(error);
            })


        })
        .catch(error => {
            console.log('failure');
            console.log(error);
        });
    }
}