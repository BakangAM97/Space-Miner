$(document).ready(function(){

//Setting up variables
var player = $(".player");
var board = $(".container");
var lifeCounter = $("lifeCounter")
var points = 0;
var lives = 3;

//Setting Starting Position
var playerXpos = 400;
var playerYpos = 250;

var keyPress=[]
var speed = 3;

$("#lives").html(lives);
$("#points").html(points);

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

//Replay button
$("#replay").click(reset)

Game();

function Game() {
movePlayer();
addDiv();
checkSafe();
}

function movePlayer() {



  //Find left and top edge of the player
  var playerLeft = player.offset().left;
  var playerTop = player.offset().top;

  //find right and bottom edge of player
  var playerRight = playerLeft + player.width();
  var playerBottom = playerTop + player.height();


  //horizontal movement

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
  //vertical movement
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

  //Changing player position
  player.css({
    "top": playerYpos + "px",
    "left": playerXpos + "px"
  })



  moveRepeat = setTimeout(movePlayer, 10);
}

function addDiv() {
  //Generating random x and y positions
  var x = Math.floor(Math.random()*(board.width() -30));
  var y = Math.floor(Math.random()*(board.height() -30));

  //Generating random div
  $(".container").append("<div class = 'newdiv'></div>");
  $(".newdiv").css({
    "top": y + "px",
    "left": x + "px"
  })
  $(".newdiv").addClass("add-animation");

  divRepeat  = setTimeout(addDiv,3000);
  var remove = setTimeout(function(){
    $(".newdiv").remove();
  },2990);

}

function checkSafe() {
  if ($(".newdiv").width() > 5) {

    //Find left and top edge of the player
    var playerLeft = player.offset().left;
    var playerTop = player.offset().top;

    //find right and bottom edge of player
    var playerRight = playerLeft + player.width();
    var playerBottom = playerTop + player.height();

    //find left and top edge of random div
    var divLeft = $(".newdiv").offset().left;
    var divTop = $(".newdiv").offset().top;

    //find bottom and right edge of random div
    var divRight = divLeft + $(".newdiv").width();
    var divBottom = divTop + $(".newdiv").height();

    // finds if you've entered random div from the bottom up
    if ((divTop<=playerTop && playerTop<=divBottom) ) {

      //finds if the left or the left or right edge of the div are in the zone.

      if (divLeft<=playerRight && playerRight<=divRight) {

        points+=1;
        $("#points").html(points);
        $(".newdiv").remove();

      }else if (divLeft<=playerLeft && playerLeft<=divRight) {

        points+=1;
        $("#points").html(points);
        $(".newdiv").remove();
      }

    // finds if you've entered random div from the top up
    }else if ((divTop<=playerBottom && playerBottom<=divBottom) ) {

      //finds if the left or the left or right edge of the div are in the zone.
      if (divLeft<=playerRight && playerRight<=divRight) {

        points+=1;
        $("#points").html(points);
        $(".newdiv").remove();

      }else if (divLeft<=playerLeft && playerLeft<=divRight) {

        points+=1;
        $("#points").html(points);
        $(".newdiv").remove();
    }
  //If the div gets too small it is removed and you lose a life.
  } else if(divTop>=playerTop && divBottom<=playerBottom && divLeft>=playerLeft && divRight<=playerRight) {

    points+=1;
    $("#points").html(points);
    $(".newdiv").remove();
  }

} else if ($(".newdiv").width() < 5 ) {
    lives-=1;
    $("#lives").html(lives);
    $(".newdiv").remove();
  }
  checkAlive();
  aliveRepeat = setTimeout(checkSafe,1);
}

function checkAlive(){
  if (lives<0) {
    clearTimeout(divRepeat);
    clearTimeout(moveRepeat);
    clearTimeout(aliveRepeat);
    // alert("Game Over");
  }
}

function reset(){
  lives = 3;
  points = 0;
  $("#lives").html(lives);
  $("#points").html(points);
  clearTimeout(divRepeat);
  clearTimeout(moveRepeat);
  clearTimeout(aliveRepeat);
  Game();
}


});
