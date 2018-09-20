# Game Project: SPACE MINER
### By Bakang Morwaagole

Space Miner is a fun space themed survival game which I made using HTML, CSS, and JavaScript. The aim of the game is fly around space, rushing to the safe zone while collecting as many points as you can. The game can be played 
 <a href ="https://bakangam97.github.io/SpartaGame.BakangAM97.github.io/"> here </a>.  The repositostry can be cloned and worked on by clicking the button
 
 <img src = "images/clone-button.png" style = "height: 30px; margin-left: 10px; margin-right:10px;"> 
 
 on the repository homepage. 

 
## How to Play

When you open the game you'll be presented with this page. Here you will find information on the rules and how to play, as well as buttons to select the gamemode you would like to play.

<img src = "images/intro-page.png">


When you start the game you control the astronaut by using the arrow keys to fly around the screen to collect points and get to the safe zone in time. 

<img src = "images/game-play.png">

## Rules

_Easy Mode_:

In easy mode the aim of the game is to survive by getting to the safe area before it disappears. If you don't make it in time you'll have lose a life and when you run out of lives, you lose the game. 
 

* Getting to the safe zone in time will gain you one point. 

* Collecting coins along the way gains you 2 points

* If you manage to collect obtain 5 lives, money bags will spawn instead, gaining you five points

_Hard Mode_:

In hard mode the aim is the same, however you won't be alble to collect lives. 

## Development Process 

The first challenge in developing my game was to create smooth character movement. To achieve this I created an array that stored the value whether an arrow key was being pressed down or not. I then created a function on an interval that checked whether an arrow key was pressed and moved the player accordingly. 


The second challenge was to find an efficient way to track the collisions of the player. I solved this by creating a function that could take elements on the page as input and return the value of 1 if the player was colliding with it in any way. 
 

## Future Developments

In the future I aim to make my game playable on mobile devices. 
 
