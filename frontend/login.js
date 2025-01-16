const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

//prompts sign in display from sign up and vice versa
registerBtn.addEventListener('click', () =>{
    container.classList.add("active");
});

loginBtn.addEventListener('click', () =>{
    container.classList.remove("active");
});

//form validation
function data__signin(){
    var a = document.getElementById("n1").value;
    var b = document.getElementById("n2").value;
    if(a=="" || b==""){
        alert("All Fields are Mandatory");
        return false;
    }else{
        true;
    }

}
function data__signup(){
    var a = document.getElementById("n3").value;
    var b = document.getElementById("n4").value;
    var c = document.getElementById("n5").value;
    var d = document.getElementById("n6").value;

    if(a=="" || b=="" || c=="" || d==""){
            alert("All Fields are Mandatory");
            return false;
    } else {
        true;
    } 
}