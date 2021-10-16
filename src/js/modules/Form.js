export default class Form {
    constructor() {
        this.form = document.getElementById("survey-form");
        this.events();
    }

    events() {
        this.form.onkeydown = keypress => {
            let key = keypress.code || keypress.key || 0;
            if (key === "Enter") {
              keypress.preventDefault();
            }
        }

        this.form.addEventListener("submit", event => {
            event.preventDefault();
        })
    }
}