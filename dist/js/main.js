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
let toggle = document.getElementById('genderToggle');
let genderFields = document.querySelectorAll('.genderFields');
function toggleGenderField(genderField, index, array) {
  console.log('Toggled gender fieldset:');
  console.log(genderField);
  genderField.classList.toggle('hidden');
};
toggle.addEventListener("change", function () {
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







/////////////////////// SUBMIT CHECKBOX //////////////////////////

const addCheckboxInputs = document.getElementsByClassName('checkbox-box__add-input');
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

// Loop through checkbox inputs & call addCheckboxPressEnter()
  Object.keys(addCheckboxInputs).forEach(function (addCheckboxInput) {
    addCheckboxPressEnter(addCheckboxInputs[addCheckboxInput]);
  });

// Function to pass checkboxList/checkboxInput to addCheckbox() when clicking add button
const addCheckboxButtons = document.getElementsByClassName('checkbox-box__add-btn');
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

// Loop through add checkbox buttons & call addCheckboxButtonClick()
  Object.keys(addCheckboxButtons).forEach(function (addCheckboxButton) {
    addCheckboxButtonClick(addCheckboxButtons[addCheckboxButton]);
  });

/////////////////////// ADD CHECKLIST ITEM //////////////////////////

function addCheckbox(checkboxValue, checkboxTagListID) {
  if (checkboxValue == "" || checkboxValue == null || checkboxValue == 'Add from set...') {
    console.log('Checkbox input is empty');
  } else if (document.getElementById(checkboxTagListID).querySelector('[value="' + checkboxValue + '"') !== null) {
    console.log('Checkbox exists')
  } else {
    console.log("Function received " + checkboxValue);
    console.log("Checkbox list:");
    let checkboxTagList = document.getElementById(checkboxTagListID);
    console.log(checkboxTagList);

    // Checkbox tag list name
    let checkboxTagListName = checkboxTagList.parentElement.childNodes[0].nodeValue;

    // Create checkbox tag element & text node, set attributes  
    let checkboxTag = document.createElement('li');
      checkboxTag.setAttribute('class', 'checkbox-box__tag');
  
    let checkboxTagRemove = document.createElement('a');
      checkboxTagRemove.setAttribute('class','checkbox-box__tag-remove');
      checkboxTagRemove.setAttribute('title','Remove "' + checkboxValue + '" from ' + checkboxTagListName);
    let checkboxTagRemoveIcon = document.createElement('i');
      checkboxTagRemoveIcon.setAttribute('class', 'fas fa-times');
      
    let checkboxTagText = document.createTextNode(checkboxValue);
      
    // Append children to complete total tag element for checkbox
    checkboxTagRemove.appendChild(checkboxTagRemoveIcon);
    checkboxTag.appendChild(checkboxTagRemove);
    checkboxTag.appendChild(checkboxTagText);
  
    checkboxTagList.appendChild(checkboxTag);

    console.log('Added ' + checkboxValue + ':');
    console.log(checkboxTag);

    // Tag remove click
    checkboxTagRemove.addEventListener('click', () => {
      console.log('Removed ' + checkboxValue + ':');
      console.log(checkboxTag);
      checkboxTag.parentElement.removeChild(checkboxTag);
    });

    // Get the value from the input (I didn't assign an ID because it's create dynamically)
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

    ///////////////// TODO: ADD CHECKBOX TO LIST !!!! ///////////////
      
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

    console.log('Added ' + checkboxValue + ' checkbox:');
    console.log(addedCheckboxLabel);
        
  }
}










// Function to add gender
let addOtherGenderButton = document.getElementById('addOtherGenderButton');
let genderList = document.getElementById('genderList');

addOtherGenderButton.addEventListener('click', function () {
  // Create add gender box elements & text node, set attributes
  const addGenderBox = document.createElement('div');
  
  const addGenderCancel = document.createElement('a');
    addGenderCancel.setAttribute('class', 'cancel-add-gender');
    addGenderCancel.setAttribute('title', 'Cancel');
  const addGenderCancelIcon = document.createElement('i');
    addGenderCancelIcon.setAttribute('class', 'fas fa-times');
  
  let addGenderInput = document.createElement('input');
    addGenderInput.setAttribute('type', 'text');
    addGenderInput.setAttribute('placeholder', 'Your gender');
    addGenderInput.setAttribute('class', 'form__textinput-input addGenderButton');
    
  const addGenderAddBtn = document.createElement('button');
    addGenderAddBtn.setAttribute('type', 'button');
    addGenderAddBtn.setAttribute('class', 'btn--add');
    addGenderAddBtn.setAttribute('title', 'Add Gender');
    
  const addGenderAddIcon = document.createElement('i');
    addGenderAddIcon.setAttribute('class', 'fas fa-plus');
    
  // Append children to complete total element for add gender box
  addGenderCancel.appendChild(addGenderCancelIcon);
  addGenderAddBtn.appendChild(addGenderAddIcon);
  addGenderBox.appendChild(addGenderCancel);
  addGenderBox.appendChild(addGenderInput);
  addGenderBox.appendChild(addGenderAddBtn);

  // Add gender box replaces other button (this)
  genderList.replaceChild(addGenderBox, this);
  // Focus on input (I didn't assign an ID because it's create dynamically)
  addGenderInput.focus();
  
  // Cancel button - other button (this) replaces add gender box
  addGenderCancel.addEventListener('click', () => {
    genderList.replaceChild(this, addGenderBox);
  });

  // Function to create gender element
  const createGender = () => {
    // Check if field is empty - if so nothing happens
    if (addGenderInput.value == "" || addGenderInput.value == null) {
      console.log('Gender input is empty');
    } else {
      // Get the value from the input (I didn't assign an ID because it's create dynamically)
      const genderValue = addGenderInput.value
      const genderID = genderValue.replace(/\s/g, '');
  
      // Create added gender elements & text node, set attributes
      const addedGender = document.createElement('label');
        addedGender.setAttribute('for', genderID);
        addedGender.setAttribute('class', 'checkbox-box__checkbox-label');
  
      const addedGenderCheckbox = document.createElement('input');
        addedGenderCheckbox.setAttribute('type', 'checkbox');
        addedGenderCheckbox.setAttribute('id', genderID);
        addedGenderCheckbox.setAttribute('class', 'checkbox checkbox-box__checkbox');
        addedGenderCheckbox.setAttribute('name', 'gender');
        addedGenderCheckbox.setAttribute('value', genderValue);
        addedGenderCheckbox.setAttribute('checked', '');
  
      const addedGenderSpan = document.createElement('span');
        addedGenderSpan.setAttribute('class', 'checkbox-box__text');
  
      const addedGenderText = document.createTextNode("\n" + genderValue);
  
      // Append children to complete total element for added gender
      addedGenderSpan.appendChild(addedGenderText);
      addedGender.appendChild(addedGenderCheckbox);
      addedGender.appendChild(addedGenderSpan);
  
      // Update gender list
      // Insert new gender element before this, while add other button replaces this
      genderList.insertBefore(addedGender, addGenderBox);
      genderList.replaceChild(this, addGenderBox);
  
      // add click listeners to add animation class
      addedGenderCheckbox.addEventListener("click", function () {
        addedGenderCheckbox.preventDefault;
        addedGenderCheckbox.classList.remove("activated");
        void addedGenderCheckbox.offsetWidth;
        addedGenderCheckbox.classList.add("activated");
        setTimeout(
          function (checkbox) {
            checkbox.classList.remove("activated");
          },
          parseFloat(getComputedStyle(addedGenderCheckbox).animationDuration, 10) * 1000,
          addedGenderCheckbox
        );
      }, false);

      console.log('Added ' + genderValue + ':');
      console.log(addedGender);
    }
  }

  // Creating & adding the gender element after clicking add button
  addGenderAddBtn.addEventListener('click', () => {
    console.log('Clicked add button to add gender;');
    createGender();
  });

  // Creating & adding the gender element after pressing enter
  addGenderInput.addEventListener("keyup", function(event) {
    if (event.code === 'Enter') {
      console.log('Enter pressed in add gender input;');
      createGender();
    }
  });
});