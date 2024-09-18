let canvas = document.getElementById('gamecanvas');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ball;
let leftPaddle;
let rightPaddle;
let score;

// const ballRad = 15;
// const paddleHeight = 150;
// const paddleWidth = 25;
// let ballTouchedWall = false;
// const leftPaddle = {
// 	x: 0,
// 	y: canvas.height / 2 - paddleHeight / 2,
// 	width: paddleWidth,
// 	height: paddleHeight,
// 	dy: 0,
//     ballTouchedPaddle: false,
//     color: '#3498db'
// };

// const rightPaddle = {
// 	x: canvas.width - paddleWidth,
// 	y: canvas.height / 2 - paddleHeight / 2,
// 	width: paddleWidth,
// 	height: paddleHeight,
// 	dy: 0,
//     ballTouchedPaddle: false,
//     color: '#e74c3c'
// };

// const ball = {
// 	x: canvas.width / 2,
// 	y: canvas.height / 2,
// 	rad: ballRad,
// 	dy: 0,
// 	dx: 0,
//     speed: 5,
// };

// function drawBall(game, ball) {
//     game.beginPath();
//     game.arc(ball.x, ball.y, ball.rad, 0, Math.PI * 2);
//     game.fillStyle = 'rgba(255, 165, 0)';
//     game.fill();
//     game.closePath();
  
//     for (let i = 1; i <= ball.speed && ball.speed > 10; i++) {
//         game.beginPath();
//         let radius = Math.abs(ball.rad - i);
//         game.arc(ball.x - ball.dx * i * 2, ball.y - ball.dy * i * 2, radius, 0, Math.PI * 2);
//         game.fillStyle = `rgba(255, 165, 50, ${(0.3 - i * ball.speed / 1000)})`;
//         game.shadowBlur = -10;
//         game.fill();
//         game.closePath();
//     }
// }


// function draw() {
    
//     if (ballTouchedWall) {
//         game.shadowColor = 'rgb(254, 167, 10)';
//         game.shadowBlur = 10;
//         game.shadowOffsetX = 0;
//         game.shadowOffsetY = 0;
//     }
//     leftPaddle.y = Math.max(0, Math.min(leftPaddle.y, canvas.height - leftPaddle.height));
//     rightPaddle.y = Math.max(0, Math.min(rightPaddle.y, canvas.height - rightPaddle.height));
    
//     game.shadowColor = 'rgba(0, 0, 0, 0.5)';
//     drawStyledPaddle(leftPaddle.x + 10, leftPaddle.y, leftPaddle.width, leftPaddle.height, ['#3498db', '#2980b9']);
//     drawStyledPaddle(rightPaddle.x - 10, rightPaddle.y, rightPaddle.width, rightPaddle.height, ['#e74c3c', '#c0392b']);

//     drawBall(game, ball);
// }

function drawStyledPaddle(x, y, width, height, colors) {
    ctx.save();
    
    let gradient = ctx.createLinearGradient(x, y, x + width, y);
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(1, colors[1]);
    
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    
    ctx.beginPath();
    ctx.moveTo(x + 10, y);
    ctx.lineTo(x + width - 10, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + 10);
    ctx.lineTo(x + width, y + height - 10);
    ctx.quadraticCurveTo(x + width, y + height, x + width - 10, y + height);
    ctx.lineTo(x + 10, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - 10);
    ctx.lineTo(x, y + 10);
    ctx.quadraticCurveTo(x, y, x + 10, y);
    ctx.closePath();
    if (leftPaddle.ballTouchedPaddle || rightPaddle.ballTouchedPaddle) {
        if (leftPaddle.ballTouchedPaddle)
            ctx.shadowColor = leftPaddle.color;
        else
            ctx.shadowColor = rightPaddle.color;
        ctx.shadowBlur = 50;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }
    ctx.fillStyle = gradient;
    ctx.fill();
    
    ctx.restore();
}

function update(){
	leftPaddle.y += leftPaddle.dy;
	rightPaddle.y += rightPaddle.dy;
	ball.x += ball.dx;
	ball.y += ball.dy;
}

// function resetBall(){
//     ball.x = canvas.width / 2;
//     ball.y = canvas.height / 2;
//     ball.dx = 0;
//     ball.dy = 0;
//     ball.speed = 5;
// }

// function ballMove(){
//     if (Math.random() < 0.5){
//         ball.dx = 2.5;
//         ball.dy = 2.5;
//     }
//     else{
//         ball.dx = -2.5;
//         ball.dy = -2.5;
//     }
// }
// let score = {
//     right: 0,
//     left: 0
// };

