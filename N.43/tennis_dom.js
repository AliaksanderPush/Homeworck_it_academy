'use strict'
let game = {
   
   btn: document.querySelector('.btn'),
   field: document.querySelector('.field'),
   leftRacket: document.querySelector('.left_racket'),
   rightRacket: document.querySelector('.right_racket'),
   ball: document.querySelector('.ball'),
   leftPlayer: document.querySelector('.left_player'),
   rightPlayer: document.querySelector('.right_player'),
     
   fieldWidth: 800,
   fieldHeight: 600,
   ballRadius: 25,
   racketWidth: 20,
   racketHeiight: 150,
   scoreRight: 0,
   scoreLeft:0,
   
   parametrs : {
      btn: false,
      ballspeedX: 2,
      ballspeedY: 2,
      racketSpeed:3
   },
   keys: {
        ArrowUp: false,
        ArrowDown: false,
        Shift: false,
        Control: false
   },
   ballProp: {
     width: null,
     height:null,
     ballX:null,
     ballY:null
   },
       
   leftRacketProp: {
      width: 20,
      height: 150,
      leftRacketX: 0,
      leftRacketY:100
   },

   rightRacketProp: {
      width: 20,
      height: 150,
      rightRacketX: 0,
      rightRacketY: 50
   },
    funk() {
     console.log(this.parametrs); 
     
   },
   funcBallParam() {
    const width = this.ballRadius*2;
    const height = this.ballRadius*2;
    const bX = this.fieldWidth/2 - this.ballRadius;
    const bY = this.fieldHeight/2 - this.ballRadius;
    
    this.ballProp.width = width;
    this.ballProp.height = height;
    this.ballProp.ballX = bX;
    this.ballProp.ballY = bY;
   },

 
   preStart() {
      console.log('preStart');
      this.funcBallParam();
      this.field.style.width = this.fieldWidth + 'px';
      this.field.style.height = this.fieldHeight + 'px';
      
      this.ball.style.left = this.ballProp.ballX + 'px';
      this.ball.style.top = this.ballProp.ballY + 'px';
      this.ball.style.width = this.ballProp.width + 'px';
      this.ball.style.height = this.ballProp.height + 'px';
      console.log(this.ballProp)
      this.leftRacket.style.left = this.leftRacketProp.leftRacketX + 'px';
      this.leftRacket.style.bottom = this.leftRacketProp.leftRacketY + 'px';
      this.leftRacket.style.width = this.leftRacketProp.width + 'px';
      this.leftRacket.style.height = this.leftRacketProp.height + 'px';
      
      this.rightRacket.style.right = this.rightRacketProp.rightRacketX + 'px';
      this.rightRacket.style.bottom = this.rightRacketProp.rightRacketY + 'px';
      this.rightRacket.style.width = this.rightRacketProp.width + 'px';
      this.rightRacket.style.height = this.rightRacketProp.height + 'px';
      
      this.btn.addEventListener('click',() => {
        this.startGame();
      });
      document.addEventListener('keydown',() => {
         this.startRun();
      });
      document.addEventListener('keyup',() => {
         this.stopRun();
      });
    
   },

   startGame() {
      console.log('startGame')
      
     this.ballProp.ballX = this.fieldWidth/2 - this.ballRadius;
     this.ballProp.ballY = this.fieldHeight/2 - this.ballRadius;
     console.log(this.ballProp)
     this.parametrs.left = this.leftRacket.offsetTop;
     this.parametrs.right = this.rightRacket.offsetTop;
     this.parametrs.btn = true;
     requestAnimationFrame(() => {
        this.playGame();
     });
   },
   
   playGame() {
      console.log('this playgame')
      if(this.parametrs.btn) {
         if(this.keys.ArrowUp && this.parametrs.right > 0) {
            this.parametrs.right -=this.parametrs.racketSpeed;
         }
         if(this.keys.ArrowDown && this.parametrs.right < (this.fieldHeight - this.rightRacket.offsetHeight)) {
            this.parametrs.right +=this.parametrs.racketSpeed;
         }
         if(this.keys.Shift && this.parametrs.left > 0) {
            this.parametrs.left -=this.parametrs.racketSpeed;
         }
         if(this.keys.Control && this.parametrs.left < (this.fieldHeight - this.leftRacket.offsetHeight)) {
            this.parametrs.left +=this.parametrs.racketSpeed;
         }
         this.rightRacket.style.top = this.parametrs.right + 'px';
         this.leftRacket.style.top = this.parametrs.left + 'px';

         this.ballProp.ballX += this.parametrs.ballspeedX;
         // когда гол справа
         if (this.ballProp.ballX + this.ballProp.with>= this.fieldWidth) {
            this.ballProp.ballX = fieldWidth - this.ballProp.with;
            this.parametrs.btn = false;
            document.querySelector('.right_player').innerHTML = ++this.scoreRight;
         }
         // когда гол слева
         if (this.ballProp.ballX < 0) {
            this.ballProp.ballX = 0;
            this.parametrs.btn = false;
            document.querySelector('.left_player').innerHTML = ++this.scoreLeft;
         }

         // когда мяч касается правой ракетеи
         if (this.ballProp.ballX + this.ballProp.with >= this.fieldWidth - this.racketWidth &&
             this.ball.offsetTop + this.ballRadius >= this.rightRacket.offsetTop &&
             this.ball.offsetTop + this.ballRadius <= this.rightRacket.offsetTop + this.racketWidth) {
             this.parametrs.ballspeedX =- this.parametrs.ballspeedX;
         }
         // когда мфяч касается левой ракетки
         if (this.ballProp <= this.racketWidth &&
             this.ball.offsetTop + this.ballRadius >= this.leftRacket.offsetTop &&
             this.ball.offsetTop + this.ballRadius <= this.leftRacket.offsetTop + this.racketHeiight) {
             this.ballProp.ballspeedX =- this.parametrs.ballspeedX;
            }
         // когда касается нижней и верхней границ
         this.ballProp.ballY += this.parametrs.ballspeedY;
         if (this.parametrs.ballspeedY + this.ballProp.height > this.fieldHeight) {
            this.parametrs.ballspeedY =- this.parametrs.ballspeedY;
            this.ballProp.ballY = this.fieldHeight - this.ballProp.height;
         }
         if (this.ballProp.ballY < 0) {
            this.parametrs.ballspeedY =- this.parametrs.ballspeedY;
            this.ballProp.ballY = 0;

         }
         requestAnimationFrame( () => {
            this.playGame();
         });
      }
   },
   
   startRun(EO) {
     EO=EO||window.event;
     EO.preventDefault();
     this.keys[EO.key] = true;
   },

   stopRun(EO) {
     EO=EO||window.event;
     EO.preventDefault();
     this.keys[EO.key] = false;
   }

};
game.preStart();
game.funk();