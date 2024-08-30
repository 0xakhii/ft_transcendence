let canvas = document.getElementById('gamecanvas');
let game = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ballRad = 15;
const paddleHeight = 150;
const paddleWidth = 25;
const leftPaddle = {
	x: 0,
	y: canvas.height / 2 - paddleHeight / 2,
	width: paddleWidth,
	height: paddleHeight,
	dy: 0
};

const rightPaddle = {
	x: canvas.width - paddleWidth,
	y: canvas.height / 2 - paddleHeight / 2,
	width: paddleWidth,
	height: paddleHeight,
	dy: 0
};

const ball = {
	x: canvas.width / 2,
	y: canvas.height / 2,
	rad: ballRad,
	dy: 0,
	dx: 0
};


function draw() {
    game.clearRect(0, 0, canvas.width, canvas.height);
    game.lineWidth = 5;
    game.strokeRect(0, 0, canvas.width, canvas.height);
    game.fillStyle = 'black';
    game.fillRect(0, 0, canvas.width, canvas.height);
    game.clearRect(0, 10, canvas.width, canvas.height - 20);
    leftPaddle.y = Math.max(0, Math.min(leftPaddle.y, canvas.height - leftPaddle.height));
    rightPaddle.y = Math.max(0, Math.min(rightPaddle.y, canvas.height - rightPaddle.height));
    
    game.ImageSmoothingEnabled = true;
    // const img = new Image();
    // img.src = './assets/table.png';
    // img.onload = function() {
    //     game.drawImage(img, 0, 0, canvas.width, canvas.height);
    // };
    // img.onload();
    
    drawStyledPaddle(leftPaddle.x + 10, leftPaddle.y, leftPaddle.width, leftPaddle.height, ['#3498db', '#2980b9']);
    drawStyledPaddle(rightPaddle.x - 10, rightPaddle.y, rightPaddle.width, rightPaddle.height, ['#e74c3c', '#c0392b']);

    game.beginPath();
    game.arc(ball.x, ball.y, ball.rad, 0, Math.PI * 2);
    game.fillStyle = 'orange';
    game.fill();
    game.closePath();
}

function drawStyledPaddle(x, y, width, height, colors) {
    game.save();
    
    let gradient = game.createLinearGradient(x, y, x + width, y);
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(1, colors[1]);
    
    game.shadowColor = 'rgba(0, 0, 0, 0.5)';
    game.shadowBlur = 5;
    game.shadowOffsetX = 5;
    game.shadowOffsetY = 5;
    
    game.beginPath();
    game.moveTo(x + 10, y);
    game.lineTo(x + width - 10, y);
    game.quadraticCurveTo(x + width, y, x + width, y + 10);
    game.lineTo(x + width, y + height - 10);
    game.quadraticCurveTo(x + width, y + height, x + width - 10, y + height);
    game.lineTo(x + 10, y + height);
    game.quadraticCurveTo(x, y + height, x, y + height - 10);
    game.lineTo(x, y + 10);
    game.quadraticCurveTo(x, y, x + 10, y);
    game.closePath();
    
    game.fillStyle = gradient;
    game.fill();
    
    game.restore();
}

function update(){
	leftPaddle.y += leftPaddle.dy;
	rightPaddle.y += rightPaddle.dy;
	ball.x += ball.dx;
	ball.y += ball.dy;
}

function resetBall(){
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = 0;
    ball.dy = 0;
}

function ballMove(){
    if (Math.random() < 0.5){
        ball.dx = 2.5;
        ball.dy = 2.5;
    }
    else{
        ball.dx = -2.5;
        ball.dy = -2.5;
    }
}
let score = {
    right: 0,
    left: 0
};

