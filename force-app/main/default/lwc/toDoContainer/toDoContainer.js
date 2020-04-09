import { LightningElement, wire, track } from 'lwc';
import getAllToDos from '@salesforce/apex/toDoController.getAllToDos';
import createNewToDo from '@salesforce/apex/toDoController.createNewToDo';

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
        console.log('save it!');
        var newName = this.template.querySelector("input[data-my-id=name-input]").value;
        var newDescription = this.template.querySelector("input[data-my-id=description-input]").value;
        console.log(newName);
        console.log(newDescription);

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
                console.log('error in repopulating todos');
                console.log(errror);
            })
        })
        .catch(error => {
            console.log("failure!!!");
            console.log(error);
        });
        this.showCreateModal = false
    }
}