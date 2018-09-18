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
var speed = 2.5;

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

// gameHard();
Game();

function Game() {
  movePlayer();
  checkSafe();
  addDiv();
  addPoints();
  addLives();

  divRepeat  = setInterval(addDiv,3000);
  checkRepeat = setInterval(checkSafe,10);
  heartrepeat = setInterval(addLives,7300);
  moveRepeat = setInterval(movePlayer, 10);
  pointsRepeat = setInterval(addPoints,3000);
  }

function gameHard(){
    movePlayer();
    checkSafe();
    addDiv();
    speed = 1.8;
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

  var remove = setTimeout(function(){
    $(".newdiv").remove();
  },2990);

}

function checkSafe() {
  //Find left and top edge of the player
  var playerLeft = player.offset().left;
  var playerTop = player.offset().top;

  //find right and bottom edge of player
  var playerRight = playerLeft + player.width();
  var playerBottom = playerTop + player.height();

  checkDiv();
  checkAlive();
  checkLive();
  checkPoints();
}

function checkAlive(){
  if (lives<0) {
    clearInterval(moveRepeat);
    clearInterval(checkRepeat);
    clearInterval(divRepeat);
    clearInterval(heartRepeat);
    clearInterval(pointsRepeat);
    // alert("Game Over");
  }
}

function reset(){
  lives = 3;
  points = 0;
  $("#lives").html(lives);
  $("#points").html(points);
  clearInterval(heartrepeat);
  clearInterval(moveRepeat);
  clearInterval(checkRepeat);
  clearInterval(divRepeat);
  clearInterval(pointsRepeat);
  Game();
}

function addLives() {
  var x = Math.floor(Math.random()*(board.width() -30));
  var y = Math.floor(Math.random()*(board.height() -30));

  $(".container").append('<img src="images/heart.png" width="30px" class= "heart" alt=""> ');
  $(".heart").css({
    "top": y + "px",
    "left": x + "px"
  })

  var remove = setTimeout(function(){
    $(".heart").remove();
  },2000);
}

function checkLive() {
  if ($(".heart").length != 0 ) {
    //Find left and top edge of the player
    var playerLeft = player.offset().left;
    var playerTop = player.offset().top;

    //find right and bottom edge of player
    var playerRight = playerLeft + player.width();
    var playerBottom = playerTop + player.height();


    //find left and top edge of random div
    var heartLeft = $(".heart").offset().left;
    var heartTop = $(".heart").offset().top;

    //find bottom and right edge of random heart
    var heartRight = heartLeft + $(".heart").width();
    var heartBottom = heartTop + $(".heart").height();

    if ((heartTop<=playerTop && playerTop<=heartBottom) ) {

      //finds if the left or the left or right edge of the heart are in the zone.

      if (heartLeft<=playerRight && playerRight<=heartRight) {

        lives+=1;
        $("#lives").html(lives);
        $(".heart").remove();

      }else if (heartLeft<=playerLeft && playerLeft<=heartRight) {

        lives+=1;
        $("#lives").html(lives);
        $(".heart").remove();
      }

    // finds if you've entered random heart from the top up
    }else if ((heartTop<=playerBottom && playerBottom<=heartBottom) ) {

        //finds if the left or the left or right edge of the heart are in the zone.
        if (heartLeft<=playerRight && playerRight<=heartRight) {

          lives+=1;
          $("#lives").html(lives);
          $(".heart").remove();

        }else if (heartLeft<=playerLeft && playerLeft<=heartRight) {

          lives+=1;
          $("#lives").html(lives);
          $(".heart").remove();
      }
    }
  }
}

function checkDiv() {
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
        var score = Math.floor($(".newdiv").width());
        points+=score;
        $("#points").html(points);
        $(".newdiv").remove();

      }else if (divLeft<=playerLeft && playerLeft<=divRight) {
        var score = Math.floor($(".newdiv").width());
        points+=score;
        // points+=1;
        $("#points").html(points);
        $(".newdiv").remove();
      }

    // finds if you've entered random div from the top up
    }else if ((divTop<=playerBottom && playerBottom<=divBottom) ) {

      //finds if the left or the left or right edge of the div are in the zone.
      if (divLeft<=playerRight && playerRight<=divRight) {
        var score = Math.floor($(".newdiv").width());
        points+=score;
        // points+=1;
        $("#points").html(points);
        $(".newdiv").remove();

      }else if (divLeft<=playerLeft && playerLeft<=divRight) {
        var score = Math.floor($(".newdiv").width());
        points+=score;
        // points+=1;
        $("#points").html(points);
        $(".newdiv").remove();
    }
  //If the div gets too small it is removed and you lose a life.
  } else if(divTop>=playerTop && divBottom<=playerBottom && divLeft>=playerLeft && divRight<=playerRight) {
    var score = Math.floor($(".newdiv").width());
    points+=score;
    // points+=1;
    $("#points").html(points);
    $(".newdiv").remove();
  }

  }else if ($(".newdiv").width() < 5 ) {
    lives-=1;
    $("#lives").html(lives);
    $(".newdiv").remove();
  }
}

function addPoints(){
    var x = Math.floor(Math.random()*(board.width() -30));
    var y = Math.floor(Math.random()*(board.height() -30));

    $(".container").append('<img src="images/arrow.png" width="20px" class= "points" alt=""> ');
    $(".points").css({
      "top": y + "px",
      "left": x + "px"
    })

    var remove = setTimeout(function(){
      $(".points").remove();
    },2000);
  }

function checkPoints(){
  if ($(".points").length != 0 ) {
    //Find left and top edge of the player
    var playerLeft = player.offset().left;
    var playerTop = player.offset().top;

    //find right and bottom edge of player
    var playerRight = playerLeft + player.width();
    var playerBottom = playerTop + player.height();


    //find left and top edge of random div
    var pointsLeft = $(".points").offset().left;
    var pointsTop = $(".points").offset().top;

    //find bottom and right edge of random points
    var pointsRight = pointsLeft + $(".points").width();
    var pointsBottom = pointsTop + $(".points").height();

    if ((pointsTop<=playerTop && playerTop<=pointsBottom) ) {

      //finds if the left or the left or right edge of the points are in the zone.

      if (pointsLeft<=playerRight && playerRight<=pointsRight) {

        points+=1;
        $("#points").html(points);
        $(".points").remove();

      }else if (pointsLeft<=playerLeft && playerLeft<=pointsRight) {

        points+=1;
        $("#points").html(points);
        $(".points").remove();
      }

    // finds if you've entered random points from the top up
  }else if ((pointsTop<=playerBottom && playerBottom<=pointsBottom) ) {

        //finds if the left or the left or right edge of the points are in the zone.
        if (pointsLeft<=playerRight && playerRight<=pointsRight) {

          points+=1;
          $("#points").html(points);
          $(".points").remove();

        }else if (pointsLeft<=playerLeft && playerLeft<=pointsRight) {

          points+=1;
          $("#points").html(points);
          $(".points").remove();
      }
    }
  }
}

});
