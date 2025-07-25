import { getProjet, gTravaux } from "./javascripts.js";
export function PopupMaster(projet, token, categoryR) {
    Popup(projet, token, categoryR)
}


function Popup(projet, token, categoryR) {
    const body = document.querySelector("body")
    const backPopup = document.createElement("div")
    backPopup.classList.add("backPopup")
    const popup = document.createElement("div")
    popup.classList.add("popup")
    const divBtn = document.createElement("div")
    divBtn.classList.add("divBtn")

    const btnCroix = document.createElement("button")
    btnCroix.classList.add("btnCroix")
    const croix = document.createElement("i")
    croix.classList.add("fa-solid", "fa-xmark")
    croix.classList.add("fermerForm")

    const btnArrow = document.createElement("button")
    btnArrow.classList.add("btnArrow")
    const arrow = document.createElement("i")
    arrow.classList.add("fa-solid", "fa-arrow-left")
    arrow.classList.add("retourForm")
    popup.appendChild(divBtn)
    divBtn.appendChild(btnArrow)
    btnArrow.appendChild(arrow)
    divBtn.appendChild(btnCroix)
    btnCroix.appendChild(croix)

    body.appendChild(backPopup)
    backPopup.appendChild(popup)

    PopUne()
    popDeux(categoryR)
    submitForm(token)

    gTravauxPopup(projet, token)
    eventPopup()
    gestionPopupInterne(token, categoryR)
}



function PopUne() {
    const popup = document.querySelector(".popup")

    const popUne = document.createElement("div")
    popUne.classList.add("popUne")

    const titre = document.createElement("h2")
    titre.innerText = ("Galerie Photo")

    const parentProjet = document.createElement("div")
    parentProjet.classList.add("parentPj")

    const ajouterPhoto = document.createElement("button")
    ajouterPhoto.innerText = "Ajouter une photo"
    ajouterPhoto.classList.add("addPhoto")

    popup.appendChild(popUne)
    popUne.appendChild(titre)
    popUne.appendChild(parentProjet)
    popUne.appendChild(ajouterPhoto)
}



function gTravauxPopup(projet, token) {
    const parent = document.querySelector(".parentPj")
    document.querySelector(".parentPj").innerHTML = "";
    /*console.log(projet)*/
    for (let pj of projet) {
        const figure = document.createElement("figure")
        parent.appendChild(figure)

        const iTrashcan = document.createElement("i")
        iTrashcan.classList.add("fa-solid", "fa-trash-can")

        const img = document.createElement("img")
        img.src = pj.imageUrl
        img.alt = pj.title

        const id = pj.id

        figure.appendChild(img)
        figure.appendChild(iTrashcan)

        trashcan(token, iTrashcan, id, gTravauxPopup)

    }

}

