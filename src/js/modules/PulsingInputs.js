export default class PulsingInputs {
    constructor(selector) {
        this.selector = selector;
        this.events();
    }

    events() {
        // Event delegation required because inputs can be created dynamically
        document.querySelector("body").addEventListener("click", event => {
            event.preventDefault;
            if (event.target.matches(this.selector) || event.target.closest(this.selector)) {
                this.pulse(event.target);
            }
        });
    }

    pulse(input) {
        input.classList.remove("activated");
        void input.offsetWidth;
        input.classList.add("activated");
        setTimeout(
            input => input.classList.remove("activated"),
            parseFloat(getComputedStyle(input).animationDuration, 10) * 1000,
            input
        );
    }
}