function RestartButton(){
    const restartButton = document.createElement('button');
    restartButton.classList.add('restart-button');
    restartButton.innerText = 'Restart';
    restartButton.style.position = 'absolute';
    restartButton.style.left = `${canvas.width / 2 - 100}px`;
    restartButton.style.top = `${canvas.height / 2 + 100}px`;
    restartButton.style.width = '200px';
    restartButton.style.height = '50px';
    restartButton.style.borderRadius = '15px';
    if (score.left === 11){
        restartButton.style.backgroundColor = '#3498db';
        restartButton.style.color = '#ff4444';
    }
    else if (score.right === 11){
        restartButton.style.backgroundColor = '#ff4444';
        restartButton.style.color = '#3498db';
    }
    restartButton.style.fontSize = '30px';
    restartButton.style.border = 'none';
    restartButton.style.cursor = 'pointer';
    
    restartButton.addEventListener('click', function() {
        console.log('Restarted');
        resetBall();
        restartButton.style.display = 'none';
        score.left = 0;
        score.right = 0;
        gameLoop();
    });
    
    canvas.parentNode.appendChild(restartButton);
}

function PrintTimer(timer, color){
    const countdownWidth = 100;
    const countdownHeight = 100;
    const clearX = canvas.width / 2 - countdownWidth / 2;
    const clearY = canvas.height / 2 - countdownHeight / 2;
    ctx.clearRect(clearX, clearY, countdownWidth, countdownHeight);
    ctx.fillStyle = color;
    ctx.font = '50px "Press Start 2P"';
    ctx.fillText(timer, canvas.width / 2, canvas.height / 2 + 5);
}

let countdownTimerId;
let gamePaused = false;
let timer = 3;
function countdown(seconds, color, resetBall) {
    resetBall();
    draw();
    let timer = seconds;
    if (countdownTimerId)
        clearTimeout(countdownTimerId);
    const countdownTimer = () => {
        countdownTimerId = setTimeout(() => {
            ctx.fillStyle = color;
            ctx.font = '75px "Press Start 2P"';
            PrintTimer(timer, color);
            timer--;
            if (timer >= 0) {
                countdownTimer();
            } else {
                console.log("Countdown finished!");
                gamePaused = false;
                gameLoop();
                update();
                return;
            }
        }, 1000);
    };
    gamePaused = true;
    countdownTimer();
}

// function ballWallCollision() {
//     if (ball.y + ball.rad > canvas.height || ball.y - ball.rad < 0) {
//         ball.dy = -ball.dy;
//         ballTouchedWall = true;
//     }
//     if (ball.x + ball.rad > canvas.width || ball.x - ball.rad < 0) {
//         if (ball.x + ball.rad > canvas.width) {
//             score.left++;
//             if (score.left != 11)
//                 countdown(3, '#2980b9', resetBall);
//         } else {
//             score.right++;
//             if (score.right != 11)
//                 countdown(3, '#c0392b', resetBall);
//         }
//         resetBall();
//         return;
//     }
//     update();
// }


// function ballPaddleCollision() {
//     if (ball.x - ball.rad < leftPaddle.x + leftPaddle.width &&
//         ball.y + ball.rad > leftPaddle.y &&
//         ball.y - ball.rad < leftPaddle.y + leftPaddle.height &&
//         ball.dx < 0) {
//         ball.dx = -ball.dx + (Math.random() * 0.5);
//         leftPaddle.ballTouchedPaddle = true;
//     }
//     else if (ball.x + ball.rad > rightPaddle.x &&
//              ball.y + ball.rad > rightPaddle.y &&
//              ball.y - ball.rad < rightPaddle.y + rightPaddle.height &&
//              ball.dx > 0) {
//         ball.dx = -ball.dx - (Math.random() * 0.5);
//         rightPaddle.ballTouchedPaddle = true;
//     }
//     ball.speed += 0.01;
//     update();
// }


function scoreDisplay() {
    document.fonts.load('75px "Press Start 2P"').then(function () {
        ctx.fillStyle = '#2980b9';
        ctx.font = '75px "Press Start 2P"';
        ctx.fillText(score.left, canvas.width / 2 - 160, 150);
        ctx.fillStyle = '#c0392b';
        ctx.fillText(score.right, canvas.width / 2 + 60, 150);
    }).catch(function (error) {
        console.error('Font could not be loaded', error);
    });
}

