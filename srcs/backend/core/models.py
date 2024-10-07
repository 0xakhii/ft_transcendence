# from django.db import models

# Create your models here.
import random


canvasWidth = 0
canvasHeight = 0

class Paddle:
    def __init__(self, x, y, width=25, height=150, dy=5, color='#3498db'):
        self.x = x
        self.y = y
        self.width = width
        self.height = height
        self.dy = dy
        self.ballTouchedPaddle = False
        self.color = color

class Ball:
    def __init__(self, x, y, radius=15, dx=0, dy=0, speed=5):
        self.x = x
        self.y = y
        self.radius = radius
        self.dx = dx
        self.dy = dy
        self.speed = speed

left_paddle = Paddle(0, canvasHeight // 2)
right_paddle = Paddle(canvasWidth - 25, canvasHeight // 2, color='#e74c3c')
ball = Ball(canvasWidth // 2, canvasHeight // 2)

score = {'left': 0, 'right': 0}

class Game:
    def __init__(self, canvasWidth, canvasHeight, left_paddle, right_paddle, ball, score):
        self.canvasWidth = canvasWidth
        self.canvasHeight = canvasHeight
        self.left_paddle = left_paddle
        self.right_paddle = right_paddle
        self.ball = ball
        self.score = score
    def reset_ball(ball):
        ball.x = canvasWidth / 2
        ball.y = canvasHeight / 2
        ball.dx = 0
        ball.dy = 0
        ball.speed = 5

    def ball_move(ball):
        if random.random() < 0.5:
            ball.dx = 2.5
            ball.dy = 2.5
        else:
            ball.dx = -2.5
            ball.dy = -2.5

    def ball_wall_collision(ball):
        global score
        
        if ball.y + ball.radius > canvasHeight or ball.y - ball.radius < 0:
            ball.dy = -ball.dy
        
        if ball.x + ball.radius > canvasWidth or ball.x - ball.radius < 0:
            if ball.x + ball.radius > canvasWidth:
                score['left'] += 1
            else:
                score['right'] += 1
            
            Game.reset_ball(ball)

    def ball_paddle_collision(ball, left_paddle, right_paddle):
        if (ball.x - ball.radius < left_paddle.x + left_paddle.width and
            ball.y + ball.radius > left_paddle.y and
            ball.y - ball.radius < left_paddle.y + left_paddle.height and
            ball.dx < 0):
            
            ball.dx = -ball.dx + (random.random() * 0.5)
            left_paddle.ballTouchedPaddle = True
        
        elif (ball.x + ball.radius > right_paddle.x and
            ball.y + ball.radius > right_paddle.y and
            ball.y - ball.radius < right_paddle.y + right_paddle.height and
            ball.dx > 0):
            
            ball.dx = -ball.dx - (random.random() * 0.5)
            right_paddle.ballTouchedPaddle = True
        
        ball.speed += 0.1

    def paddle_move(paddle, direction):
        if direction == 'up' and paddle.y > 0:
            paddle.y -= paddle.dy
        elif direction == 'down' and paddle.y + paddle.height < canvasHeight:
            paddle.y += paddle.dy

    def paddle_stop(paddle):
        if (paddle.dy != 0):
            paddle.dy = 0

    def paddleMovements(request):
        if (request.GET.get('direction') == 'up'):
            Game.paddle_move(right_paddle,'up')
        elif (request.GET.get('direction') == 'down'):
            Game.paddle_move(right_paddle, 'down')
        elif (request.GET.get('direction') == 'stop'):
            Game.paddle_stop(right_paddle)

# if (ball.dx == 0 and ball.dy == 0):
# 	ball_move(ball)

# if (score['left'] == 11 or score['right'] == 11):
# 	reset_ball(ball)
# 	score = {'left': 0, 'right': 0}

def init():
    return Game(canvasWidth, canvasHeight, left_paddle, right_paddle, ball, score)