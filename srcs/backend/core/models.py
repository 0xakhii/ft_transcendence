# from django.db import models

# Create your models here.
import random


# if (ball.dx == 0 and ball.dy == 0):
# 	ball_move(ball)

# if (score['left'] == 11 or score['right'] == 11):
# 	reset_ball(ball)
# 	score = {'left': 0, 'right': 0}

def ball_move(ball):
	print("ball_move")
	# ball.dx = random.choice([-1, 1])
	# ball.dy = random.choice([-1, 1])

def init(left_paddle, right_paddle, ball):
	print("init")
	# if (ball.dx == 0 and ball.dy == 0):
	ball_move(ball)