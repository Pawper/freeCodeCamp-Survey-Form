import TagSection from "./TagSection";

export default class TagSetSelects {
    constructor() {
        this.tagSetSelectContainers = Array.from(document.getElementsByClassName("add-from-set"));
        this.setTagSetSelects();
    }

    setTagSetSelects() {
        this.tagSetSelectContainers.forEach(tagSetSelectContainer => new this.TagSetSelect(tagSetSelectContainer));
    }

    TagSetSelect = class {
        constructor(tagSetSelectContainer) {
            this.tagSetSelectContainer = tagSetSelectContainer;
            this.tagSetSelect = this.tagSetSelectContainer.querySelector(".add-from-set__select");
            this.tagSetAddButton = this.tagSetSelectContainer.querySelector(".add-from-set__add-btn");
            this.tagSections = Array.from(document.querySelectorAll(".add-from-set + * > .tag-box"));
            this.fillSetSelect();
            this.setTagSections();
            this.events();
        }
        
        events() {
            this.tagSetAddButton.addEventListener("click", () => {
                this.parseTagsFromSelect();
            });
        }

        fillSetSelect = async function () {
            const response = await fetch("../pronouns.tab");
            const text = await response.text();
            const pronounSets = await text.replaceAll("\t", " / ").split("\n");
            pronounSets.forEach(pronounSet => {
                this.tagSetSelect.options[this.tagSetSelect.options.length] = new Option(pronounSet, pronounSet);
            });
        }

        setTagSections() {
            this.tagSections = this.tagSections.map(tagSection => new TagSection(tagSection));
        }

        parseTagsFromSelect() {
            let setSelectText = this.tagSetSelect.options[this.tagSetSelect.selectedIndex].text;
            let tagValues = setSelectText.split(" / ");
            this.addTagSetToTagSections(tagValues);
        }

        addTagSetToTagSections(tagValues) {
            tagValues.forEach((tagValue, index) => {
                this.tagSections[index].createTag(tagValue);
            });
        }
    }
}