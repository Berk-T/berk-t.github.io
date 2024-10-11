const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = document.body.scrollWidth;
canvas.height = window.innerHeight;

const particleColors = [
    "rgb(93, 135, 172)",
    "rgb(93, 135, 172)",
    "rgb(127, 176, 105)",
    "rgb(127, 176, 105)",
    "rgb(255, 144, 0)",
]; // 40% Silver Lake Blue, 40% Asparagus, %20 Princeton Orange

const lineColor = "rgb(202, 255, 208)"; // Tea Green
const mouseParticleColor = "rgb(255, 77, 90)"; // Folly Red

const densityFactor = 0.0002;
const particlesArray = [];
let numberOfParticles = 600;
const maxLineDistance = 75;
const mouse = {
    x: null,
    y: null,
    radius: 300,
};

window.addEventListener("mousemove", function (event) {
    mouse.x = event.clientX + window.scrollX;
    mouse.y = event.clientY + window.scrollY;
    console.log(mouse.x, mouse.y);
});

class Particle {
    constructor(isMouseFollower = false) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() * 2 - 1.5) * 0.2;
        this.speedY = (Math.random() * 2 - 1.5) * 0.2;
        this.color =
            particleColors[Math.floor(Math.random() * particleColors.length)];

        if (isMouseFollower) {
            this.size = 4;
            this.color = mouseParticleColor;
            this.speedX = 0;
            this.speedY = 0;
            this.x = mouse.x;
            this.y = mouse.y;
        }
    }

    create() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        const particleDistance = Math.sqrt(
            (this.x - mouse.x) ** 2 + (this.y - mouse.y) ** 2
        );
        const opacity = Math.max(1 - particleDistance / mouse.radius, 0.1);
        ctx.fillStyle =
            this.color.slice(0, -1) + `,${opacity})`.replace("rgb, rgba");
        ctx.fill();
    }

    animate() {
        for (let i = 1; i < particlesArray.length; i++) {
            const particle = particlesArray[i];
            if (particle.y < 0 || particle.y > canvas.height) {
                particle.speedY = -particle.speedY;
            }
            if (particle.x < 0 || particle.x > canvas.width) {
                particle.speedX = -particle.speedX;
            }

            particle.x += particle.speedX;
            particle.y += particle.speedY;
        }
    }

    line() {
        for (let i = 0; i < particlesArray.length; i++) {
            for (let j = 0; j < particlesArray.length; j++) {
                if (i === j) continue;
                const distance = Math.sqrt(
                    (particlesArray[i].x - particlesArray[j].x) ** 2 +
                        (particlesArray[i].y - particlesArray[j].y) ** 2
                );

                if (distance < maxLineDistance) {
                    const particleDistance = Math.min(
                        Math.sqrt(
                            (particlesArray[i].x - mouse.x) ** 2 +
                                (particlesArray[i].y - mouse.y) ** 2
                        ),
                        Math.sqrt(
                            (particlesArray[j].x - mouse.x) ** 2 +
                                (particlesArray[j].y - mouse.y) ** 2
                        )
                    );
                    const opacity = Math.max(
                        1 - particleDistance / mouse.radius,
                        0.01
                    );
                    ctx.strokeStyle = lineColor.slice(0, -1) + `,${opacity})`;
                    ctx.lineWidth = 0.3;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    }
}

function init() {
    particlesArray.length = 0;
    numberOfParticles = Math.floor(
        canvas.width * canvas.height * densityFactor
    );
    mouse.radius = Math.max(canvas.width, canvas.height) / 8;

    const mouseFollower = new Particle(true);
    particlesArray.push(mouseFollower);

    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 1; i < particlesArray.length; i++) {
        particlesArray[i].create();
    }
    particlesArray[0].x = mouse.x;
    particlesArray[0].y = mouse.y;
    particlesArray[0].create();
    particlesArray[0].animate();
    particlesArray[0].line();
    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});
