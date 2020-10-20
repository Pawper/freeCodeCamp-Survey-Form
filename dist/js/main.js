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

// Function to add expression
let addExpressionButton = document.getElementById('addExpressionButton');
let addExpressionInput = document.getElementById('addExpressionInput');
let expressionList = document.getElementById('expressionList');
function addExpression() {
  // Check if field is empty - if so nothing happens
  if (addExpressionInput.value == "" || addExpressionInput.value == null) {
    console.log('Expression input is empty');
  } else {
    const expressionID = addExpressionInput.value.replace(/\s/g, '');

    // Create expression element & text node, set attributes  
    const addedExpression = document.createElement('li');
  
    const addedExpressionRemove = document.createElement('a');
      addedExpressionRemove.setAttribute('href', '#');
    const addedExpressionRemoveIcon = document.createElement('i');
      addedExpressionRemoveIcon.setAttribute('class', 'fas fa-times removeExpression');
      addedExpressionRemoveIcon.setAttribute('title', 'Remove');
      
    const addedExpressionText = document.createTextNode(addExpressionInput.value);
      
    const addedExpressionSave = document.createElement('input');
      addedExpressionSave.setAttribute('type', 'text');
      addedExpressionSave.setAttribute('name', 'genderExpressions');
      addedExpressionSave.setAttribute('value', addExpressionInput.value);
      
    // Append children to complete total element for expression
    addedExpressionRemove.appendChild(addedExpressionRemoveIcon);
    addedExpression.appendChild(addedExpressionRemove);
    addedExpression.appendChild(addedExpressionText);
    addedExpression.appendChild(addedExpressionSave);
  
    expressionList.appendChild(addedExpression);
    addExpressionInput.value = '';

    console.log('Added ' + addedExpressionSave.value + ':');
    console.log(addedExpression);

    // Remove click
    addedExpressionRemove.addEventListener('click', () => {
      console.log('Removed ' + addedExpressionSave.value + ':');
      console.log(addedExpression);
      addedExpression.parentElement.removeChild(addedExpression);
    });
  }
}
addExpressionButton.addEventListener('click', () => {
  console.log('Clicked add button to add expression;');
  addExpression();
});
addExpressionInput.addEventListener("keyup", function(event) {
  if (event.code === 'Enter') {
    console.log('Enter pressed in add expression input;');
    addExpression();
  }
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