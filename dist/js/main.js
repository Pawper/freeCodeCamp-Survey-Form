// Disable default form behavior when enter is pressed
let surveyFrom = document.getElementById("survey-form");
surveyFrom.onkeypress = function(keypress) {
  console.log('Disabled submitting form with enter.');
  var key = keypress.code || keypress.key || 0;     
  if (key === 'Enter') {
    keypress.preventDefault();
  }
}

// Toggle shows/hides gender fieldsets
let toggleA = document.getElementById('genderToggleA');
let toggleB = document.getElementById('genderToggleB');
let genderFields = document.querySelectorAll('.genderFields');
function toggleGenderField(genderField, index, array) {
  console.log('Toggled gender fieldset:');
  console.log(genderField);
  genderField.classList.toggle('hidden');
};
toggleA.addEventListener("change", function () {
  genderFields.forEach(toggleGenderField);
});
toggleB.addEventListener("change", function () {
  genderFields.forEach(toggleGenderField);
});

// Function - loop through checkboxes, add click listeners to add animation class
const checkboxes = document.getElementsByClassName('checkbox');
function checkboxPulse() {
  for (var checkbox = 0; checkbox < checkboxes.length; checkbox++) {
    checkboxes[checkbox].addEventListener("click", function () {
      this.preventDefault;
      this.classList.remove("activated");
      void this.offsetWidth;
      this.classList.add("activated");
      setTimeout(
        function (checkbox) {
          checkbox.classList.remove("activated");
        },
        parseFloat(getComputedStyle(this).animationDuration, 10) * 1000,
        this
      );
    }, false);
  }
}

// Call the above function
checkboxPulse();

/////////////////////// FILL SELECT DROPDOWN //////////////////////////

const pronounSets = [];
let pronounSelect = document.getElementById('dropdown');
fetch('./pronouns.tab')
  .then(response => response.text())
  .then(text => {
    let lines = text.split('\n');
    lines.forEach(function(line) {
      pronounSet = line.replaceAll('\t', ' / ');
      pronounSets.push(pronounSet);
    });
    pronounSets.pop();
    for(pronounSet in pronounSets) {
      pronounSelect.options[pronounSelect.options.length] = new Option(pronounSets[pronounSet], pronounSet);
    }
  });

/////////////////////// ADD TAG //////////////////////////

function addTag(tagValue, tagListID) {
  if (tagValue == "" || tagValue == null || tagValue == 'Add from set...') {
    console.log('Tag input is empty');
  } else if (document.getElementById(tagListID).querySelector('[value="' + tagValue + '"') !== null) {
    console.log('Tag exists')
  } else {
    console.log("Function received " + tagValue);
    console.log("Tag list:");
    let tagList = document.getElementById(tagListID);
    console.log(tagList);

    // Tag list name
    let tagListName = tagList.parentElement.childNodes[0].nodeValue;

    // Create tag element & text node, set attributes  
    let tag = document.createElement('li');
      tag.setAttribute('class', 'tag-box__tag');
  
    let tagRemove = document.createElement('a');
      tagRemove.setAttribute('class','tag-box__tag-remove');
      tagRemove.setAttribute('title','Remove "' + tagValue + '" from ' + tagListName);
    let tagRemoveIcon = document.createElement('i');
      tagRemoveIcon.setAttribute('class', 'fas fa-times');
      
    let tagText = document.createTextNode(tagValue);
      
    let tagSave = document.createElement('input');
      tagSave.setAttribute('type', 'text');
      tagSave.setAttribute('class', 'tag-box__tag-form-save')
      tagSave.setAttribute('name', tagListName);
      tagSave.setAttribute('value', tagValue);
      
    // Append children to complete total element for tag
    tagRemove.appendChild(tagRemoveIcon);
    tag.appendChild(tagRemove);
    tag.appendChild(tagText);
    tag.appendChild(tagSave);
  
    tagList.appendChild(tag);

    console.log('Added ' + tagSave.value + ':');
    console.log(tag);

    // Remove click
    tagRemove.addEventListener('click', () => {
      console.log('Removed ' + tagSave.value + ':');
      console.log(tag);
      tag.parentElement.removeChild(tag);
    });

  }
}

