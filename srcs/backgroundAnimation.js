// Create a new canvas for the particle animation
const particleCanvas = document.createElement('canvas');
const particleCtx = particleCanvas.getContext('2d');

// Style the particle canvas
particleCanvas.style.position = 'fixed';
particleCanvas.style.top = '0';
particleCanvas.style.left = '0';
particleCanvas.style.width = '100%';
particleCanvas.style.height = '100%';
particleCanvas.style.zIndex = '-1'; // Place it behind other elements
particleCanvas.style.pointerEvents = 'none'; // Allow click events to pass through

// Add the particle canvas to the body
document.body.insertBefore(particleCanvas, document.body.firstChild);

// Set particle canvas size
particleCanvas.width = window.innerWidth;
particleCanvas.height = window.innerHeight;

const particleColor = "rgba(255,255,255)"; // Reduced opacity
const color__ = "rgba(255,255,255,";
let particlesArray;

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        particleCtx.beginPath();
        particleCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        particleCtx.fillStyle = this.color;
        particleCtx.fill();
    }

    update() {
        if (this.x > particleCanvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > particleCanvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (particleCanvas.height * particleCanvas.width) / 15000; // Reduced number of particles
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 0.1; // Smaller particles
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 1) - 0.5; // Slower movement
        let directionY = (Math.random() * 1) - 0.5; // Slower movement
        particlesArray.push(new Particle(x, y, directionX, directionY, size, particleColor));
    }
}

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (particleCanvas.width/7) * (particleCanvas.height/7)) {
                opacityValue = 1 - (distance/20000);
                particleCtx.strokeStyle = color__ + opacityValue * 0.5 + ')'; // Reduced opacity
                particleCtx.lineWidth = 0.2; // Thinner lines
                particleCtx.beginPath();
                particleCtx.moveTo(particlesArray[a].x, particlesArray[a].y);
                particleCtx.lineTo(particlesArray[b].x, particlesArray[b].y);
                particleCtx.stroke();
            }
        }
    }
}

function animateParticles() {
    requestAnimationFrame(animateParticles);
    particleCtx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

window.addEventListener('resize', function() {
    particleCanvas.width = innerWidth;
    particleCanvas.height = innerHeight;
    init();
});

// Initialize and start the particle animation
init();
animateParticles();