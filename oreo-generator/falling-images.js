const canvas = document.getElementById("falling-images-canvas");
const ctx = canvas.getContext("2d");

const images = ["images/OREO.png"]; // Add paths to your images here
const fallingImages = [];
const imageLimit = 20;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createFallingImage() {
    if (fallingImages.length >= imageLimit) {
        return;
    }
    const img = new Image();
    img.src = images[Math.floor(Math.random() * images.length)];
    img.onload = () => {
        const fallingImage = {
            img: img,
            x: Math.random() * canvas.width,
            y: Math.random() * -150 - 150,
            speed: Math.random() * 10 + canvas.height * 0.002,
            width: img.width * 1.5,
            height: img.height * 1.5,
        };
        fallingImages.push(fallingImage);
    };
}

function updateFallingImages() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < fallingImages.length; i++) {
        const img = fallingImages[i];
        img.y += img.speed;
        if (img.y > canvas.height) {
            fallingImages.splice(i, 1);
            i--;
        } else {
            ctx.drawImage(img.img, img.x, img.y, img.width, img.height);
        }
    }
}

function animate() {
    updateFallingImages();
    requestAnimationFrame(animate);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
setInterval(createFallingImage, 500);
animate();
