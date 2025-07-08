export function Popup(projet) {
    const body = document.querySelector("body")

    /* Popup */
    const backPopup = document.createElement("div")
    backPopup.classList.add("backPopup")
    
    const popup = document.createElement("div")
    popup.classList.add("popup")
    
    const btnCroix = document.createElement("button")
    btnCroix.classList.add("btnCroix")
    
    const croix = document.createElement("i")
    croix.classList.add("fa-solid", "fa-xmark")
    croix.classList.add("fermerForm")
    
    
    const titre = document.createElement("h2")
    titre.innerText = ("Galerie Photo")
    
    const parentProjet = document.createElement("div")
    parentProjet.classList.add("parentPj")
    
    
    
    const ajouterPhoto = document.createElement("button")
    ajouterPhoto.innerText = "Ajouter une photo"
    ajouterPhoto.classList.add("addPhoto")
    
    body.appendChild(backPopup)
    backPopup.appendChild(popup)
    popup.appendChild(btnCroix)
    btnCroix.appendChild(croix)
    popup.appendChild(titre)
    popup.appendChild(parentProjet)
    popup.appendChild(ajouterPhoto)
    gTravauxPopup(projet)
    eventPopup()
    trashcan()
}

export function supp() {
    
    /*
    const trash = {
        work = event.target.
    };*/

    const chargeUtile = JSON.stringify(trash);


        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile
        })
} 


export function gTravauxPopup(projet) {
    const parent = document.querySelector(".parentPj")
   /* document.querySelector(".parentPj").innerHTML = "";*/
    console.log(projet)
    for (let pj of projet) {
        const figure = document.createElement("figure")
        parent.appendChild(figure)

        const iTrashcan = document.createElement("i")
        iTrashcan.classList.add("fa-solid", "fa-trash-can")
        
        const img = document.createElement("img")
        img.src = pj.imageUrl
        img.alt = pj.title
        
        const id = pj.id
        console.log(id)
        iTrashcan.setAttribute('id', id)
        console.log(iTrashcan)

        figure.appendChild(img)
        figure.appendChild(iTrashcan)
        trashcan(iTrashcan)
        
        
    }

}

export function trashcan(iTrashcan) {
    console.log(iTrashcan)
    
    iTrashcan.addEventListener("click", function (event) {
        event.preventDefault
        console.log("cliquer trashcan n° : " + iTrashcan.id)
        /*if(event.target === iTrashcan)*/

        
    })

}


export function afficherPopup() {
    const pop = document.querySelector(".backPopup")
    pop.classList.add("active")
}
export function cacherPopup() {
    const pop = document.querySelector(".backPopup")
    const btnPop = document.querySelector(".fermerForm")
    pop.classList.remove("active")
    btnPop.classList.remove("active")

}


export function eventPopup() {
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