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

## Tech Stack

* Tensorflow.js - PoseNet
  <img src="public/assets/tf_logo_social.png" alt="TensorFlow" width="100" />

* React and Redux
  <img src="public/assets/react-redux.png" alt="React Redux" width="100" />

* React Semantic UI
  <img src="public/assets/semantic.png" alt="React Redux" width="50" />

#### Game Rules

1.  The user will be shown a current shape in the Current Shape box.

* This shape will be the first element from the Preview Shape box.
* Preview Shape contains a randomly selected shape. When shape is passed to the current shape box, it will be removed and a new random shape will appear.

2.  The user matches the current shape by making the appropriate pose with body gestures.

3.  After three seconds, the game will check if the shape has been matched.

* If successfully matched, the shape will spawn at the top of the game board
* If not, a penalty will be issued.

• As the created shape populates, the user will be able to manipulate the shape's position (rotation and left-right movement) as it falls.

• When the shape lands on another shape or at the bottom of the board, it will freeze in place and can no longer be manipulated.

• If a row is completed from left to right, the row will disappear and all blocks above that row will fall one level.

• The game ends when the new shape cannot populate on the grid.
