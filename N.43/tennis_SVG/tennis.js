   "use strict";
   
   const wrap = document.querySelector(".wrap"),
         btn = document.querySelector(".btn"),
         svg = document.querySelector('svg'), 
         field = document.createElementNS("http://www.w3.org/2000/svg","rect"),
         leftRacket = document.createElementNS("http://www.w3.org/2000/svg","rect"),
         rightRacket = document.createElementNS("http://www.w3.org/2000/svg","rect"),
         ball = document.createElementNS("http://www.w3.org/2000/svg",'ellipse');

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
      ballX:  fieldW / 2 - ballRadius,
      ballY:  fieldH / 2 - ballRadius
   };

   let leftRacketProp = {
      leftRacketX: 0.2, 
      leftRacketY: 200
   };

   let rightRacketProp = {
      rightRacketX: 980,
      rightRacketY: 200
   };
     
   function prevLoad() {
      field.setAttribute("x", "0");
      field.setAttribute("y", "0");
      field.setAttribute("width",fieldW);
      field.setAttribute("height",fieldH);
      field.setAttribute("fill", "rgb(243, 205, 171)");
      svg.append(field);
          
      leftRacket.setAttribute("x", leftRacketProp.leftRacketX);
      leftRacket.setAttribute("y", leftRacketProp.leftRacketY);
      leftRacket.setAttribute("width", racketWidth);
      leftRacket.setAttribute("height",racketHeight);
      leftRacket.setAttribute("fill", "green");
      svg.append(leftRacket);
      
      rightRacket.setAttribute("x", rightRacketProp.rightRacketX);
      rightRacket.setAttribute("y", rightRacketProp.rightRacketY);
      rightRacket.setAttribute("width", racketWidth);
      rightRacket.setAttribute("height",racketHeight);
      rightRacket.setAttribute("fill", "blue");
      svg.append(rightRacket);
      
      ball.setAttribute("fill","red");
      ball.setAttribute("rx",ballRadius);
      ball.setAttribute("ry",ballRadius);
      ball.setAttribute("cx",ballProp.ballX);
      ball.setAttribute("cy",ballProp.ballY);
      svg.append(ball);
     
      btn.addEventListener("click", startGame);
      document.addEventListener("keydown", startRun);
      document.addEventListener("keyup", stopRun);

      }
     
   function startGame(){
      ballProp.ballX = fieldW / 2 - ballRadius;
      ballProp.ballY =  fieldH / 2 -  ballRadius;
      setting.right = rightRacket.attributes.y.value;
      setting.left = leftRacket.attributes.y.value;
      setting.btn = true;
      requestAnimationFrame(playGame);
   }

   function playGame(){
      if(setting.btn){
         prevLoad();
         if (keys.ArrowUp && setting.right > 0) {
         rightRacketProp.rightRacketY -= setting.racketSpeed;
            if (rightRacketProp.rightRacketY <= 0) {
                  rightRacketProp.rightRacketY = 0;
            }
         }
         if (keys.ArrowDown && setting.right < (fieldH - racketHeight)){
               rightRacketProp.rightRacketY += setting.racketSpeed;
            if (rightRacketProp.rightRacketY + racketHeight > fieldH) {
                  rightRacketProp.rightRacketY = fieldH - racketHeight;
            }
         }
         if (keys.Shift && setting.left > 0) {
               leftRacketProp.leftRacketY -= setting.racketSpeed;
            if (leftRacketProp.leftRacketY <= 0) {
                  leftRacketProp.leftRacketY = 0;
            }
         }
         if (keys.Control && setting.left < (fieldH - racketHeight)){
            leftRacketProp.leftRacketY += setting.racketSpeed;
               if (leftRacketProp.leftRacketY + racketHeight > fieldH) {
                   leftRacketProp.leftRacketY = fieldH - racketHeight;
         }
         
         }
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
            ballProp.ballY  <= rightRacketProp.rightRacketY + racketHeight) {
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
            ballProp.ballY + ballRadius >= leftRacketProp.leftRacketY && 
            ballProp.ballY + ballRadius<= leftRacketProp.leftRacketY + racketHeight) {
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