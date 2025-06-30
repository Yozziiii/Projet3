/*import {functionName} from "./secondaire.js"*/
    const token = localStorage.getItem("token")
    if(token){
        console.log("connecter")
        /*login to logout */ 
        const logElement = document.querySelector("nav li:nth-child(3)")
        logElement.innerText = "Logout"
        logElement.classList.add("hdLog")

        /* remove catégorie
        if(document.querySelector("#portfolio nav")) {
            document.querySelector("#portfolio nav").remove()
        }*/


        /* Bandeau */

        const body = document.querySelector("body")
        const header = document.querySelector("header")
        const barEdit = document.createElement("div")
        body.insertBefore(barEdit, header)
        barEdit.classList.add("barEdit")
        
        
        const divEdit = document.createElement("div")
        barEdit.appendChild(divEdit)

        divEdit.classList.add("divEdit")
        const iconEdit = document.createElement("i")
        iconEdit.classList.add("fa-solid", "fa-pen-to-square");
        const pEdit = document.createElement("p")
        pEdit.innerText = "Mode édition"
        divEdit.appendChild(iconEdit)
        divEdit.appendChild(pEdit)

        /* btn modifier */
        const parent = document.querySelector("#portfolio")
        const gallery = document.querySelector(".gallery")
        
        const btnEdition = document.createElement("a")
        const cloneEdition = divEdit.cloneNode(true)
        cloneEdition.classList.add("btnEdition")
        btnEdition.appendChild(cloneEdition)
        parent.insertBefore(btnEdition , gallery)
        



    }
    const reponse = await fetch("http://localhost:5678/api/works");
    const projet = await reponse.json();

    const valeurWorks = JSON.stringify(projet)
    window.localStorage.setItem("works", valeurWorks)

const gallery = document.querySelector(".gallery")

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


const categoryRep = await fetch("http://localhost:5678/api/categories");
const categoryR = await categoryRep.json();

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
gfilterButton(categoryR)