function gameOver(){
    scoreDisplay();
    if (score.left === 11 || score.right === 11) {
        if (score.left === 11) {
            ctx.fillStyle = '#2980b9';
            ctx.fillText('Player 1 won', canvas.width / 2 - 300, canvas.height / 2);
            return 1;
        }
        if (score.right === 11) {
            ctx.fillStyle = '#c0392b';
            ctx.fillText('Player 2 won', canvas.width / 2 - 300, canvas.height / 2);
            return 1;
        }
        resetBall();
        draw();
    }
}

let lastRequestTime = 0;
function makeRequest() {
    const now = Date.now();
    if (now - lastRequestTime > 1000) {  // One request per second
        fetchGameState();
        lastRequestTime = now;
    }
}
function gameLoop(){
    // setInterval(fetchGameState, 100);
    makeRequest();  // Call the throttling function
    // Example throttling function

    // if (gamePaused)
    //     return;
    // draw();
    // ballTouchedWall = false;
    // leftPaddle.ballTouchedPaddle = false;
    // rightPaddle.ballTouchedPaddle = false;
    // ballWallCollision();
    // ballPaddleCollision();
    // if (ball.dx === 0 && ball.dy === 0) {
    //     ballMove();
    // }
    // if (score.left === 5 || score.right === 5) {
    //     if (score.left === 5)
    //         leftPaddle.height = 50;
    //     else
    //         rightPaddle.height = 50;
    // }
    // if (gameOver() === 1 && (score.left === 11 || score.right === 11)) {
    //     RestartButton();
    //     return 0;
    // }
    requestAnimationFrame(gameLoop);
    // update();
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(event) {
    if (event.key === 'ArrowUp') {
        // rightPaddle.dy = -5;
        // if (rightPaddle.y + rightPaddle.dy < 0) {
        //     rightPaddle.y = 0;
        //     rightPaddle.dy = 0;
        // }
        // fetch('http://localhost:8000', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ direction: 'up' })
        // });
    } else if (event.key === 'ArrowDown') {
        // rightPaddle.dy = 5;
        // if (rightPaddle.y + rightPaddle.height + rightPaddle.dy > canvas.height) {
        //     rightPaddle.y = canvas.height - rightPaddle.height;
        //     rightPaddle.dy = 0;
        // }
        // fetch('http://localhost:8000', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ direction: 'down' })
        // });
    }
    // if (event.key === 'w') {
    //     leftPaddle.dy = -5;
    //     if (leftPaddle.y + leftPaddle.dy < 0) {
    //         leftPaddle.y = 0;
    //         leftPaddle.dy = 0;
    //     }
    // } else if (event.key === 's') {
    //     leftPaddle.dy = 5;
    //     if (leftPaddle.y + leftPaddle.height + leftPaddle.dy > canvas.height) {
    //         leftPaddle.y = canvas.height - leftPaddle.height;
    //         leftPaddle.dy = 0;
    //     }
    // }
}


function keyUpHandler(event) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown'){
        // fetch('http://localhost:8000/', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ direction: 'stop' })
        // });
        // rightPaddle.dy = 0;
    }
    if (event.key === 'w' || event.key === 's')
        leftPaddle.dy = 0;
}

gameLoop();

function fetchGameState() {
    try{
        fetch("http://localhost:8000/")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data){
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.ImageSmoothingEnabled = true;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.lineWidth = 5;
                ctx.strokeRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = 'rgb(254, 167, 10, 0.8)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.clearRect(0, 10, canvas.width, canvas.height - 20);
                
                ball = data.ball;
                ctx.beginPath();
                ctx.arc(ball.x, ball.y, ball.rad, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 165, 0)';
                ctx.fill();
                ctx.closePath();
                
                for (let i = 1; i <= ball.speed && ball.speed > 10; i++) {
                ctx.beginPath();
                let radius = Math.abs(ball.rad - i);
                ctx.arc(ball.x - ball.dx * i * 2, ball.y - ball.dy * i * 2, radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 165, 50, ${(0.3 - i * ball.speed / 1000)})`;
                ctx.shadowBlur = -10;
                ctx.fill();
                ctx.closePath();
                }
                leftPaddle = data.left_paddle;
                drawStyledPaddle(leftPaddle.x + 10, leftPaddle.y, leftPaddle.width, leftPaddle.height, ['#3498db', '#2980b9']);
                
                rightPaddle = data.right_paddle;
                drawStyledPaddle(rightPaddle.x - 10, rightPaddle.y, rightPaddle.width, rightPaddle.height, ['#e74c3c', '#c0392b']);
                score = data.score;
            }
            else {
                throw new Error('No data received');
            }
        });
    }
    catch (error){
        console.error('Error fetching game state:', error);
    }
}
