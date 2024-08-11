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

function gameLoop(){
	update();
	draw();
	requestAnimationFrame(gameLoop);
}
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(event) {
    if (event.key === 'ArrowUp') {
        rightPaddle.dy = -10;
        if (rightPaddle.y + rightPaddle.dy < 0) {
            rightPaddle.y = 0;
            rightPaddle.dy = 0;
        }
    } else if (event.key === 'ArrowDown') {
        rightPaddle.dy = 10;
        if (rightPaddle.y + rightPaddle.height + rightPaddle.dy > canvas.height) {
            rightPaddle.y = canvas.height - rightPaddle.height;
            rightPaddle.dy = 0;
        }
    }
}


function keyUpHandler(event)   
 {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown')
        rightPaddle.dy = 0;
}

gameLoop();