function render(event){

    event.preventDefault();
    let userInf = document.getElementById("user-inf") ; 
    let form = event.target ; 
    let fullName = form.fullName.value ;
    let password = form.pwd.value ;
    let dateofbirth = form.date.value ;
    let gender = form.gender.value ;
    let tel = form.tel.value ;
    let chronicdisease = form.chronicdisease.value ;
    let img = form.img.value;


    const imageforpatients = document.getElementById("imageforpatients");
    const newimg = document.createElement("img");
    newimg.src = img;
    imageforpatients.appendChild(newimg);

    


    
    let formData = {
      fullName: fullName,
      password: password,
      dateofbirth: dateofbirth,
      gender: gender,
      tel: tel,
      chronicdisease: chronicdisease,
      img: img
  };

  // localstorage get and set data :
      
    //  let inf = localStorage.getItem('inf');
    //   inf = JSON.parse(inf);
    //   if (inf) {
    //     console.log(inf);
    // } else {
    //     console.log('No value found for the key "inf" in localStorage.');
    // }
    //  inf.push(inf);
    //  localStorage.setItem('inf', JSON.stringify(inf));

      let inf = localStorage.getItem('inf');        
      if (inf) {
      inf = JSON.parse(inf);
     } else {
      inf = [];
      }

      inf.push(formData);
      localStorage.setItem('inf', JSON.stringify(inf));

      userInf.innerHTML = '';
      let cardDiv = document.getElementById('card') ;

      inf.forEach(data => {
        let newDiv = document.createElement('div') ;
        cardDiv.appendChild(newDiv) ;
        newDiv.style.width = 'fit-content';
        newDiv.style.display = 'flex' ;
        newDiv.style.flexDirection = "row";        
        newDiv.style.background = 'white' ;
        newDiv.style.height = "fit-content" ;
        newDiv.style.padding = "20px";
        newDiv.style.margin = "20px";

        



          let userInfoHTML = "Full Name: " + data.fullName + "<br>" 
                           + "Password: " + data.password + "<br>" 
                           + "Date of Birth: " + data.dateofbirth + "<br>" 
                           + "Gender: " + data.gender + "<br>" 
                           + "Tel Number: " + data.tel + "<br>" 
                           + "Chronic Disease: " + data.chronicdisease + "<br><br>";
  
          newDiv.innerHTML = userInfoHTML;

  
          userInf.appendChild(newDiv);

  
          const imgElement = document.createElement("img");
          imgElement.src = data.img;
          userInf.appendChild(imgElement);

      });
  



}

  // Clear local storage

let clear = document.getElementById('clear') ;

function clearData() {
  localStorage.clear();
  inf = [];

  
}

clear.addEventListener("click" , clearData );

  

let form = document.getElementById('form') ;
form.addEventListener("submit" , render );







