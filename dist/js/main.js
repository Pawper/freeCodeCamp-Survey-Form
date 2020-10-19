let toggle = document.getElementById('genderToggle');
let genderFields = document.querySelectorAll('.genderFields');
toggle.addEventListener("change", function () {
  genderFields.forEach( fieldset => fieldset.classList.toggle('hidden'));
  console.log("Toggled gender fieldsets");
});

const checkboxes = document.getElementsByClassName('actualcheckbox');
function checkboxPulse() {
  for (var checkbox = 0; checkbox < checkboxes.length; checkbox++) {
    checkboxes[checkbox].addEventListener("click", function () {
      this.classList.add("activated");
      console.log("Clicked " + this.id);
      console.log(
        "Waiting " +
          parseFloat(getComputedStyle(this).animationDuration, 10) * 1000 +
          " milliseconds"
      );
      setTimeout(
        function (checkbox) {
          console.log("Animation stopped");
          checkbox.classList.remove("activated");
        },
        parseFloat(getComputedStyle(this).animationDuration, 10) * 1000,
        this
      );
    });
  }
}

checkboxPulse();

let otherGender = document.getElementById('otherGender');
let genderList = document.getElementById('genderList');
otherGender.addEventListener('click', function () {
  const addGenderForm = document.createElement('form');
  addGenderForm.setAttribute('action', '');
  
  const addGenderCancel = document.createElement('a');
  addGenderCancel.setAttribute('class', 'cancel-add-gender');
  addGenderCancel.setAttribute('title', 'Cancel');
  const addGenderCancelIcon = document.createElement('i');
  addGenderCancelIcon.setAttribute('class', 'fas fa-times');
  addGenderCancel.appendChild(addGenderCancelIcon);
  
  const addGenderInput = document.createElement('input');
  addGenderInput.setAttribute('type', 'text');
  addGenderInput.setAttribute('placeholder', 'Your gender');
  addGenderInput.setAttribute('required', ''); 
  addGenderInput.setAttribute('class', 'form__textinput-input addGenderButton');
  
  const addGenderAddBtn = document.createElement('button');
  addGenderAddBtn.setAttribute('type', 'submit');
  addGenderAddBtn.setAttribute('class', 'btn--add');
  addGenderAddBtn.setAttribute('title', 'Add Gender');
  const addGenderAddIcon = document.createElement('i');
  addGenderAddIcon.setAttribute('class', 'fas fa-plus');
  addGenderAddBtn.appendChild(addGenderAddIcon);
  
  addGenderForm.appendChild(addGenderCancel);
  addGenderForm.appendChild(addGenderInput);
  addGenderForm.appendChild(addGenderAddBtn);

  genderList.replaceChild(addGenderForm, this);
  addGenderForm.getElementsByTagName("input")[0].focus();
  
  addGenderCancel.addEventListener('click', () => {
    genderList.replaceChild(this, addGenderForm);
  })

  addGenderForm.addEventListener('submit', () => {
    const genderValue = addGenderForm.getElementsByTagName("input")[0].value
    const genderID = genderValue.replace(/\s/g, '');
    console.log(genderValue + " submitted");

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

    addedGenderSpan.appendChild(addedGenderText);
    addedGender.appendChild(addedGenderCheckbox);
    addedGender.appendChild(addedGenderSpan);

    genderList.insertBefore(addedGender, addGenderForm);
    genderList.replaceChild(this, addGenderForm);

    checkboxPulse();

  });
});


