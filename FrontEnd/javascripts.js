import {Popup, gTravauxPopup, eventPopup}from "./popup.js";

const reponse = await fetch("http://localhost:5678/api/works");
const projet = await reponse.json();
console.log(projet)

const valeurWorks = JSON.stringify(projet)
window.localStorage.setItem("works", valeurWorks)

const gallery = document.querySelector(".gallery")

const categoryRep = await fetch("http://localhost:5678/api/categories");
const categoryR = await categoryRep.json();

function gTravaux(projet) {
    document.querySelector(".gallery").innerHTML = "";

    for (let pj of projet) {
        const figure = document.createElement("figure")

        const title = document.createElement("p")
        title.innerText = pj.title

        const img = document.createElement("img")
        img.src = pj.imageUrl
        img.alt = pj.title

        gallery.appendChild(figure);
        figure.appendChild(img)
        figure.appendChild(title)

    }

}

gTravaux(projet)
console.log(projet)

function gfilterButton(categoryR) {

    const parentElement = document.querySelector("#portfolio")
    const navElement = document.createElement("nav")
    parentElement.insertBefore(navElement, gallery)

    const filterAll = document.createElement("button")
    filterAll.innerText = "Tous"
    filterAll.classList.add("btn-filter")

    navElement.appendChild(filterAll)

    filterAll.addEventListener("click", function () {
        gTravaux(projet)
    })



    const monSet = new Set();

    for (let cat of categoryR) {
        if (!monSet.has(cat.name)) {

            monSet.add(cat.name);

            const filterButton = document.createElement("button");
            filterButton.innerText = cat.name;
            filterButton.classList.add("btn-filter");
            navElement.appendChild(filterButton);

            filterButton.addEventListener("click", function () {
                const projetFiltrees = projet.filter(function (pj) {
                    return pj.category.name === filterButton.innerText;
                });
                gTravaux(projetFiltrees);
                console.log(projetFiltrees);
            });
        } else {
            console.log("Doublon :", cat.name + " ,catégorie déjà existante ! ");
        }
    }
}


function logout () {
    const logElement = document.querySelector("nav li:nth-child(3)")
    logElement.innerText = "Logout"
    logElement.classList.add("hdLog")
    console.log("logout")
    logElement.addEventListener("click", function (event) {
        event.preventDefault
        localStorage.removeItem("token")
        window.location.href = "index.html"
        console.log("Vous êtes déconnecter")
    })
}

    /* Bandeau */
function bandeau () {
    
    const body = document.querySelector("body")
    const header = document.querySelector("header")
    const barEdit = document.createElement("div")
    body.insertBefore(barEdit, header)
    barEdit.classList.add("barEdit")

    const btnBandeau = document.createElement("a")
    btnBandeau.classList.add("aEdit")
    barEdit.appendChild(btnBandeau)
    
    const divEdit = document.createElement("div")
    btnBandeau.appendChild(divEdit)
    
    divEdit.classList.add("divEdit")
    const iconEdit = document.createElement("i")
    iconEdit.classList.add("fa-solid", "fa-pen-to-square");
    const pEdit = document.createElement("p")
    pEdit.innerText = "Mode édition"
    divEdit.appendChild(iconEdit)
    divEdit.appendChild(pEdit)
}

function btnModifier () {

    /* H2 Projet */ 
    const titreH2 = document.querySelector("#portfolio h2")
   
    /* btn modifier */
    const parent = document.querySelector("#portfolio")
    parent.classList.add("loginPf")
    const gallery = document.querySelector(".gallery")
    gallery.classList.add("loginGal")
   
    const btnEdition = document.createElement("button")
    btnEdition.classList.add("btnEdit")

    const divEdit = document.createElement("div")
    divEdit.classList.add("divEdit")
    const iconEdit = document.createElement("i")
    iconEdit.classList.add("fa-solid", "fa-pen-to-square");
    const pEdit = document.createElement("p")
    pEdit.innerText = "modifier"
    divEdit.appendChild(iconEdit)
    divEdit.appendChild(pEdit)

    btnEdition.appendChild(divEdit)
   
    const titreBtn = document.createElement("div")
    titreBtn.classList.add("divH")
    titreBtn.appendChild(titreH2)
    titreBtn.appendChild(btnEdition)
   
    parent.insertBefore(titreBtn, gallery)
}




const token = localStorage.getItem("token")
if (token) {
    console.log("connecter")
    

    logout()
    bandeau()
    btnModifier()
    Popup(projet)
    eventPopup()
    
    

    
    


} else {

    gfilterButton(categoryR)

}






