/*import {functionName} from "./secondaire.js"*/

let projet = window.localStorage.getItem('works');

if (projet === null) {
    const reponse = await fetch("http://localhost:5678/api/works");
    projet = await reponse.json();

    const valeurWorks = JSON.stringify(projet)
    window.localStorage.setItem("works", valeurWorks)
} else {
    projet = JSON.parse(projet);
}

const gallery = document.querySelector(".gallery")

function gTravaux(projet) {



    for (let pj of projet) {
        const figure = document.createElement("figure")
        console.log(pj)
        const title = document.createElement("p")
        title.innerText = pj.title

        const img = document.createElement("img")
        img.src = pj.imageUrl
        img.alt = pj.title
        console.log(img.src)
        /*categoryId = pj.category.id et 
        userId = 1 pour tout les travaux 
        existant de bases donc les 11 premiers */
        const categoryId = pj.categoryId
        const userId = pj.userId

        const category = pj.category
        const id = pj.id

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
    navElement.appendChild(filterAll)

    const filterBtn = []

    for (let cat of categoryR) {

        const filterButton = document.createElement("button")
        filterButton.innerText = cat.name
        filterButton.classList.add("btn-filter")
        filterButton.addEventListener("click", function () {
            console.log(cat)
        })
        navElement.appendChild(filterButton)
    }

    filterAll.addEventListener("click", function () {
        return projet
    })
}



gfilterButton(categoryR)


