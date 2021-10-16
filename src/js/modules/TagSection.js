export default class TagSection {
    constructor(tagSection) {
        this.tagSection = tagSection;
        this.tagList = this.tagSection.querySelector(".tag-box__tags");
        this.tagListID = this.tagList.id;
        this.tagListName = this.tagList.parentElement.childNodes[0].nodeValue;
        this.addTagInput = this.tagSection.querySelector(".tag-box__add-input");
        this.addTagButton = this.tagSection.querySelector(".tag-box__add-btn");
        
        this.tags = this.tagList.getElementsByClassName("tag-box__tag");

        this.events();
    }

    events() {
        // Event delegation is not required because the addItemTextInput is in the markup
        this.addTagInput.addEventListener("keyup", event => {
            if (event.code === "Enter") {
                this.createTag(this.addTagInput.value);
                this.addTagInput.value = "";
            }
        });
        this.addTagButton.addEventListener("click", () => {
            this.createTag(this.addTagInput.value);
            this.addTagInput.value = "";
        });
    }

    mapValuesOfTagList() {
        let currentTags = Array.from(this.tags); // array from live HTML collection
        return currentTags.map(this.getTagValue);
    }

    isInTagList(tagValue) {
        return this.mapValuesOfTagList().includes(tagValue);
    }

    getTagValue(tag) {
        return tag.querySelector(".tag-box__tag-form-save").value;
    }

    createTag(tagValue) {
        if (tagValue != "" && tagValue != null && !(this.isInTagList(tagValue))) {
            new this.Tag(tagValue, this);
        }                
    }

    Tag = class {
        constructor(tagValue, tagSection) {
            this.tagSection = tagSection;
            this.tagValue = tagValue;
            this.tagID = `${this.tagSection.tagListID}-${this.tagValue.replace(/\s/g,"")}-tag`;
            this.tagHTML = `<li id="${this.tagID}" class="tag-box__tag"><a class="tag-box__tag-remove" title="Remove &quot;${this.tagValue}&quot; from ${this.tagSection.tagListName}">
                <i class="fas fa-times"></i>
                </a>${this.tagValue}<input type="text" class="tag-box__tag-form-save" name="${this.tagSection.tagListName}" value="${this.tagValue}"></li>`
            this.addTag();
            this.tag = document.getElementById(this.tagID);

            this.events();
        }
        
        events() {             
            // Event delegation is not required because the tag is already created when this function runs   
            this.tag.querySelector("a").addEventListener("click", () => this.removeTag());
        }

        addTag() {
            this.tagSection.tagList.insertAdjacentHTML('beforeend', this.tagHTML);
        }

        removeTag() {
            this.tagSection.tagList.removeChild(this.tag);
        }
    }
}