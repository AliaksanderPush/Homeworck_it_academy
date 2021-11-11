"use strict";

    const field = document.querySelector("#canvas");
    const context = field.getContext("2d");
    const btn = document.querySelector(".btn");
    
    const fieldW = 1000; //ширина поля
    const fieldH = 600; //высота поля
    const ballRadius = 25; //радиус мяча
    const racketWidth = 20; //ширина ракеток
    const racketfieldH = 150; //высота ракеток
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
        ballX:  field.getBoundingClientRect().width/2 - ballRadius ,
        ballY:  field.getBoundingClientRect().fieldH/2 - ballRadius,
       
    };

    let leftRacketProp = {
        leftRacketX: 0, 
        leftracketY: 50
       
    };

    let rightRacketProp = {
        rightRacketX: field.getBoundingClientRect().width - racketWidth,
        rightRacketY: 150
       
    };

    

   function prevLoad() {
    // создаем мяч
    context.beginPath();
    context.fillStyle = "red";
    context.arc(ballProp.ballX, ballProp.ballY, ballRadius, 0, Math.PI*2, false);
    context.fill(); 
    //создаем левую ракетку
    context.beginPath();
    context.fillStyle = "rgb(59, 236, 43)";
    context.fillRect(leftRacketProp.leftRacketX, leftRacketProp.leftracketY, racketWidth, racketfieldH);
    //создаем правую ракетку
    context.beginPath();
    context.fillStyle = "rgb(126, 126, 247)";
    context.fillRect(rightRacketProp.rightRacketX, rightRacketProp.rightRacketY, racketWidth, racketfieldH);

    btn.addEventListener("click", startGame);
    document.addEventListener("keydown", startRun);
    document.addEventListener("keyup", stopRun);

   }


    function startGame() {
        console.log(setting)
        ballProp.ballX = field.getBoundingClientRect().width/2;
        ballProp.ballY = field.getBoundingClientRect().height/2 - 15; 
        setting.right = field.getBoundingClientRect().top;
        setting.left = field.getBoundingClientRect().top;
        setting.btn = true;
        
        console.log(setting.ballSX)
        requestAnimationFrame(playGame);
    }

    function drawField() {
        const fieldX = 0,
              fieldY = 0
        
        context.strokeStyle = "black";
        context.fillStyle = "rgb(243, 205, 171)";
        context.fillRect(fieldX, fieldY, fieldW, fieldH);
        context.strokeRect(fieldX, fieldY, fieldW, fieldH);
    }



    function playGame() {
        if(setting.btn){
            drawField();
            prevLoad();
            if (keys.ArrowUp && setting.right > 0) {
               rightRacketProp.rightRacketY -= setting.racketSpeed;
            if (rightRacketProp.rightRacketY <= 0) {
                rightRacketProp.rightRacketY = 0;
            }
            }
            if (keys.ArrowDown && setting.right < (fieldH - racketfieldH)){
                 rightRacketProp.rightRacketY += setting.racketSpeed;
            if (rightRacketProp.rightRacketY + racketfieldH > fieldH) {
                rightRacketProp.rightRacketY = fieldH - racketfieldH;
            }
            }
            if (keys.Shift && setting.left > 0) {
                leftRacketProp.leftracketY -= setting.racketSpeed;
            if (leftRacketProp.leftracketY <= 0) {
                leftRacketProp.leftracketY = 0;
            }
            }
            if (keys.Control && setting.left < (fieldH - racketfieldH)){
               leftRacketProp.leftracketY += setting.racketSpeed;
            if (leftRacketProp.leftracketY + racketfieldH > fieldH) {
                leftRacketProp.leftracketY = fieldH - racketfieldH;
            }
            }
            //rightRacket.style.top = setting.right;
            //leftRacket.style.top = setting.left;

            ballProp.ballX += setting.ballSX;
			
        //когда гол справа
            if (ballProp.ballX + ballRadius >= fieldW){
                ballProp.ballX = fieldW -  ballProp.width;
                setting.btn = false;
                document.querySelector(".right_player").innerHTML = ++scoreRight;
                    
           
            }
        //касается ПРАВОЙ ракетки
          
            if (ballProp.ballX + ballRadius >= fieldW - racketWidth && 
                ballProp.ballY  >= rightRacketProp.rightRacketY &&
                ballProp.ballY  <= rightRacketProp.rightRacketY + racketfieldH) {
                setting.ballSX = -setting.ballSX;
            }
                 
                
            
        //когда гол слева
            if (ballProp.ballX - ballRadius < 0){
                ballProp.ballX = 0;
                setting.btn = false;
                document.querySelector(".left_player").innerHTML = ++scoreLeft;
            
            }
        //касается ЛЕВОЙ ракетки
            if (ballProp.ballX - ballRadius <= racketWidth && 
                ballProp.ballY + ballRadius >= leftRacketProp.leftracketY && 
                ballProp.ballY + ballRadius<= leftRacketProp.leftracketY + racketfieldH) {
                   setting.ballSX = -setting.ballSX;
                
            }
        //верхняя и нижняя границы поля
            ballProp.ballY += setting.ballSY;
			
            if (ballProp.ballY + ballRadius > fieldH) {
                setting.ballSY =- setting.ballSY;
             
            }
            if (ballProp.ballY - ballRadius< 0) {
                setting.ballSY =- setting.ballSY;
               
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
    drawField() 
    
   
