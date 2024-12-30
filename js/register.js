let username1 = document.querySelector("#username")
let username2 = document.querySelector("#username2")
let email2 = document.querySelector("#email")
let password = document.querySelector("#password")

let register_btn = document.querySelector("#signup")

register_btn.addEventListener ("click" , function (e){
    e.preventDefault()
    if (username1.value==="" ||username2.value==="" || email2.value==="" || password.value ===""){
        alert("please fill data")
    } else {
        localStorage.setItem("userfname" , username1.value);
        localStorage.setItem("userlname" , username2.value);
        localStorage.setItem("email" , email2.value);
        localStorage.setItem("password" , password.value); // 

        setTimeout ( () => {
            window.location = "login.html"
        } , 500)
    }
})

