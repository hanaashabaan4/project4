
let password = document.querySelector("#password")
let email = document.querySelector("#email")
let loginBtn = document.querySelector("#signin")

let getemail = localStorage.getItem("email")
let getPassword = localStorage.getItem("password")

loginBtn.addEventListener ("click" , function(e){
    e.preventDefault()
    if (email.value==="" || password.value===""){
        alert("please fill data ")
    } else {
        if ( (getemail && getemail.trim() === email.value.trim() && getPassword && getPassword === password.value )  )
        {
            setTimeout ( () => {
                window.location = "index.html"
            } , 500)
        } else {
            console.log("username or password is wrong ")
        }
    }
})



