const kennel = document.querySelector(".kennel")

var breeds = document.querySelector(".dog-selector")

function addDoggo(){
    var dogBreed = breeds.options[breeds.selectedIndex].value.replace('-','/')
    const DOGGO_URL = "https://dog.ceo/api/breed/" + dogBreed + "/images/random"
    const promise = fetch(DOGGO_URL)
    promise
        .then(function(response){
            const processPromise = response.json()
            return processPromise
        })
        .then(function(processPromise){
            if(processPromise.status === "success"){
                kennel.src = processPromise.message
            }
            else{
                kennel.src = "./error-pupper.JPG"
            }
        })
}

document.querySelector(".doggo-button").addEventListener("click", addDoggo)