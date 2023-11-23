document.addEventListener("DOMContentLoaded",doStuff)

let goodFilter = false

function doStuff(){
    document.getElementById("good-dog-filter").addEventListener("click",() => {
        goodFilter = !goodFilter
        removeChildren(document.getElementById("dog-bar"))
        console.log(goodFilter)
        getDogNames()
    })

    getDogNames()
}

function getDogNames(){
    if(goodFilter === false){
        fetch("http://localhost:3000/pups")
        .then(resp => resp.json())
        .then(data => data.forEach(element => makeDogSpan(element)))
    }else{
        fetch("http://localhost:3000/pups")
        .then(resp => resp.json())
        .then(data => data.forEach(element => {
            if (element.isGoodDog === true){
                makeDogSpan(element)}}))
    }

    
}

function makeDogSpan(dog){
    const dogName = document.createElement("span")

    dogName.innerText = dog.name
    dogName.addEventListener("click",(e) => getOneDog(dog,dog))

    document.querySelector("#dog-bar").append(dogName)
}

function getOneDog({name,image,isGoodDog},dog){
    removeChildren(document.getElementById("dog-info"))

    const dogTitle = document.createElement("h2")
    const dogButton = document.createElement("button")
    const dogImage = document.createElement("img")

    dogTitle.innerText = name
    dogButton.innerText = isGoodDog === true ? "Is good dog!":"Not good dog..."
    dogImage.src = image

    dogButton.addEventListener("click",() => changeGoodness(dog))

    document.getElementById("dog-info").append(dogImage,dogTitle,dogButton)
}

function removeChildren(parent){
    while (parent.firstChild){
        parent.firstChild.remove()
    }
}

function changeGoodness(dogObj){
    dogObj.isGoodDog = !dogObj.isGoodDog
    document.querySelector("#dog-info button").innerText = dogObj.isGoodDog === true ? "Is good dog!":"Not good dog..."

    console.log(dogObj)
    patchDog(dogObj)
}

function patchDog(dog){
    fetch(`http://localhost:3000/pups/${dog.id}`,{
        method: "PATCH",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dog)
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
}

