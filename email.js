const email1 = document.getElementById("email1");
const email2 = document.getElementById("email2");
const submitButton = document.getElementById("submitBtn");
const submitButton2 = document.getElementById("submitBtn2");
const submitButton3 = document.getElementById("submitBtn3");
//if statment for empty text input 



function validateEmail() {

   alert("hello");
    
}

submitButton2.addEventListener("click", validateEmail );

function backgroundChange(){
    submitButton3.style.backgroundColor ="yellow";
}

submitButton3.addEventListener("mouseover", backgroundChange);