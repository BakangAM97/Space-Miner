$(document).ready(function(){

var player = $(".player")
var board = $(".container")
var lives = 3;
var playerXpos = 400;
var playerYpos = 250;
var keyPress=[]
var speed = 3;
console.log();

//Find left and top edge of the board
var boardLeft = board.offset().left;
var boardTop = board.offset().top;

//find right and bottom edge of board
var boardRight = boardLeft + board.width();
var boardBottom = boardTop + board.height();

$(document).keydown(function(event){
  keyPress[event.which] = true;
})
$(document).keyup(function(event){
  keyPress[event.which] = false;
})

movePlayer();
addDiv();
// checkSafe();



function movePlayer() {



  //Find left and top edge of the player
  var playerLeft = player.offset().left;
  var playerTop = player.offset().top;

  //find right and bottom edge of player
  var playerRight = playerLeft + player.width();
  var playerBottom = playerTop + player.height();


    //horizontal collisions

  if (playerRight<= boardRight) {
    if (keyPress[39]) {
      playerXpos+=speed;
    }
  }
  if (playerLeft>= boardLeft) {
    if (keyPress[37]) {
      playerXpos-=speed;
    }
  }
  //vertical collisions
  if (playerTop>=boardTop) {
    if (keyPress[38]) {
      playerYpos-=speed;
    }
  }
  if (playerBottom<=boardBottom) {
    if (keyPress[40]) {
      playerYpos+=speed;
    }
  }

  // }
  player.css({
    "top": playerYpos + "px",
    "left": playerXpos + "px"
  })



  setTimeout(movePlayer, 10);
}


function addDiv() {
  var x = Math.floor(Math.random()*(board.width() -30));
  var y = Math.floor(Math.random()*(board.height() -30));
  console.log(x);
  console.log(y);
  $(".container").append("<div class = 'newdiv'></div>")
  $(".newdiv").css({
    "top": y + "px",
    "left": x + "px"
  })
  $(".newdiv").addClass("add-animation");

  var repeat  = setTimeout(addDiv,3300);
  var remove = setTimeout(function(){
    $(".newdiv").remove();
  },2000);

}

// function checkSafe() {
//   if ($(".newdiv").width() <=0) {
//
//   }
//
//   }

});