function RestartButton(){
    const restartButton = document.createElement('button');
    restartButton.innerText = 'Restart';
    restartButton.style.position = 'absolute';
    restartButton.style.left = `${canvas.width / 2 - 100}px`;
    restartButton.style.top = `${canvas.height / 2 + 100}px`;
    restartButton.style.width = '200px';
    restartButton.style.height = '50px';
    restartButton.style.backgroundColor = 'black';
    restartButton.style.color = 'white';
    restartButton.style.fontFamily = 'Arial';
    restartButton.style.fontSize = '30px';
    restartButton.style.border = 'none';
    restartButton.style.cursor = 'pointer';
    
    restartButton.addEventListener('click', function() {
        console.log('Restarted');
        resetBall();
        restartButton.style.display = 'none';
        gameLoop();
    });
    
    canvas.parentNode.appendChild(restartButton);
}

function ballWallCollision(){
    if (ball.y + ball.rad > canvas.height || ball.y - ball.rad < 0)
        ball.dy = -ball.dy;
    if (ball.x + ball.rad > canvas.width || ball.x - ball.rad < 0) {
        if (ball.x + ball.rad > canvas.width){
            score.left++;
        }
        else{
            score.right++;
        }
        resetBall();
    }
    update();
}

function ballPaddleCollision() {
    if (ball.x - ball.rad < leftPaddle.x + leftPaddle.width &&
        ball.y + ball.rad > leftPaddle.y &&
        ball.y - ball.rad < leftPaddle.y + leftPaddle.height &&
        ball.dx < 0) {
        ball.dx = -ball.dx + (Math.random() * 0.5);
    }
    else if (ball.x + ball.rad > rightPaddle.x &&
             ball.y + ball.rad > rightPaddle.y &&
             ball.y - ball.rad < rightPaddle.y + rightPaddle.height &&
             ball.dx > 0) {
        ball.dx = -ball.dx - (Math.random() * 0.5);
    }
    update();
}

function scoreDisplay(){
    game.fillStyle = '#2980b9';
    game.font = '100px Arial';
    game.fillText(score.left, canvas.width / 2 - 100, 100);
    game.fillStyle = '#c0392b';
    game.fillText(score.right, canvas.width / 2 + 40, 100);
}

function gameOver(){
    scoreDisplay();
    if (score.left === 11 || score.right === 11) {
        if (score.left === 11) {
            game.fillStyle = 'black';
            game.fillText('Player 1 wins', canvas.width / 2 - 300, canvas.height / 2);
            return 1;
        }
        if (score.right === 11) {
            game.fillStyle = 'black';
            game.fillText('Player 2 wins', canvas.width / 2 - 300, canvas.height / 2);
            return 1;
        }
    }
}

function gameLoop(){
    draw();
    ballWallCollision();
    ballPaddleCollision();
    if (ball.dx === 0 && ball.dy === 0) {
        ballMove();
    }
    if (gameOver() === 1) {
        score.left = 0;
        score.right = 0;
        RestartButton();
        return 0;
    }
    requestAnimationFrame(gameLoop);
    update();
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(event) {
    if (event.key === 'ArrowUp') {
        rightPaddle.dy = -5;
        if (rightPaddle.y + rightPaddle.dy < 0) {
            rightPaddle.y = 0;
            rightPaddle.dy = 0;
        }
    } else if (event.key === 'ArrowDown') {
        rightPaddle.dy = 5;
        if (rightPaddle.y + rightPaddle.height + rightPaddle.dy > canvas.height) {
            rightPaddle.y = canvas.height - rightPaddle.height;
            rightPaddle.dy = 0;
        }
    }
    if (event.key === 'w') {
        leftPaddle.dy = -5;
        if (leftPaddle.y + leftPaddle.dy < 0) {
            leftPaddle.y = 0;
            leftPaddle.dy = 0;
        }
    } else if (event.key === 's') {
        leftPaddle.dy = 5;
        if (leftPaddle.y + leftPaddle.height + leftPaddle.dy > canvas.height) {
            leftPaddle.y = canvas.height - leftPaddle.height;
            leftPaddle.dy = 0;
        }
    }
}


function keyUpHandler(event) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown')
        rightPaddle.dy = 0;
    if (event.key === 'w' || event.key === 's')
        leftPaddle.dy = 0;
}

gameLoop();
