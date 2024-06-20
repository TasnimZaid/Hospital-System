function validForm() {
  const fullName = document.getElementById('fullName').value;
  const password = document.getElementById('pwd').value;
  const tel = document.getElementById('tel').value ;
  const email = document.getElementById('email').value ;

  // Regular expressions for each criteria
  const nameRegex = /^[^\s]*$/;
  const lengthRegex = /.{8,}/;
  const lowercaseRegex = /[a-z]/;
  const uppercaseRegex = /[A-Z]/;
  const digitRegex = /\d/;
  const specialRegex = /[!@#$%^&*()|<>]/;
  const telregex = /^07\d{8}$/;
  const emailregex = /^[^\s@]+@[^\s@]+\.com$/;

  // valid for email : 
  const isemailvalid = validCondition(emailregex , "emailvalid" , email);

  // vlidation for phone num 
  const istellvalid = validCondition(telregex , "telvalid" , tel)

  // Validation for full name
  const isNameValid = validCondition(nameRegex, "withoutspace", fullName);

  // Validation for password criteria
  const isLengthValid = validCondition(lengthRegex, "length", password);
  const isLowercaseValid = validCondition(lowercaseRegex, "lowercase", password);
  const isUppercaseValid = validCondition(uppercaseRegex, "uppercase", password);
  const isDigitValid = validCondition(digitRegex, "digit", password);
  const isSpecialValid = validCondition(specialRegex, "special", password);

  // Return true if all conditions are valid
  return isemailvalid&&istellvalid && isNameValid && isLengthValid && isLowercaseValid && isUppercaseValid && isDigitValid && isSpecialValid;
}

function validCondition(regex, elementId, value) {
  const element = document.getElementById(elementId);
  const isValid = regex.test(value);

  if (isValid) {
      element.classList.remove("invalid");
      element.classList.add("valid");
  } else {
      element.classList.remove("valid");
      element.classList.add("invalid");
  }

  return isValid;
}

function render(event) {
  event.preventDefault();
  const isFormValid = validForm();

  if (isFormValid) {
      // Proceed with form submission or other actions
      console.log("Form is valid. Submitting...");
  } else {
      console.log("Form is invalid. Please correct errors.");
      return; // Prevent further execution if form is invalid
  }

  let form = event.target;
  let fullName = form.fullName.value;
  let password = form.pwd.value;
  let dateofbirth = form.date.value;
  let gender = form.gender.value;
  let tel = form.tel.value;
  let chronicdisease = form.chronicdisease.value;
  let img = form.img.value;

  // Append new img to insert it by user
  const imageforpatients = document.getElementById("imageforpatients");
  const newimg = document.createElement("img");
  newimg.src = img;
  imageforpatients.appendChild(newimg);

  // Create an object to store form data
  let formData = {
      fullName: fullName,
      password: password,
      dateofbirth: dateofbirth,
      gender: gender,
      tel: tel,
      chronicdisease: chronicdisease,
      img: img
  };

  // Get existing data from local storage
  let inf = localStorage.getItem('formData');
  if (inf) {
      inf = JSON.parse(inf);
  } else {
      inf = [];
  }

  // Add new data to array and save back to local storage
  inf.push(formData);
  localStorage.setItem('formData', JSON.stringify(inf));

  // Clear previous display and show updated data
  displayData(inf);
}

function displayData(inf) {
  let userInf = document.getElementById("user-inf");
  userInf.innerHTML = '';

  inf.forEach(data => {
      let newDiv = document.createElement('div');
      newDiv.classList.add('user-card');

      let userInfoHTML = `
          Full Name: ${data.fullName}<br>
          Password: ${data.password}<br>
          Date of Birth: ${data.dateofbirth}<br>
          Gender: ${data.gender}<br>
          Tel Number: ${data.tel}<br>
          Chronic Disease: ${data.chronicdisease}<br><br>
      `;

      newDiv.innerHTML = userInfoHTML;

      const imgElement = document.createElement("img");
      imgElement.src = data.img;
      newDiv.appendChild(imgElement);

      userInf.appendChild(newDiv);
  });
}

function clearData() {
  localStorage.clear();
  document.getElementById("user-inf").innerHTML = '';
  document.getElementById("imageforpatients").innerHTML = '';
}

document.getElementById('clear').addEventListener("click", clearData);
document.getElementById('form').addEventListener("submit", render);

// Ensure form data is displayed on page load
window.onload = function() {
  let inf = localStorage.getItem('formData');
  if (inf) {
      inf = JSON.parse(inf);
      displayData(inf);
  }
}