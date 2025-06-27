/*login file only*/
const formLog = document.querySelector(".formLog")

function Login() {

    formLog.addEventListener("submit", async function (event) {
        event.preventDefault();

        const log = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=mdp]").value
        };

        const chargeUtile = JSON.stringify(log);


        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile
        })
            .then(rep => { return rep.json() })

            .then(data => {
                if (data.token) {
                    localStorage.setItem("token", data.token)
                    window.location.href = "index.html"
                    console.log(data)

                } else {
                        console.log(data)
                        const form = document.querySelector(".formLog")
                        const btnSubmit = formLog.querySelector("input[type='submit']")
                        const errMsg = document.createElement("p")
                        errMsg.classList.add("errorMsg")
                        if(document.querySelector(".errorMsg")){
                            document.querySelector(".errorMsg").remove()
                        }
                        errMsg.innerText = "Email ou mot de passe invalide."
                        form.insertBefore(errMsg, btnSubmit)    
                }

            })

    });
}

Login();