const maxLayers = 15;
const minLayers = 15;
const OLayerWeight = 0.5;
const RELayerWeight = 1.0 - OLayerWeight;

let layers = [
    '<img src="images/O.png" class="O layer" id="layer2" style="z-index: 3" alt=""/>',
    '<img src="images/RE.png" class="RE layer" id="layer1" style="z-index: 2; margin-top: 25px" alt=""/>',
    '<img src="images/O.png" class="O layer" id="layer0" style="z-index: 1; margin-top: 50px" alt=""/>',
];

var speechText = "OREO";
var buttonsDisabled = false;

function randomize() {
    if (buttonsDisabled) return;
    layers.length = 0;
    let numOfLayers =
        Math.floor(Math.random() * (maxLayers - minLayers + 1)) + minLayers;

    let resultImage = "";
    let resultText = "";
    for (let i = 0; i < numOfLayers; i++) {
        let randomNumber = Math.random();
        let imageChoice =
            randomNumber <= OLayerWeight
                ? 'src="images/O.png" class="O layer"'
                : 'src="images/RE.png" class="RE layer"';
        let layer = `<img ${imageChoice} id="layer${
            numOfLayers - i - 1
        }"style="z-index: ${numOfLayers - i}; margin-top: ${i * 25}px"/>`;
        layers.push(layer);
        resultImage += layer;
        resultText += randomNumber <= OLayerWeight ? "O" : "RE";
    }
    speechText = resultText;
    document.getElementById("result").innerHTML = resultImage;
    document.getElementById("name").innerText = resultText;
    speak();
}

function removeLayer() {
    if (buttonsDisabled) return;
    layers.pop();
    let resultText = "";
    let tmpLayers = [];
    layers.forEach((layer, i) => {
        let img = document.getElementById(`layer${layers.length - i - 1}`);
        img.style.zIndex = layers.length - i;
        img.style.marginTop = `${i * 25}px`;
        img.id = `layer${layers.length - i - 1}`;
        resultText += img.classList.contains("O") ? "O" : "RE";
        tmpLayers.push(img.outerHTML);
    });
    layers.length = 0;
    layers = tmpLayers;
    speechText = resultText;
    document.getElementById("result").innerHTML = layers.join("");
    document.getElementById("name").innerText = resultText;
    speak();
}

function speak() {
    if (buttonsDisabled) return;
    still();
    beat();
    var utterThis = new SpeechSynthesisUtterance(speechText);
    utterThis.onend = function (event) {
        buttonsDisabled = false;
        spin();
        stopBeating();
    };

    window.speechSynthesis.speak(utterThis);
    buttonsDisabled = true;
}

function spin() {
    document.getElementById("randomize").classList.add("fa-spin");
}
function still() {
    document.getElementById("randomize").classList.remove("fa-spin");
}
function beat() {
    document.getElementById("speak").classList.add("fa-beat");
}
function stopBeating() {
    document.getElementById("speak").classList.remove("fa-beat");
}
document
    .getElementById("randomize")
    .addEventListener("click", randomize, false);

document.getElementById("speak").addEventListener("click", speak, false);

document.getElementById("result").addEventListener("click", removeLayer, false);
document.getElementById("result").innerHTML = layers.join("");
document.getElementById("name").innerHTML = "OREO";
