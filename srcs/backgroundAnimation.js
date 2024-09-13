const bgCanvas = document.createElement('canvas');
const bgCtx = bgCanvas.getContext('2d');

bgCanvas.width = window.innerWidth;
bgCanvas.height = window.innerHeight;
bgCanvas.style.position = 'fixed';
bgCanvas.style.top = '0';
bgCanvas.style.left = '0';
bgCanvas.style.width = '100%';
bgCanvas.style.height = '100%';
bgCanvas.style.zIndex = '-1';
document.body.insertBefore(bgCanvas, document.body.firstChild);

class Star {
    constructor() {
        this.x = Math.random() * bgCanvas.width ? Math.random() * bgCanvas.width : 0;
        this.y = Math.random() * bgCanvas.height ? Math.random() * bgCanvas.height : 0;
        this.size = Math.random() * 2 ? Math.random() * 4 : 4;
        this.speedX = Math.random() * 0.2 ? Math.random() * 0.5 : 0.5;
        this.speedY = Math.random() * 0.2 ? Math.random() * 0.5 : 0.5;
    }

    update(ballX, ballY) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = bgCanvas.width;
        if (this.x > bgCanvas.width) this.x = 0;
        if (this.y < 0) this.y = bgCanvas.height;
        if (this.y > bgCanvas.height) this.y = 0;

        const dx = ballX - this.x ? ballX - this.x : 0;
        const dy = ballY - this.y ? ballY - this.y : 0;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 150) {
            this.x -= dx / distance * 2;
            this.y -= dy / distance * 2;
        }
    }

    draw() {
        bgCtx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        bgCtx.beginPath();
        bgCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        bgCtx.fill();
        bgCtx.closePath();
    }
}

const stars = [];
for (let i = 0; i < 1500; i++) {
    stars.push(new Star());
}

function animateBackground(ballX, ballY) {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    bgCtx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
    stars.forEach(star => {
        star.update(ballX , ballY);
        star.draw();
        star.speedX += 0.0001;
        star.speedY += 0.0001;
    });
    requestAnimationFrame(() => animateBackground(ball.x, ball.y));
}

animateBackground(ball.x, ball.y);