/////////////////////// ARRAY OF PRONOUN LIST IDs //////////////////////////

const tagListIDs = [];
function createPronounSectionIDList() {
  const tagLists = document.getElementsByClassName('pronouns-container')[0].getElementsByClassName('tag-box__tags');
  Object.keys(tagLists).forEach(function (tagList) {
    let id = tagLists[tagList].id;
    tagListIDs.push(id);
  });
}
createPronounSectionIDList();

/////////////////////// ADD PRONOUN SET FROM SELECT DROPDOWN //////////////////////////

let pronounSetAddBtn = document.getElementsByClassName('add-from-set__add-btn')[0];
let selectPronounSet = document.getElementsByClassName('add-from-set__select')[0];
pronounSetAddBtn.addEventListener("click", function() {
  let pronounSetText = selectPronounSet.options[selectPronounSet.selectedIndex].text;
  console.log('Clicked add button to add tags ' + pronounSetText + ":");

  let tagValues = pronounSetText.split(' / ');

  let pronounsObject = tagListIDs.reduce((object, value, index) => (object[value] = tagValues[index], object), {});
  console.log(pronounsObject);
  new Map(Object.entries(pronounsObject)).forEach(addTag);
});

/////////////////////// SUBMIT TAG //////////////////////////

// Function to pass tagList/tagValue to addTag() when pressing enter in input
const addTagInputs = document.getElementsByClassName('tag-box__add-input');
function addTagPressEnter(addTagInput) {
  addTagInput.addEventListener("keyup", function(event) {
    if (event.code === 'Enter') {
      let tagListID = this.parentNode.parentNode.getElementsByClassName('tag-box__summary')[0].getElementsByClassName('tag-box__tags')[0].id;
      let tagValue = this.value;
      console.log('Enter pressed to add tag ' + tagValue + ":");
      addTag(tagValue, tagListID);
      this.value = '';
    }
  });
}
  
// Loop through tag inputs & call addTagPressEnter()
Object.keys(addTagInputs).forEach(function (addTagInput) {
  addTagPressEnter(addTagInputs[addTagInput]);
});

// Function to pass tagList/tagInput to addTag() when clicking add button
const addTagButtons = document.getElementsByClassName('tag-box__add-btn');
function addTagButtonClick(addTagButton) {
    addTagButton.addEventListener("click", function() {
      let tagListID = this.parentNode.parentNode.getElementsByClassName('tag-box__summary')[0].getElementsByClassName('tag-box__tags')[0].id;
      let tagInput = this.parentNode.getElementsByClassName('tag-box__add-input')[0];
      let tagValue = tagInput.value;
      console.log('Clicked add button to add tag ' + tagValue + ":");
      addTag(tagValue, tagListID);
      tagInput.value = '';
    });
  }

// Loop through add tag buttons & call addTagButtonClick()
Object.keys(addTagButtons).forEach(function (addTagButton) {
      addTagButtonClick(addTagButtons[addTagButton]);
    });


/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////


/////////////////////// CHECKLIST - LISTEN FOR CHECKBOX CHANGE //////////////////////////
// Array of checklists
const checklists = document.getElementsByClassName('checkbox-box');

// Function to pass in below loops - listens for clicks & decides what to do
function checklistInputChange(input) {
  input.addEventListener('click', function () {
    let checkboxValue = input.parentElement.getElementsByClassName('checkbox-box__text')[0].textContent;
    let checkboxTagListID = input.parentElement.parentElement.parentElement.getElementsByClassName('checkbox-box__summary')[0].getElementsByClassName('checkbox-box__tags')[0].id;

    if (input.checked) {
      console.log('Checked ' + input.id)
      // If checked, need to add tag via addCheckboxTag()
      addCheckboxTag(checkboxValue, checkboxTagListID);
    } else {
      console.log('Unchecked ' + input.id)
      // If unchecked, need to remove tag via removeCheckboxTag()     
      removeCheckboxTag(checkboxValue, checkboxTagListID);
    }
  });
}

