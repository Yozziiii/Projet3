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
    gestionPopupInterne(token ,categoryR)
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
    for (let pj of projet) {
        const figure = document.createElement("figure")
        parent.appendChild(figure)

        const iTrashcan = document.createElement("i")
        iTrashcan.classList.add("fa-solid", "fa-trash-can")
        
        const img = document.createElement("img")
        img.src = pj.imageUrl
        img.alt = pj.title
        
        const id = pj.id
        /*iTrashcan.setAttribute('id', id)*/
        /*console.log(iTrashcan)*/

        figure.appendChild(img)
        figure.appendChild(iTrashcan)
        
        trashcan(token, iTrashcan, id)
        
    }

}

function trashcan(token, iTrashcan, id) {
    
    iTrashcan.addEventListener("click", function (event) {
        event.preventDefault()

        console.log(token)
        console.log(id)
        
        if(event.target === iTrashcan){
            fetch(`http://localhost:5678/api/works/${id}`, {
                method: "DELETE",
                headers: { 
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                 },
            }).then(() => {
                getProjet()
                gTravauxPopup()
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

    const icon = document.createElement("i")
    icon.classList.add("fa-regular", "fa-image")
    const inputAdd = document.createElement("input")
    inputAdd.type = "file"
    inputAdd.id = "image"
    inputAdd.name = "image"
    inputAdd.accept = ".jpg, .png"
    
    const infoAdd = document.createElement("p")
    infoAdd.innerText = "jpg, png : 4mo max"
    infoAdd.classList.add("infoAdd")

    const labelTitre = document.createElement("label")
    labelTitre.innerText = ("Titre")
    const inputTitre = document.createElement("input")
    inputTitre.setAttribute('type', 'text')
    inputTitre.setAttribute('name', 'titre')
    
    const labelCat = document.createElement("label")
    labelCat.innerText = ("Catégorie")
    const inputCat = document.createElement("select")
    inputCat.name ="categorie"
    categoryR.forEach(function(cat) {
        const option = document.createElement("option")
        option.value = cat.id
        option.innerText = cat.name
        inputCat.appendChild(option)
    })

    const btnValider = document.createElement("button")
    btnValider.type = "submit"
    btnValider.innerText = "Valider"
    
    popup.appendChild(popDeux)
    popDeux.appendChild(titre)
    popDeux.appendChild(formPhoto)
    
    formPhoto.appendChild(addPhoto)
    addPhoto.appendChild(icon)
    addPhoto.appendChild(inputAdd)
    addPhoto.appendChild(infoAdd)

    formPhoto.appendChild(labelTitre)
    formPhoto.appendChild(inputTitre)
    formPhoto.appendChild(labelCat)
    formPhoto.appendChild(inputCat)

    formPhoto.appendChild(btnValider)
}


function submitForm(token) {
    const submit = document.querySelector(".addPhotoForm")
    console.log(token)

    submit.addEventListener("submit", function (event) {
        event.preventDefault();
        const form = event.target
        const chargeUtile = new FormData(form);

        fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: { 
                "Authorization": `Bearer ${token}`,
                "accept": "application/json",
            },
            body: chargeUtile
        })
        .then(rep => { return rep.json() })
        .then(data => {
            console.log(data)
        })
    

    })
}

function gestionPopupInterne(token, categoryR) {
    const add = document.querySelector(".addPhoto")
    const arrow = document.querySelector(".retourForm")  
    
    add.addEventListener("click", function (event) {
        event.preventDefault
        afficherPopDeux()
    })

    arrow.addEventListener("click", function (event) {
        event.preventDefault
        returnPopUne()
    })
}
function afficherPopDeux() {
    const popDeux = document.querySelector(".popDeux")
    document.querySelector(".btnArrow").style.display="flex"
    document.querySelector(".popUne").style.display="none"
        console.log("cliquer add photo")
        popDeux.classList.add("active")

}

function returnPopUne () {
    const popDeux = document.querySelector(".popDeux")
    document.querySelector(".popUne").style.display="flex"
    popDeux.classList.remove("active")
}

function afficherPopup() {
    const pop = document.querySelector(".backPopup")
    pop.classList.add("active")
}
function cacherPopup() {
    const pop = document.querySelector(".backPopup")
    const btnPop = document.querySelector(".fermerForm")
    pop.classList.remove("active")
    btnPop.classList.remove("active")

}


function eventPopup() {
    const btnEdition = document.querySelector(".btnEdit")

    btnEdition.addEventListener("click", function (event) {
        event.preventDefault
        console.log("btn cliqué :" + btnEdition)
        afficherPopup()
    })

    const pop = document.querySelector(".backPopup")
    const btnPop = document.querySelector(".fermerForm")
    pop.addEventListener("click", function (event) {
        event.preventDefault
        if (event.target === btnPop || event.target === pop) {
            cacherPopup()
        }

    })

}