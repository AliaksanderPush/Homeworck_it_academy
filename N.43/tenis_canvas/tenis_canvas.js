"use strict";

    const field = document.querySelector("#canvas");
    const context = field.getContext("2d");
    const ball = document.querySelector(".ball");
    const btn = document.querySelector(".btn");
    
    const fieldW = 1000; //ширина поля
    const fieldH = 600; //высота поля
    const ballRadius = 25; //радиус мяча
    const racketWidth = 20; //ширина ракеток
    const racketHeight = 150; //высота ракеток
    let scoreLeft = 0;
    let scoreRight = 0;

    let setting = {
        btn: false,
        ballSX: 3, //скорость мяча по X
        ballSY: 3, //скорость мяча по Y
        racketSpeed: 3, //скорость ракеток
        right:null,
        left:null

    };

    let keys = {
        ArrowUp: false,
        ArrowDown: false,
        Shift: false,
        Control: false
    };

    

    let ballProp = {
        width: ballRadius * 2,
        height: ballRadius * 2,
        ballX:  field.getBoundingClientRect().width/2,
        ballY:  field.getBoundingClientRect().height/2 - 15,
       
    };

    let leftRacketProp = {
        leftRacketX: 0.5, 
        leftRacketY: field.getBoundingClientRect().height/2 - 60,
       
    };

    let rightRacketProp = {
        rightRacketX: field.getBoundingClientRect().width - 10,
        rightRacketY: field.getBoundingClientRect().height/2 - 20
       
    };

    

   function prevLoad() {

    context.beginPath();
    context.fillStyle = "#F02137";
    context.arc(ballProp.ballX, ballProp.ballY, ballRadius, 0, Math.PI*2, false);
    context.fill(); 
    
    context.beginPath();
    context.fillStyle = "#09AA57";
    context.fillRect(leftRacketProp.leftRacketX, leftRacketProp.leftRacketY, racketWidth, racketHeight);

    context.beginPath();
    context.fillStyle = "#191497";
    context.fillRect(rightRacketProp.rightRacketX, rightRacketProp.rightRacketY, racketHeight, racketWidth);

    btn.addEventListener("click", startGame);
    document.addEventListener("keydown", startRun);
    document.addEventListener("keyup", stopRun);

   }


    function startGame(){
        ballProp.ballX = field.getBoundingClientRect().width/2,
        ballProp.ballY = field.getBoundingClientRect().height/2 - 15, 
        console.log(rightRacketProp)
       // setting.right = rightRacket.offsetTop;
      //  setting.left = leftRacket.offsetTop;
        setting.btn = true;
        requestAnimationFrame(playGame);
    }

    function drawfield() {
      const width = 700,
            height = 400,
            fieldX = 0.5,
            fieldY = 0.5;
    
        context.strokeStyle = "black";
        context.fillStyle = "#F0EE7E";
        context.fillRect(fieldX, fieldY, width, height);
        context.strokeRect(fieldX, fieldY, width-1, height-1);
    }



    function playGame(){
        if(setting.btn){
            drawfield();
            prevLoad();
            if (keys.ArrowUp && setting.right > 0) {
                setting.right -= setting.racketSpeed;
            }
            if (keys.ArrowDown && setting.right < (fieldH - racketHeight)){
                setting.right += setting.racketSpeed;
            }
            if (keys.Shift && setting.left > 0) {
                setting.left -= setting.racketSpeed;
            }
            if (keys.Control && setting.left < (fieldH - racketHeight)){
                setting.left += setting.racketSpeed;
            }
          //  rightRacket.style.top = setting.right + "px";
          //  leftRacket.style.top = setting.left + "px";

            ballProp.ballX += setting.ballSX;
			
        //когда гол справа
            if (ballProp.ballX + ballProp.width >= fieldW){
                ballProp.ballX = fieldW -  ballProp.width;
                setting.btn = false;
                 document.querySelector(".right_player").innerHTML = ++scoreRight;
                    
           
            }
        //касается правой ракетки
            if (ballProp.ballX + ballProp.width >= fieldW - racketWidth && ball.offsetTop + ballRadius >= rightRacket.offsetTop && ball.offsetTop + ballRadius <= rightRacket.offsetTop + racketHeight){
                setting.ballSX =-setting.ballSX;
            }
        //когда гол слева
            if (ballProp.ballX < 0){
                ballProp.ballX = 0;
                setting.btn = false;
                document.querySelector(".left_player").innerHTML = ++scoreLeft;
            
            }
        //касается левой ракетки
            if (ballProp.ballX <= racketWidth && ball.offsetTop + ballRadius >= leftRacket.offsetTop && ball.offsetTop + ballRadius <= leftRacket.offsetTop + racketHeight){
                setting.ballSX =-setting.ballSX;
            }
        //верхняя и нижняя границы поля
            ballProp.ballY += setting.ballSY;
			
            if (ballProp.ballY + ballProp.height > fieldH){
                setting.ballSY =- setting.ballSY;
                ballProp.ballY = fieldH - ballProp.height;
            }
            if (ballProp.ballY < 0){
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
    drawfield() 
    
   