// Loop through checklists & loop through inputs
Object.keys(checklists).forEach(function (checklist) {
  let checklistInputs = checklists[checklist].getElementsByClassName('checkbox-box__checkbox');
  
  // Loop through inputs & call checklistInputChange()
  Object.keys(checklistInputs).forEach(function (input) {
    checklistInputChange(checklistInputs[input]);
  });
});

/////////////////////// ADD CHECKBOX TAG //////////////////////////

function addCheckboxTag(checkboxValue, checkboxTagListID) {
  console.log("Checkbox tag list:");
  let checkboxTagList = document.getElementById(checkboxTagListID);
  console.log(checkboxTagList);

  // Checkbox tag list name
  let checkboxTagListName = checkboxTagList.parentElement.childNodes[0].nodeValue;
  
  // Create checkbox tag ID
  let checkboxTagID = checkboxTagListID + '-' + checkboxValue.replace(/\s/g, '') + '-tag';

  // Create checkbox tag element & text node, set attributes  
  let checkboxTag = document.createElement('li');
    checkboxTag.setAttribute('class', 'checkbox-box__tag');
    checkboxTag.setAttribute('id', checkboxTagID);

  let checkboxTagRemove = document.createElement('a');
    checkboxTagRemove.setAttribute('class','checkbox-box__tag-remove');
    checkboxTagRemove.setAttribute('title','Uncheck "' + checkboxValue + '" from ' + checkboxTagListName);
  let checkboxTagRemoveIcon = document.createElement('i');
    checkboxTagRemoveIcon.setAttribute('class', 'fas fa-times');
    
  let checkboxTagText = document.createTextNode(checkboxValue);
    
  // Append children to complete total tag element for checkbox
  checkboxTagRemove.appendChild(checkboxTagRemoveIcon);
  checkboxTag.appendChild(checkboxTagRemove);
  checkboxTag.appendChild(checkboxTagText);

  checkboxTagList.appendChild(checkboxTag);

  console.log('Added ' + checkboxValue + ' tag:');
  console.log(checkboxTag);

  // Tag remove click
  checkboxTagRemove.addEventListener('click', () => {
    // Remove tag
    removeCheckboxTag(checkboxValue, checkboxTagListID);

    // Create checkbox input ID from value
    let checkboxID = checkboxValue.replace(/\s/g, '');
    // Uncheck item
    document.getElementById(checkboxID).checked = false;
  });

  // TODO: Prevent propagation
}

/////////////////////// REMOVE CHECKBOX TAG //////////////////////////
function removeCheckboxTag(checkboxValue, checkboxTagListID) {
  console.log('Removed ' + checkboxValue + ':');
  let checkboxTagList = document.getElementById(checkboxTagListID);
  console.log(checkboxTagList);

  let checkboxTagID = checkboxTagListID + '-' + checkboxValue.replace(/\s/g, '') + '-tag';
  console.log(checkboxTagID);

  let checkboxTag = document.getElementById(checkboxTagID);
  console.log(checkboxTag);
  
  checkboxTagList.removeChild(checkboxTag);
}


/////////////////////// SUBMIT CHECKBOX //////////////////////////

// Loop through checkbox inputs & call addCheckboxPressEnter()
const addCheckboxInputs = document.getElementsByClassName('checkbox-box__add-input');
Object.keys(addCheckboxInputs).forEach(function (addCheckboxInput) {
  addCheckboxPressEnter(addCheckboxInputs[addCheckboxInput]);
});

// Function to pass checkboxList/checkboxInput to addCheckbox() when pressing enter
function addCheckboxPressEnter(addCheckboxInput) {
  addCheckboxInput.addEventListener("keyup", function(event) {
    if (event.code === 'Enter') {
      let checkboxListID = this.parentNode.parentNode.getElementsByClassName('checkbox-box__summary')[0].getElementsByClassName('checkbox-box__tags')[0].id;
      let checkboxValue = this.value;
      console.log('Enter pressed to add checkbox ' + checkboxValue + ":");
      addCheckbox(checkboxValue, checkboxListID);
      this.value = '';
    }
  });
}

