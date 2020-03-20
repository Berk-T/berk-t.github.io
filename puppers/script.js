const kennel = document.querySelector(".kennel")

var breeds = document.querySelector(".dog-selector")

function addDoggo(){
    const DOGGO_URL = "https://dog.ceo/api/breed/" + breeds.options[breeds.selectedIndex].value + "/images/random"
    const promise = fetch(DOGGO_URL)
    promise
        .then(function(response){
            const processPromise = response.json()
            return processPromise
        })
        .then(function(processPromise){
            if(processPromise.status === "success"){
                console.log("hi")
                kennel.src = processPromise.message
            }
            else{
                kennel.src = "error-pupper.jpg"
            }
        })
}

document.querySelector(".doggo-button").addEventListener("click", addDoggo)