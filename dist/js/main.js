let surveyForm = document.getElementById("survey-form");
surveyForm.onkeypress = (keypress) => {
  let key = keypress.code || keypress.key || 0;
  if (key === "Enter") {
    keypress.preventDefault();
    console.log(`Disabled submitting form with ${key}.`);
  }
};

let genderFields = document.querySelectorAll(".genderFields");
function toggleGenderField(genderField, index, array) {
  console.log(`Toggled gender fieldset:`);
  console.log(genderField);
  genderField.classList.toggle("hidden");
}

let toggleInputs = [
  document.getElementById("toggleA"),
  document.getElementById("toggleB"),
];
toggleInputs.forEach((toggleInput) => {
  toggleInput.addEventListener("change", () => {
    genderFields.forEach(toggleGenderField);
  });
});

let checkboxes = document.getElementsByClassName("checkbox");
function checkboxPulse() {
  Array.prototype.forEach.call(checkboxes, (checkbox) => {
    checkbox.addEventListener(
      "click",
      (event) => {
        event.preventDefault;
        checkbox.classList.remove("activated");
        void checkbox.offsetWidth;
        checkbox.classList.add("activated");
        setTimeout(
          (checkbox) => {
            checkbox.classList.remove("activated");
          },
          parseFloat(getComputedStyle(checkbox).animationDuration, 10) * 1000,
          checkbox
        );
      },
      false
    );
  });
}
checkboxPulse();

let pronounSets = [];
let pronounSelect = document.getElementById("dropdown");
fetch("./pronouns.tab")
  .then((response) => response.text())
  .then((text) => {
    let lines = text.split("\n");
    lines.forEach((line) => {
      pronounSet = line.replaceAll("\t", " / ");
      pronounSets.push(pronounSet);
    });
    pronounSets.pop();
    for (pronounSet in pronounSets) {
      pronounSelect.options[pronounSelect.options.length] = new Option(
        pronounSets[pronounSet],
        pronounSet
      );
    }
  });

function addTag(tagValue, tagListID) {
  if (tagValue == "" || tagValue == null || tagValue == `Add from set...`) {
    console.log(`Tag input is empty`);
  } else if (
    document
      .getElementById(tagListID)
      .querySelector(`[value="${tagValue}"]`) !== null
  ) {
    console.log(`Tag exists`);
  } else {
    console.log(`Function received "${tagValue}".`);
    let tagList = document.getElementById(tagListID);
    let tagListName = tagList.parentElement.childNodes[0].nodeValue;
    console.log(`Tag list ${tagListName}:`);
    console.log(tagList);

    let tag = document.createElement("li");
    tag.setAttribute("class", "tag-box__tag");
    tag.innerHTML = `
        <a class="tag-box__tag-remove" title="Remove &quot;${tagValue}&quot; from ${tagListName}">
        <i class="fas fa-times"></i>
        </a>${tagValue}<input type="text" class="tag-box__tag-form-save" name="${tagListName}" value="${tagValue}">`;

    tagList.appendChild(tag);
    console.log(`Added ${tagValue}:`);
    console.log(tag);

    let tagRemove = tag.getElementsByTagName("a")[0];
    tagRemove.addEventListener("click", () => {
      console.log(`Removed ${tagValue}:`);
      console.log(tag);
      tag.parentElement.removeChild(tag);
    });
  }
}

let tagListIDs = [];
function createPronounSectionIDList() {
  let tagLists = document
    .getElementsByClassName("pronouns-container")[0]
    .getElementsByClassName("tag-box__tags");
  Object.keys(tagLists).forEach((tagList) => {
    let id = tagLists[tagList].id;
    tagListIDs.push(id);
  });
}
createPronounSectionIDList();

let pronounSetAddBtn = document.getElementsByClassName(
  "add-from-set__add-btn"
)[0];
let selectPronounSet = document.getElementsByClassName(
  "add-from-set__select"
)[0];
pronounSetAddBtn.addEventListener("click", () => {
  let pronounSetText =
    selectPronounSet.options[selectPronounSet.selectedIndex].text;
  console.log(`Clicked add button to add tags ${pronounSetText}:`);
  let tagValues = pronounSetText.split(" / ");
  let pronounsObject = tagListIDs.reduce(
    (object, value, index) => ((object[value] = tagValues[index]), object),
    {}
  );
  console.log(pronounsObject);
  new Map(Object.entries(pronounsObject)).forEach(addTag);
});

