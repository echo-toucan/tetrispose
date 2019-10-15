# Welcome to Tetris Pose

[![Build Status](https://travis-ci.org/echo-toucan/tetrispose.svg?branch=master)](https://travis-ci.org/echo-toucan/tetrispose)

## https://www.tetrispose.com/

## https://tetris-pose.herokuapp.com/

## Game Overview

> Tetris Pose is a new twist on the classic game. Powered by React, Redux and Google’s TensorFlow PoseNet technology. Tetris pose lets you use body movements to control the tetris game!

## Team Members

[Amneet Sandhu](https://github.com/amneet954)
| [Hari Doshi](https://github.com/hdoshi2)
| [Chang 'Sunny' Mei](https://github.com/SunnyChangMei)
| [Terence Helsel](https://github.com/tjhelsel)

## Development background

In developing Tetris Pose, we wanted to create an app that encouraged physical activity through real-time interactive feedback. We decided to build a new version of the classic block-stacking game where your body is the controller.

## Tech Stack

* Tensorflow.js - PoseNet
  <img src="public/assets/tf_logo_social.png" alt="TensorFlow" width="100" />

  PoseNet is machine-trained for human pose estimation, built on top of TensorFlow. It assigns 17 unique nodes (known as "keypoints") on the human body, and outputs the x-y coordinates of these nodes with respect to the camera capture screen, and updates them in real time.

  For Tetris Pose, PoseNet is used for three functions:

  * Shape creation: The camera checks the user's wrist, elbow, shoulder, and hip positions against predefined shape patterns.

  * Shape movement: The camera checks the user's nose position to determine which column a falling shape will move to.

  * Shape rotation: The camera checks the user's wrist positions against established hitbox coordinates at the top of the camera capture screen, and rotates the falling shape when a hitbox is activated.

* React and Redux
  <img src="public/assets/react-redux.png" alt="React Redux" width="100" />

  All components are dynamically rendered as part of a single-page app using React.js. As the game begins and progresses, several pieces of data (e.g. upcoming shapes, game board state, user score, etc.) are continuously generated and updated. The state of the app is held in a centralized store using Redux.

* React Semantic UI
  <img src="public/assets/semantic.png" alt="React Redux" width="50" />

  Our front-end layout and styling were done primarily with Semantic UI, and complemented with CSS.

#### Gameplay

##Setup

After the game page loads, you will see a camera capture screen at the top left of the window. You should angle the camera and stand far enough away so that your hips and your hands (when extended upward) fit inside the frame. Also, make sure the floor is clear so you can move left and right freely inside the frame.

## Game sequence

Tetris Pose takes place over two phases, which alternate throughout the game.

In the first phase, you will see a shape along with a model of what pose corresponds to the shape. You have five seconds to create the shape by making the correct pose.

Regardless of whether you achieved the correct pose, the shape will appear at the top of the game board after 5 seconds, and the second phase will start.

During the second phase, you can manipulate the shape as it falls in two ways:

* Left/Right Movement: The shape left or right on the grid by stepping (or leaning) left or right

* Rotation: The possible rotations of the current shape will appear at the top of the camera capture screen. Lift your hand until it overlaps the image of the desired rotation, and the shape will rotate.

## Goal and scoring

Your goal is to gain as many points as possible by correctly matching your pose to the target shape during the Create Shape phase, and by filling complete rows in the game board with blocks.

-You _gain 10 points_ if your pose matches the target shape during the Create Shape phase.

-You _lose 5 points_ if you fail to match the pose of the target shape during the Create Shape phase.

-You _gain 100 points_ for each row you complete. (The row will also disappear on completion.)

## Game end

The game ends when there is no space available at the top of the grid for the shape to spawn. At this point, you can click "New Game" to start again!
