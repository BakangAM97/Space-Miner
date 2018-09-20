$(document).ready(function(){

  $("#gameOver").hide();
  $("#replay").hide();
  // $("#info").hide();

  //Setting up variables
  var player = $(".player");
  var board = $(".container");
  var lifeCounter = $("lifeCounter")

  var points = 0;
  var lives = 3;
  var speed = 2.5;

  //Setting Starting Position
  var playerXpos = board.width()/2;
  var playerYpos = board.height()/2;

  var keyPress=[];

  var divRepeat;
  var checkRepeat;
  var heartrepeat;
  var moveRepeat;
  var pointsRepeat;
  var morePointsRepeat;

  var restartHard;
  var restartEasy;
  var modeEasy;
  var modeHard;

  var highscore=[];


  $("#lives").html(lives);
  $("#points").html(points);

  $(document).keydown(function(event){
    keyPress[event.which] = true;
  })
  $(document).keyup(function(event){
    keyPress[event.which] = false;
  })

  //Replay button
  $("#replay").click(function() {

    clicksound.play();

    reset();
    $("#gameOver").hide();
  });

  $("#easy").click(function(){

    clicksound.play();

    $("#info").hide();
    $("#replay").show();
    $("#gameOver").hide();
    $("#easy").hide();
    $("#hard").show();

    clearTimeout(modeHard);
    modeEasy = setTimeout(Game, 2500);

    clearBoard();
    clearIntervals();

  });

  $("#hard").click(function(){

    clicksound.play();

    $("#info").hide();
    $("#replay").show();
    $("#gameOver").hide();
    $("#hard").hide();
    $("#easy").show();

    clearTimeout(modeEasy)
    modeHard = setTimeout(gameHard, 2500);

    clearIntervals();
    clearBoard();


  });

  function Game(){
    $(".player").show();

    speed = 2.5;

    movePlayer();
    checkSafe();
    addDiv();
    addPoints();
    addLives();

    divRepeat  = setInterval(addDiv,3000);
    checkRepeat = setInterval(checkSafe,1);
    heartrepeat = setInterval(addLives,10000);
    moveRepeat = setInterval(movePlayer, 10);
    pointsRepeat = setInterval(addPoints,5000);

    }

  function gameHard(){
    $(".player").show();

    var speed = 1;

    movePlayer();
    checkSafe();
    addDiv();
    addMorePoints();
    addPoints();


    divRepeat  = setInterval(addDiv,3000);
    checkRepeat = setInterval(checkSafe,10);
    moveRepeat = setInterval(movePlayer, 10);
    pointsRepeat = setInterval(addPoints,3000);
    morePointsRepeat = setInterval(addMorePoints,5000)

    }


  function reset(){

    clearTimeout(restartHard);
    clearTimeout(restartEasy);
    clearIntervals();
    clearBoard();

    if ($("#easy").is(":hidden")) {

      restartEasy = setTimeout(Game,2000);

    }else if ($("#hard").is(":hidden")) {

      restartHard = setTimeout(gameHard,2000);

    }

  }

  function clearIntervals() {
    clearInterval(moveRepeat);
    clearInterval(checkRepeat);
    clearInterval(heartrepeat);
    clearInterval(divRepeat);
    clearInterval(pointsRepeat);
    clearInterval(morePointsRepeat);
  }

  function clearBoard() {
    $(".heart").remove();
    $("#points1").remove();
    $("#points2").remove();
    $("#points3").remove();
    $(".newdiv").remove();
    $(".morePoints").remove();

    $(".player").hide();

    playerXpos = board.width()/2;
    playerYpos = board.height()/2;

    player.css({
      "top": playerXpos + "px",
      "left": playerYpos+ "px"
    });

    lives = 3;
    points = 0;

    $("#lives").html(lives);
    $("#points").html(points);

  }

  function movePlayer() {

    //Find left and top edge of the board
    var boardLeft = board.offset().left;
    var boardTop = board.offset().top;

    //find right and bottom edge of board
    var boardRight = boardLeft + board.width();
    var boardBottom = boardTop + board.height();

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
        $(".player").html('<img src="images/astro-right.png" height="60px" alt="animated">');
      }
    }
    if (playerLeft>= boardLeft) {
      if (keyPress[37]) {
        playerXpos-=speed;
        $(".player").html('<img src="images/astro-left.png" height="60px" alt="animated">');
      }
    }
    //vertical movement
    if (playerTop>=boardTop) {
      if (keyPress[38]) {
        playerYpos-=speed;
        // $(".player").html('<img src="images/piskel.gif" height="60px" alt="animated">');
      }
    }
    if (playerBottom<=boardBottom) {
      if (keyPress[40]) {
        playerYpos+=speed;
        // $(".player").html('<img src="images/piskel2.gif" height="60px" alt="animated">');
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
    var x = Math.floor(Math.random()*(board.width() -80));
    var y = Math.floor(Math.random()*(board.height() -80));

    //Generating random div
    $(".container").append("<div class = 'newdiv'></div>");
    $(".newdiv").css({
      "top": y + "px",
      "left": x + "px"
    })
    $(".newdiv").addClass("add-animation");

    var remove = setTimeout(function(){
      $(".newdiv").remove();
    },2500);

  }
  function addLives() {
    if (lives<5) {

      var x = Math.floor(Math.random()*(board.width() -30));
      var y = Math.floor(Math.random()*(board.height() -30));

      $(".container").append('<img src="images/heart.png" width="30px" class= "heart item" alt=""> ');
      $(".heart").css({
        "top": y + "px",
        "left": x + "px"
      })

      var remove = setTimeout(function(){
        $(".heart").remove();
      },2000);
    } else {
      addMorePoints();
    }
  }
  function addPoints(){
    var x = Math.floor(Math.random()*(board.width() -30));
    var x1 = Math.floor(Math.random()*(board.width() -30));
    var x2 = Math.floor(Math.random()*(board.width() -30));
    var y = Math.floor(Math.random()*(board.height() -30));
    var y1 = Math.floor(Math.random()*(board.height() -30));
    var y2 = Math.floor(Math.random()*(board.height() -30));

    $(".container").append('<img src="images/money3.png" width="40px" class= "points item" alt="" id="points1"> ');
    $(".container").append('<img src="images/money3.png" width="40px" class= "points item" alt="" id="points2"> ');
    $(".container").append('<img src="images/money3.png" width="40px" class= "points item" alt="" id="points3"> ');
    $("#points1").css({
      "top": y + "px",
      "left": x + "px"
    })
    $("#points2").css({
      "top": y1 + "px",
      "left": x1 + "px"
    })
    $("#points2").css({
      "top": y2 + "px",
      "left": x2 + "px"
    })

    var remove1 = setTimeout(function(){
      $("#points1").remove();
    },4500);
    var remove2 = setTimeout(function(){
      $("#points2").remove();
    },4500);
    var remove3 = setTimeout(function(){
      $("#points3").remove();
    },4500);
  }
  function addMorePoints() {
    var x = Math.floor(Math.random()*(board.width() -30));
    var y = Math.floor(Math.random()*(board.height() -30));

    $(".container").append('<img src="images/money2.png" width="40px" class= "morePoints item" alt=""> ');
    $(".morePoints").css({
      "top": y + "px",
      "left": x + "px"
    })

    var remove = setTimeout(function(){
      $(".morePoints").remove();
    },2000);
  }

  var popSound = new  Audio("sounds/pop.mp3");
  var heartSound = new Audio("sounds/heartsound.mp3");
  var zoneSound = new Audio("sounds/zonesound.mp3");
  var gameoversound = new Audio("sounds/gameover2.mp3");
  var clicksound = new Audio("sounds/buttonclick.mp3")


  function checkSafe() {
    //Find left and top edge of the player
    var playerLeft = player.offset().left;
    var playerTop = player.offset().top;

    //find right and bottom edge of player
    var playerRight = playerLeft + player.width();
    var playerBottom = playerTop + player.height();

    checkDiv();
    checkAlive();
    checkLives();
    checkPoints();
    checkMorePoints();


    function checkAlive(){
      if (lives<0) {
        gameoversound.play();
        $("#lives").html("YOU LOSE");
        clearIntervals();
        $("#gameOver").toggle();
        $("#finalScore").html("You Scored: " + points);
        highscore.push(points);
        var best = highscore.sort(function(a, b){return b-a})[0];
        $("#highscore").html(best)

        // alert("Game Over");
      }
    }

    function checkLives() {
      if ($(".heart").length != 0 ) {
        var item = $(".heart");
        if ( checkItem(item)== 1) {
          heartSound.play();
          lives+=1;
          $("#lives").html(lives);
          $(".heart").remove();
        }
      }
    }

    function checkDiv() {
      if ($(".newdiv").width() > 5) {
        var item = $(".newdiv");
        if ( checkItem(item)== 1) {
          zoneSound.play();
          points+=1;
          $("#points").html(points);
          $(".newdiv").remove();
        }
      }else if ($(".newdiv").width() < 5 ) {
        lives-=1;
        $("#lives").html(lives);
        $(".newdiv").remove();
      }
    }

    function checkPoints(){
      if ($("#points1").length != 0 ) {
        var item = $("#points1");
        if (checkItem(item) == 1) {
          points+=1;
          popSound.play();
          $("#points").html(points);
          $("#points1").remove();
        }
      }
      if ($("#points2").length != 0 ) {
        var item = $("#points2");
        if (checkItem(item) == 1) {
          points+=1;
          popSound.play();
          $("#points").html(points);
          $("#points2").remove();
        }
      }
      if ($("#points3").length != 0 ) {
        var item = $("#points3");
        if (checkItem(item) == 1) {
          points+=1;
          popSound.play();
          $("#points").html(points);
          $("#points3").remove();
        }
      }
    }

    function checkMorePoints() {
      if ($(".morePoints").length != 0 ) {
        var item = $(".morePoints");
        if (checkItem(item) == 1) {
          popSound.play();
          points+=5;
          $("#points").html(points);
          $(".morePoints").remove();
        }
      }
    }

    function checkItem(item){

      var itemLeft = item.offset().left;
      var itemTop = item.offset().top;

      //find bottom and right edge of random item
      var itemRight = itemLeft + item.width();
      var itemBottom = itemTop + item.height();

      if ((itemTop<=playerTop && playerTop<=itemBottom) ) {

        //finds if the left or the left or right edge of the item are in the zone.

        if (itemLeft<=playerRight && playerRight<=itemRight) {
          return 1;

        }else if (itemLeft<=playerLeft && playerLeft<=itemRight) {
          return 1;
        }

        // finds if you've entered random item from the top up
      }else if ((itemTop<=playerBottom && playerBottom<=itemBottom) ) {

        //finds if the left or the left or right edge of the item are in the zone.
        if (itemLeft<=playerRight && playerRight<=itemRight) {

          return 1;

        }else if (itemLeft<=playerLeft && playerLeft<=itemRight) {

          return 1;
        }
      }else if (itemTop>=playerTop && itemBottom<=playerBottom) {

        if (itemLeft<=playerRight && playerRight<=itemRight) {
          return 1;

        }else if (itemLeft<=playerLeft && playerLeft<=itemRight) {

          return 1;
        }
      }
    }

  }




});