let addTagInputs = document.getElementsByClassName("tag-box__add-input");
function addTagPressEnter(addTagInput) {
  addTagInput.addEventListener("keyup", (event) => {
    if (event.code === "Enter") {
      let tagListID = addTagInput.parentNode.parentNode
        .getElementsByClassName("tag-box__summary")[0]
        .getElementsByClassName("tag-box__tags")[0].id;
      let tagValue = addTagInput.value;
      console.log(`${event.code} pressed to add tag ${tagValue}:`);
      addTag(tagValue, tagListID);
      addTagInput.value = "";
    }
  });
}

Object.keys(addTagInputs).forEach((addTagInput) => {
  addTagPressEnter(addTagInputs[addTagInput]);
});

const addTagButtons = document.getElementsByClassName("tag-box__add-btn");
function addTagButtonClick(addTagButton) {
  addTagButton.addEventListener("click", () => {
    let tagListID = addTagButton.parentNode.parentNode
      .getElementsByClassName("tag-box__summary")[0]
      .getElementsByClassName("tag-box__tags")[0].id;
    let tagInput = addTagButton.parentNode.getElementsByClassName(
      "tag-box__add-input"
    )[0];
    let tagValue = tagInput.value;
    console.log(`Clicked add button to add tag ${tagValue}:`);
    addTag(tagValue, tagListID);
    tagInput.value = "";
  });
}

Object.keys(addTagButtons).forEach((addTagButton) => {
  addTagButtonClick(addTagButtons[addTagButton]);
});

const checklists = document.getElementsByClassName("checkbox-box");

function checklistInputChange(input) {
  input.addEventListener("click", () => {
    let checkboxValue = input.parentElement
      .getElementsByClassName("checkbox-box__text")[0]
      .textContent.trim();
    let checkboxTagListID = input.parentElement.parentElement.parentElement
      .getElementsByClassName("checkbox-box__summary")[0]
      .getElementsByClassName("checkbox-box__tags")[0].id;

    if (input.checked) {
      console.log(`Checked ${input.id};`);
      addCheckboxTag(checkboxValue, checkboxTagListID);
    } else {
      console.log(`Unchecked ${input.id};`);
      removeCheckboxTag(checkboxValue, checkboxTagListID);
    }
  });
}

Object.keys(checklists).forEach((checklist) => {
  let checklistInputs = checklists[checklist].getElementsByClassName(
    "checkbox-box__checkbox"
  );
  Object.keys(checklistInputs).forEach((input) => {
    checklistInputChange(checklistInputs[input]);
  });
});

function addCheckboxTag(checkboxValue, checkboxTagListID) {
  console.log(`Checkbox tag list:`);
  let checkboxTagList = document.getElementById(checkboxTagListID);
  console.log(checkboxTagList);

  let checkboxTagListName =
    checkboxTagList.parentElement.childNodes[0].nodeValue;
  let checkboxTagID = `${checkboxTagListID}-${checkboxValue.replace(
    /\s/g,
    ""
  )}-tag`;

  let checkboxTag = document.createElement("li");
  checkboxTag.setAttribute("class", "checkbox-box__tag");
  checkboxTag.setAttribute("id", checkboxTagID);
  checkboxTag.innerHTML = `<a class="checkbox-box__tag-remove" title="Uncheck &quot;${checkboxValue}&quot; from ${checkboxTagListName}"><i class="fas fa-times"></i></a>${checkboxValue}
    `;

  checkboxTagList.appendChild(checkboxTag);
  console.log(`Added ${checkboxValue} tag:`);
  console.log(checkboxTag);

  let checkboxTagRemove = checkboxTag.getElementsByTagName("a")[0];
  checkboxTagRemove.addEventListener("click", () => {
    removeCheckboxTag(checkboxValue, checkboxTagListID);
    let checkboxID = checkboxValue.replace(/\s/g, "");
    document.getElementById(checkboxID).checked = false;
  });

  // TODO: Prevent propagation
}

function removeCheckboxTag(checkboxValue, checkboxTagListID) {
  let checkboxTagList = document.getElementById(checkboxTagListID);
  console.log(`Checkbox tag list:`);
  console.log(checkboxTagList);

  let checkboxTagID = `${checkboxTagListID}-${checkboxValue.replace(
    /\s/g,
    ""
  )}-tag`;
  let checkboxTag = document.getElementById(checkboxTagID);
  checkboxTagList.removeChild(checkboxTag);
  console.log(`Removed ${checkboxValue} tag:`);
  console.log(checkboxTag);
}

