export default class CollapsibleChecklists {
    constructor() {
        this.checklistContainers = Array.from(document.getElementsByClassName("checkbox-box"));
        this.setCollapsibleChecklists();
    }

    setCollapsibleChecklists() {
        this.checklistContainers.forEach(checklistContainer => new this.CollapsibleChecklist(checklistContainer));
    }

    CollapsibleChecklist = class {
        constructor(checklistContainer) {
            this.checklistContainer = checklistContainer;
            this.checklist = this.checklistContainer.querySelector(".checkbox-box__checklist");
            this.checkboxes = this.checklistContainer.getElementsByClassName("checkbox-box__checkbox");
            this.addItemTextInput = this.checklistContainer.querySelector(".checkbox-box__add-input");
            this.addItemButton = this.checklistContainer.querySelector(".checkbox-box__add-btn");
                
            // Tag List Information
            this.tagList = this.checklistContainer.querySelector(".checkbox-box__tags");
            this.tagListID = this.tagList.id;
            this.tagListName = this.tagList.parentElement.childNodes[0].nodeValue;

            this.addExistingChecklistItems();
            this.checkIfEmpty();
            this.events();
        }
    
        events() {
            // Event delegation is not required because the addItemTextInput is in the markup
            this.addItemTextInput.addEventListener("keyup", event => {
                if (event.code === "Enter") {
                    this.addToChecklist(this.addItemTextInput.value);
                    this.addItemTextInput.value = "";
                }
            });
            this.addItemButton.addEventListener("click", () => {
                this.addToChecklist(this.addItemTextInput.value);
                this.addItemTextInput.value = "";
            });
        }

        mapValuesOfChecklist() {
            let currentCheckboxes = Array.from(this.checkboxes); // array from live HTML collection
            return currentCheckboxes.map(this.getChecklistItemValue);
        }

        isInChecklist(value) {
            return this.mapValuesOfChecklist().includes(value);
        }

        getChecklistItemValue(checkbox) {
            return checkbox.parentElement.querySelector(".checkbox-box__text").textContent.trim();
        }

        getCheckboxOfValue(value) {
            return this.checkboxes[this.mapValuesOfChecklist().indexOf(value)];
        }

        addExistingChecklistItems() {
            this.mapValuesOfChecklist().forEach(value => new this.ChecklistItem(value, this));
        }

        addToChecklist(value) {
            if (value != "" && value != null && !(this.isInChecklist(value))) {
                new this.ChecklistItem(value, this);
            } else if (this.isInChecklist(value)) {
                this.getCheckboxOfValue(value).checked = true;
            }
        }

        checkIfEmpty() {
            let activeTags = Array.from(this.tagList.children).filter(tag => !tag.hidden);
            if (!activeTags.length) {
                this.tagList.insertAdjacentHTML("afterbegin", `<span>No tags added.</span>`);
            }
        }

        ChecklistItem = class {
            constructor(value, collapsibleChecklist) {
                this.collapsibleChecklist = collapsibleChecklist;
                this.itemValue = value;

                // Checkbox
                this.checkboxID = this.itemValue.replace(/\s/g, "");
                this.checkboxHTML = `
                    <label for="${this.checkboxID}" class="checkbox-box__checkbox-label">
                        <input type="checkbox" id="${this.checkboxID}" class="checkbox checkbox-box__checkbox" name="gender" value="${this.itemValue}" checked="">
                        <span class="checkbox-box__text">${this.itemValue}</span>
                    </label>`
                this.addCheckboxIfAbsent();
                this.checkbox = document.getElementById(this.checkboxID);
                
                // Tag
                this.itemTagID = `${this.collapsibleChecklist.tagListID}-${this.checkboxID}-tag`;
                this.tagHTML = `
                    <li id="${this.itemTagID}" class="checkbox-box__tag"><a class="checkbox-box__tag-remove" title="Uncheck &quot;${this.itemValue}&quot; from ${this.collapsibleChecklist.tagListName}"><i class="fas fa-times"></i></a>${this.itemValue}</li>`
                this.addCollapsedTag();
                this.tag = document.getElementById(this.itemTagID);
                this.showTagIfChecked();

                this.events();
            }

            events() {
                // Event delegation is not required because the checkbox & tag are already created when this function runs
                this.checkbox.addEventListener("click", () => this.showTagIfChecked());
                this.tag.querySelector(`a`).addEventListener("click", () => this.uncheckItem());
            }

            addCheckboxIfAbsent() {
                if (!(this.collapsibleChecklist.isInChecklist(this.itemValue))) {
                    this.collapsibleChecklist.checklist.insertAdjacentHTML('beforeend', this.checkboxHTML);
                }
            }

            addCollapsedTag() {
                this.collapsibleChecklist.tagList.insertAdjacentHTML('beforeend', this.tagHTML);
            }

            showTagIfChecked() {
                if (this.checkbox.checked) {
                    if (this.collapsibleChecklist.tagList.querySelector("span")) {
                        this.collapsibleChecklist.tagList.removeChild(this.collapsibleChecklist.tagList.querySelector("span"));
                    }
                    this.tag.hidden = false;
                } else {
                    this.tag.hidden = true;
                }
            }

            uncheckItem() {
                this.tag.hidden = true;
                this.checkbox.checked = false;
                this.collapsibleChecklist.checkIfEmpty();
            }
        }
    }
}