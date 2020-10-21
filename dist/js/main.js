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
const checkboxes = document.getElementsByClassName('actualcheckbox');
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

// Populate pronoun set dropdown
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

// Function to add a tag
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
        tagRemoveIcon.setAttribute('title', 'Remove');
        
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

// Create array of pronoun list IDs
const tagListIDs = [];
function createPronounSectionIDList() {
  const tagLists = document.getElementsByClassName('pronouns-container')[0].getElementsByClassName('tag-box__tags');
  Object.keys(tagLists).forEach(function (tagList) {
    let id = tagLists[tagList].id;
    tagListIDs.push(id);
  });
}
createPronounSectionIDList();

// Add pronoun set
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
  
  // Loop through tags & call addTagPressEnter()
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

  // Loop through tags & call addTagButtonClick()
    Object.keys(addTagButtons).forEach(function (addTagButton) {
      addTagButtonClick(addTagButtons[addTagButton]);
    });

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
  
      const addedGenderCheckbox = document.createElement('input');
        addedGenderCheckbox.setAttribute('type', 'checkbox');
        addedGenderCheckbox.setAttribute('id', genderID);
        addedGenderCheckbox.setAttribute('class', 'actualcheckbox');
        addedGenderCheckbox.setAttribute('name', 'gender');
        addedGenderCheckbox.setAttribute('value', genderValue);
        addedGenderCheckbox.setAttribute('checked', '');
  
      const addedGenderSpan = document.createElement('span');
  
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