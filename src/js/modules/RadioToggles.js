export default class RadioToggles {
    constructor() {
        this.toggles = Array.from(document.getElementsByClassName("radio-toggle"));
        this.setRadioToggles();
    }

    setRadioToggles() {
        this.toggles = this.toggles.map(toggle => new this.RadioToggle(toggle));
    }

    RadioToggle = class {
        constructor(toggle) {
            this.toggle = toggle;
            this.toggleSides = this.toggle.querySelectorAll('[type="radio"]');
            this.toggleTarget = this.toggle.parentElement.querySelector(".radio-toggle + *");
            this.events()
        }

        events() {
            this.toggleSides.forEach(toggleSide => {
                toggleSide.addEventListener("change", () => this.toggleElements());
            });
        }

        toggleElements() {
            this.toggleTarget.classList.toggle("hidden");
        }
    }
}