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
        console.log("suisla")
         gTravaux(projet)
    })



    for (let cat of categoryR) {

        const filterButton = document.createElement("button")
        filterButton.innerText = cat.name
        filterButton.classList.add("btn-filter")
        navElement.appendChild(filterButton)
        
        filterButton.addEventListener("click", function () {
            console.log(filterButton)
            const projetFiltrees = projet.filter(function (pj) {
                return pj.category.name === filterButton.innerText
            })
            document.querySelector(".gallery").innerHTML = "";
            gTravaux(projetFiltrees)
            console.log(projetFiltrees)
        }
    )


    }


}



gfilterButton(categoryR)