let addCheckboxInputs = document.getElementsByClassName(
  "checkbox-box__add-input"
);
Object.keys(addCheckboxInputs).forEach((addCheckboxInput) => {
  addCheckboxPressEnter(addCheckboxInputs[addCheckboxInput]);
});

function addCheckboxPressEnter(addCheckboxInput) {
  addCheckboxInput.addEventListener("keyup", (event) => {
    if (event.code === "Enter") {
      let checkboxListID = addCheckboxInput.parentNode.parentNode
        .getElementsByClassName("checkbox-box__summary")[0]
        .getElementsByClassName("checkbox-box__tags")[0].id;
      let checkboxValue = addCheckboxInput.value;
      console.log(`Enter pressed to add checkbox ${checkboxValue}:`);
      addCheckbox(checkboxValue, checkboxListID);
      addCheckboxInput.value = "";
    }
  });
}

let addCheckboxButtons = document.getElementsByClassName(
  "checkbox-box__add-btn"
);
Object.keys(addCheckboxButtons).forEach((addCheckboxButton) => {
  addCheckboxButtonClick(addCheckboxButtons[addCheckboxButton]);
});

function addCheckboxButtonClick(addCheckboxButton) {
  addCheckboxButton.addEventListener("click", () => {
    let checkboxTagListID = addCheckboxButton.parentNode.parentNode
      .getElementsByClassName("checkbox-box__summary")[0]
      .getElementsByClassName("checkbox-box__tags")[0].id;
    let checkboxInput = addCheckboxButton.parentNode.getElementsByClassName(
      "checkbox-box__add-input"
    )[0];
    let checkboxValue = checkboxInput.value;
    console.log(`Clicked add button to add checkbox ${checkboxValue}:`);
    addCheckbox(checkboxValue, checkboxTagListID);
    checkboxInput.value = "";
  });
}

function addCheckbox(checkboxValue, checkboxTagListID) {
  let checkList = document
    .getElementById(checkboxTagListID)
    .parentNode.parentNode.getElementsByClassName(
      "checkbox-box__expand-container"
    )[0];
  console.log(`Checking if checkbox exists...`);
  console.log(checkList.querySelector(`[value="${checkboxValue}"]`));

  if (
    checkboxValue == "" ||
    checkboxValue == null ||
    checkboxValue == "Add from set..."
  ) {
    console.log(`Checkbox input is empty.`);
  } else if (checkList.querySelector(`[value="${checkboxValue}"]`) !== null) {
    console.log(`Checkbox exists.`);
  } else {
    console.log(`Function received "${checkboxValue}".`);

    addCheckboxTag(checkboxValue, checkboxTagListID);

    console.log(`Checklist:`);
    console.log(checkList);

    let checkboxID = checkboxValue.replace(/\s/g, "");

    let addedCheckboxLabel = document.createElement("label");
    addedCheckboxLabel.setAttribute("for", checkboxID);
    addedCheckboxLabel.setAttribute("class", "checkbox-box__checkbox-label");
    addedCheckboxLabel.innerHTML = `
        <input type="checkbox" id="${checkboxID}" class="checkbox checkbox-box__checkbox" name="gender" value="${checkboxValue}" checked="">
        <span class="checkbox-box__text">
          ${checkboxValue}
        </span>`;

    checkList.insertBefore(
      addedCheckboxLabel,
      checkList.getElementsByClassName("checkbox-box__add-input")[0]
    );

    let addedCheckboxInput = addedCheckboxLabel.getElementsByTagName(
      "input"
    )[0];
    addedCheckboxInput.addEventListener(
      "click",
      () => {
        addedCheckboxInput.preventDefault;
        addedCheckboxInput.classList.remove("activated");
        void addedCheckboxInput.offsetWidth;
        addedCheckboxInput.classList.add("activated");
        setTimeout(
          (checkbox) => {
            checkbox.classList.remove("activated");
          },
          parseFloat(
            getComputedStyle(addedCheckboxInput).animationDuration,
            10
          ) * 1000,
          addedCheckboxInput
        );
      },
      false
    );

    checklistInputChange(addedCheckboxInput);

    console.log(`Added ${checkboxValue} checkbox:`);
    console.log(addedCheckboxLabel);
  }
}