// Loop through add checkbox buttons & call addCheckboxButtonClick()
const addCheckboxButtons = document.getElementsByClassName('checkbox-box__add-btn');
Object.keys(addCheckboxButtons).forEach(function (addCheckboxButton) {
  addCheckboxButtonClick(addCheckboxButtons[addCheckboxButton]);
});

// Function to pass checkboxList/checkboxInput to addCheckbox() when clicking add button
function addCheckboxButtonClick(addCheckboxButton) {
  addCheckboxButton.addEventListener("click", function() {
    let checkboxTagListID = this.parentNode.parentNode.getElementsByClassName('checkbox-box__summary')[0].getElementsByClassName('checkbox-box__tags')[0].id;
    let checkboxInput = this.parentNode.getElementsByClassName('checkbox-box__add-input')[0];
    let checkboxValue = checkboxInput.value;
    console.log('Clicked add button to add checkbox ' + checkboxValue + ":");
    addCheckbox(checkboxValue, checkboxTagListID);
    checkboxInput.value = '';
  });
}

/////////////////////// ADD CUSTOM CHECKLIST ITEM //////////////////////////

function addCheckbox(checkboxValue, checkboxTagListID) {
  let checkList = document.getElementById(checkboxTagListID).parentNode.parentNode.getElementsByClassName('checkbox-box__expand-container')[0];
  console.log('Checking if checkbox exists...');
  console.log(checkList.querySelector('[value="' + checkboxValue + '"'));

  if (checkboxValue == "" || checkboxValue == null || checkboxValue == 'Add from set...') {
    console.log('Checkbox input is empty');
  } else if (checkList.querySelector('[value="' + checkboxValue + '"') !== null) {
    console.log('Checkbox exists')
  } else {
    console.log("Function received " + checkboxValue);
    
    // Add tag
    addCheckboxTag(checkboxValue, checkboxTagListID);

    // Add to checklist
    console.log("Checklist:")
    console.log(checkList);

    // Create checkbox input ID from value
    let checkboxID = checkboxValue.replace(/\s/g, '');
      
    // Create added checkbox elements & text node, set attributes
    let addedCheckboxLabel = document.createElement('label');
      addedCheckboxLabel.setAttribute('for', checkboxID);
      addedCheckboxLabel.setAttribute('class', 'checkbox-box__checkbox-label');
      
    let addedCheckboxInput = document.createElement('input');
      addedCheckboxInput.setAttribute('type', 'checkbox');
      addedCheckboxInput.setAttribute('id', checkboxID);
      addedCheckboxInput.setAttribute('class', 'checkbox checkbox-box__checkbox');
      addedCheckboxInput.setAttribute('name', 'gender');
      addedCheckboxInput.setAttribute('value', checkboxValue);
      addedCheckboxInput.setAttribute('checked', '');
      
    let addedCheckboxSpan = document.createElement('span');
      addedCheckboxSpan.setAttribute('class', 'checkbox-box__text');
      
    let addedCheckboxText = document.createTextNode("\n" + checkboxValue);
      
    // Append children to complete total element for added checkbox
    addedCheckboxSpan.appendChild(addedCheckboxText);
    addedCheckboxLabel.appendChild(addedCheckboxInput);
    addedCheckboxLabel.appendChild(addedCheckboxSpan);

    // Add checkbox element to checklist
    checkList.insertBefore(addedCheckboxLabel, checkList.getElementsByClassName('checkbox-box__add-input')[0]);
      
    // add click listeners to add animation class
    addedCheckboxInput.addEventListener("click", function () {
      addedCheckboxInput.preventDefault;
      addedCheckboxInput.classList.remove("activated");
      void addedCheckboxInput.offsetWidth;
      addedCheckboxInput.classList.add("activated");
      setTimeout(
        function (checkbox) {
          checkbox.classList.remove("activated");
        },
        parseFloat(getComputedStyle(addedCheckboxInput).animationDuration, 10) * 1000,
        addedCheckboxInput
      );
    }, false);

    // Add click listener for state change
    checklistInputChange(addedCheckboxInput);

    // Completion Log
    console.log('Added ' + checkboxValue + ' checkbox:');
    console.log(addedCheckboxLabel);
        
  }
}