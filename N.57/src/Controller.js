'use strict';

export default class Controller {

    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.setChange(
            checked => {
                if (checked) {
                    this.registerModel();
                } else {
                    this.model.setListener(() => null);
                }
            }
        );

        this.registerModel();
    }

    registerModel() {
        this.model.setListener(() => this.view.render(this.model));
        this.view.render(this.model);
    }
}

