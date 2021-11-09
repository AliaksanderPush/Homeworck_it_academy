"use strict";

    var field = document.querySelector(".field");
    var ball = document.querySelector(".ball");
    var btn = document.querySelector(".btn");
    var rightRacket = document.querySelector(".right_racket");
    var leftRacket = document.querySelector(".left_racket");

    const fieldW = 1000; //ширина игровой арены
    const fieldH = 600; //высота игровой арены
    const ballRadius = 25; //радиус шара
    const racketWidth = 20; //ширина ракеток
    const racketHeight = 150; //высотка ракеток
    const scoreLeft = 0;
    const scoreRight = 0;

    var setting = {
        btn: false,
        ballSX: 2, //скорость мяча по X
        ballSY: 2, //скорость мяча по Y
        racketSpeed: 3 //скорость ракеток
    };

    var keys = {
        ArrowUp: false,
        ArrowDown: false,
        Shift: false,
        Control: false
    };

    

    var ballProp = {
        width: ballRadius * 2,
        height: ballRadius * 2,
        ballX:  null,
        ballY:  null,
       
    };

    var leftRacketProp = {
        leftRacketX: 0, 
        leftRacketY: 20 
       
    };

    var rightRacketProp = {
        rightRacketX: 0,
        rightRacketY: 20
       
    };

    

   function prevLoad() {
      field.style.width = fieldW + "px";
      field.style.height = fieldH + "px"; 

      ball.style.left = ballProp.ballX + "px";
      ball.style.top = ballProp.ballY +"px";
      ball.style.width =  ballProp.width +"px";
      ball.style.height = ballProp.height + "px";

      rightRacket.style.right = rightRacketProp.rightRacketX + "px";
      rightRacket.style.bottom = rightRacketProp.rightRacketY + "px";
      rightRacket.style.width = racketWidth + "px";
      rightRacket.style.height = racketHeight + "px";
     
      leftRacket.style.left = leftRacketProp.leftRacketX + "px";
      leftRacket.style.bottom = leftRacketProp.leftRacketY + "px";
      leftRacket.style.width = racketWidth + "px";
      leftRacket.style.height = racketHeight + "px";

      btn.addEventListener("click", startGame);
      document.addEventListener("keydown", startRun);
      document.addEventListener("keyup", stopRun);

   }


    function startGame(){
        ballProp.ballX = fieldW / 2 - ballRadius;
        ballProp.ballY =  fieldH / 2 -  ballRadius;
        setting.right = rightRacket.offsetTop;
        setting.left = leftRacket.offsetTop;
        setting.btn = true;
        requestAnimationFrame(playGame);
    }

    function playGame(){
        if(setting.btn){
            prevLoad();
            if(keys.ArrowUp && setting.right > 0) {
                setting.right -= setting.racketSpeed;
            }
            if(keys.ArrowDown && setting.right < (fieldH - rightRacket.offsetHeight)){
                setting.right += setting.racketSpeed;
            }
            if(keys.Shift && setting.left > 0) {
                setting.left -= setting.racketSpeed;
            }
            if(keys.Control && setting.left < (fieldH - leftRacket.offsetHeight)){
                setting.left += setting.racketSpeed;
            }
            rightRacket.style.top = setting.right + "px";
            leftRacket.style.top = setting.left + "px";

            ballProp.ballX += setting.ballSX;
			
        //касания правой стенки
            if(ballProp.ballX + ballProp.width >= fieldW){
                ballProp.ballX = fieldW -  ballProp.width;
                setting.btn = false;
            //  (function(){
                    let scoreRight = document.querySelector(".right_player");
                    scoreRight.innerHTML = ++scoreRight.innerHTML;
            //    }());
            }
        //касается правой ракетки
            if(ballProp.ballX + ballProp.width >= fieldW - racketWidth && ball.offsetTop + ballRadius >= rightRacket.offsetTop && ball.offsetTop + ballRadius <= rightRacket.offsetTop + racketHeight){
                setting.ballSX =-setting.ballSX;
            }
        //касание левой стенки
            if(ballProp.ballX < 0){
                ballProp.ballX = 0;
                setting.btn = false;
                document.querySelector(".left_player").innerHTML = ++scoreLeft.innerHTML;
            
            }
        //касается левой ракетки
            if(ballProp.ballX <= racketWidth && ball.offsetTop + ballRadius >= leftRacket.offsetTop && ball.offsetTop + ballRadius <= leftRacket.offsetTop + racketHeight){
                setting.ballSX =-setting.ballSX;
            }
        //верхняя и нижняя границы поля
            ballProp.ballY += setting.ballSY;
			
            if(ballProp.ballY + ballProp.height > fieldH){
                setting.ballSY =- setting.ballSY;
                ballProp.ballY = fieldH - ballProp.height;
            }
            if(ballProp.ballY < 0){
                setting.ballSY =- setting.ballSY;
                ballProp.ballY = 0;
            }
            requestAnimationFrame(playGame);
        }
    }

    function startRun(EO) {
       EO=EO||window.event;
       EO.preventDefault();
       keys[EO.key] = true;
    }

    function stopRun(EO) {
        EO=EO||window.event;
        EO.preventDefault();
       keys[EO.key] = false;
    }
    prevLoad();
    
   