function trashcan(token, iTrashcan, id, gTravauxPopup) {

    iTrashcan.addEventListener("click", function (event) {
        event.preventDefault()
        event.stopPropagation()
        let confirmation = confirm("Souhaitez-vous supprimer ce travail ?")
        console.log(token)
        console.log(id)

        if (event.target === iTrashcan && confirmation === true) {
            fetch(`http://localhost:5678/api/works/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }).then(() => {
                return getProjet()
            }).then((newProjet) => {
                gTravaux(newProjet)
                gTravauxPopup(newProjet, token)
            }).catch((err) => {
                console.log("catch err : " + err)
            })
        }

    })

}

function popDeux(categoryR) {
    const popup = document.querySelector(".popup")
    /*document.querySelector(".popup").style.display="none"*/
    const popDeux = document.createElement("div")
    popDeux.classList.add("popDeux")

    const titre = document.createElement("h2")
    titre.innerText = "Ajout photo"

    const formPhoto = document.createElement("form")
    formPhoto.classList.add("addPhotoForm")

    const addPhoto = document.createElement("div")
    addPhoto.classList.add("parentAdd")

    const inputAdd = document.createElement("input")
    inputAdd.type = "file"
    inputAdd.id = "image"
    inputAdd.name = "image"
    inputAdd.accept = ".jpg, .png"
    
    const labelAdd = document.createElement("label")
    labelAdd.htmlFor = "image"
    labelAdd.classList.add("labelAdd")

    const imgAdd = document.createElement("img")
    imgAdd.classList.add("labelImg")
    

    const icon = document.createElement("i")
    icon.classList.add("fa-regular", "fa-image")
    
    const pText = document.createElement("p")
    pText.innerText = "+ Ajouter photo"
    pText.classList.add("pAjout")
    
    const infoAdd = document.createElement("p")
    infoAdd.innerText = "jpg, png : 4mo max"
    infoAdd.classList.add("infoAdd")

    const labelTitre = document.createElement("label")
    labelTitre.innerText = ("Titre")
    const inputTitre = document.createElement("input")
    inputTitre.setAttribute('type', 'text')
    inputTitre.setAttribute('name', 'title')
    inputTitre.required = true

    const labelCat = document.createElement("label")
    labelCat.innerText = ("Catégorie")
    const inputCat = document.createElement("select")
    inputCat.name = "category"
    const option = document.createElement("option")
    option.innerText = ""
    option.disabled = true;
    option.selected = true;
    inputCat.appendChild(option)

    categoryR.forEach(function (cat){
        const option = document.createElement("option")
        option.value = cat.id
        option.innerText = cat.name
        inputCat.appendChild(option)
    })
    console.log(option)

    const span = document.createElement("span")
    

    const btnValider = document.createElement("button")
    btnValider.type = "submit"
    btnValider.innerText = "Valider"

    popup.appendChild(popDeux)
    popDeux.appendChild(titre)
    popDeux.appendChild(formPhoto)

    formPhoto.appendChild(addPhoto)
    addPhoto.appendChild(inputAdd)

    addPhoto.appendChild(labelAdd)
    labelAdd.appendChild(imgAdd)
    labelAdd.appendChild(icon)
    labelAdd.appendChild(pText)
    labelAdd.appendChild(infoAdd)

    formPhoto.appendChild(labelTitre)
    formPhoto.appendChild(inputTitre)
    formPhoto.appendChild(labelCat)
    formPhoto.appendChild(inputCat)
    formPhoto.appendChild(span)

    formPhoto.appendChild(btnValider)
    changeForm()
}


function submitForm(token) {
    const submit = document.querySelector(".addPhotoForm")
    const inputImg = document.querySelector('input[type="file"]')
    const img = document.querySelector(".labelImg")
    const btn = document.querySelector(".addPhotoForm button")
    const select = document.querySelector(".addPhotoForm select")

    const icon = document.querySelector(".fa-image")
    const pText = document.querySelector(".pAjout")
    const infoAdd = document.querySelector(".infoAdd")

    console.log("select : ", select[0].value) 
    console.log("btn: " + btn)
    console.log(token)
    

    submit.addEventListener("input", function (event) {
        event.preventDefault()
        
        if(select.value !== "" && submit.checkValidity()){
            btn.style.backgroundColor= "#1D6154"
        }else{
            console.log("error")
            btn.style.backgroundColor= ""
        }
    })
        
        
        submit.addEventListener("submit", function (event) {
        event.preventDefault();
        const form = event.target
        console.log(form)
        const chargeUtile = new FormData(form);
        console.log(chargeUtile)
        
        fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "accept": "application/json",
            },
            body: chargeUtile
        })
        .then(rep => { return rep.json() })
        .then(() => {
            return getProjet()
        }).then((newProjet) => {
            gTravauxPopup(newProjet, token)
            gTravaux(newProjet)
            inputImg.value = ""
            img.src = ""
            img.classList.remove("act")
            icon.style.display = "block"
            pText.style.display = "block"
            infoAdd.style.display = "block"
            submit.reset()
            select.selectedIndex = 0
            btn.style.backgroundColor= ""
            cacherPopup()
        })
        
        
    })

}

function changeForm() {
    const input = document.querySelector("input#image")
    const labelImg = document.querySelector(".labelAdd p")
    const labelIm = document.querySelector(".labelAdd i")
    const labelI = document.querySelector(".labelAdd .infoAdd")
    const img = document.querySelector(".labelImg")
    input.addEventListener("change", function (event) {
        event.preventDefault()
        
        labelImg.style.display="none"
        labelIm.style.display="none"
        labelI.style.display="none"
        img.classList.add("act")

        const file = event.target.files[0]
        console.log(file)
        console.log(img)

        const reader = new FileReader()
        reader.onload = (event)=>{
            img.src = event.target.result
        }
        console.log(reader)
        reader.readAsDataURL(file)
             
    })
    const btn = document.querySelector(".addPhotoForm button")
    console.log("dfdff: " + btn)

}


function gestionPopupInterne() {
    const add = document.querySelector(".addPhoto")
    const arrow = document.querySelector(".retourForm")

    add.addEventListener("click", function (event) {
        event.preventDefault()
        afficherPopDeux()
    })

    arrow.addEventListener("click", function (event) {
        event.preventDefault()
        returnPopUne()
    })
}
function afficherPopDeux() {
    const popDeux = document.querySelector(".popDeux")
    document.querySelector(".btnArrow").style.display = "flex"
    document.querySelector(".divBtn").style.justifyContent = "space-between"
    document.querySelector(".popUne").style.display = "none"
    console.log("cliquer add photo")
    popDeux.classList.add("active")

}

function returnPopUne() {
    const popDeux = document.querySelector(".popDeux")
    popDeux.classList.remove("active")
    document.querySelector(".btnArrow").style.display = "none"
    document.querySelector(".divBtn").style.justifyContent = "end"
    document.querySelector(".popUne").style.display = "flex"
}

function afficherPopup() {
    const pop = document.querySelector(".backPopup")
    pop.classList.add("active")
}
function cacherPopup() {
    const pop = document.querySelector(".backPopup")
    const btnPop = document.querySelector(".fermerForm")
    const popDeux = document.querySelector(".popDeux")
    popDeux.classList.remove("active")
    pop.classList.remove("active")
    btnPop.classList.remove("active")

}


function eventPopup() {
    const btnEdition = document.querySelector(".btnEdit")

    btnEdition.addEventListener("click", function (event) {
        console.log("btn cliqué :" + btnEdition)
        afficherPopup()
        returnPopUne()
    })

    const pop = document.querySelector(".backPopup")
    const btnPop = document.querySelector(".fermerForm")
    pop.addEventListener("click", function (event) {
        if (event.target === btnPop || event.target === pop) {
            cacherPopup()
        }

    })

}