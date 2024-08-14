let canvas = document.getElementById('gamecanvas');
let game = canvas.getContext('2d');
const ballRad = 5;
const paddleHeight = 25;
const paddleWidth = 5;
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
    leftPaddle.y = Math.max(0, Math.min(leftPaddle.y, canvas.height - leftPaddle.height));
    rightPaddle.y = Math.max(0, Math.min(rightPaddle.y, canvas.height - rightPaddle.height));

    game.fillStyle = 'black';
    game.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);

    game.fillStyle = 'black';
    game.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);

    game.beginPath();
    game.arc(ball.x, ball.y, ball.rad, 0, Math.PI * 2);
    game.fillStyle = 'black';
    game.fill();
    game.closePath();
    game.ImageSmoothingEnabled = true;
	// const gradient = game.createRadialGradient(
    //     canvas.width / 2, canvas.height / 2, 0,
    //     canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) / 2
    // );
    // gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    // gradient.addColorStop(1, 'rgba(0, 0, 0, 0.8)');
    // game.fillStyle = gradient;
    // game.fillRect(0, 0, canvas.width, canvas.height);
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
    ball.dx += Math.random() < 0.5 ? -2 : 2;
    ball.dy += Math.random() < 0.5 ? -2 : 2;
}
let score = {
    right: 0,
    left: 0
};
function ballWallCollision(){
    if (ball.y + ball.rad > canvas.height || ball.y - ball.rad < 0) {
        ball.dy = -ball.dy;
    }
    if (ball.x + ball.rad > canvas.width || ball.x - ball.rad < 0) {
        if (ball.x + ball.rad > canvas.width) {
            score.left++;
        } else {
            score.right++;
        }
        resetBall();
    }
}

function ballPaddleCollision(){
    if (ball.x - ball.rad < leftPaddle.x + leftPaddle.width && ball.y > leftPaddle.y && ball.y < leftPaddle.y + leftPaddle.height) {
        ball.dx = -ball.dx + Math.random() % 10;
    }
    if (ball.x + ball.rad > rightPaddle.x && ball.y > rightPaddle.y && ball.y < rightPaddle.y + rightPaddle.height) {
        ball.dx = -ball.dx + Math.random() % 10;
    }
}

function scoreDisplay(){
    game.font = '20px Arial';
    game.fillText(score.left, canvas.width / 2 - 30, 30);
    game.fillText(score.right, canvas.width / 2 + 10, 30);
}

function gameLoop(){
	update();
	draw();
    scoreDisplay();
    ballWallCollision();
    ballPaddleCollision();
    if (ball.dx === 0 && ball.dy === 0) {
        ballMove();
    }
	requestAnimationFrame(gameLoop);
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


function keyUpHandler(event)   
 {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown')
        rightPaddle.dy = 0;
    if (event.key === 'w' || event.key === 's')
        leftPaddle.dy = 0;
}

gameLoop();