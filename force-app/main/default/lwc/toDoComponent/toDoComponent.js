import { LightningElement, api, track } from 'lwc';

export default class ToDoComponent extends LightningElement {
    @api todo;
    @track value = 'inProgress';

    get options() {
        return [
            { label: 'New', value: 'new' },
            { label: 'In Progress', value: 'inProgress' },
            { label: 'Finished', value: 'finished' },
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
    }

}