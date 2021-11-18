"use strict";

window.addEventListener("load", preload);

  function preload() {
   const container = document.getElementById("container"),
         resizes = container.querySelectorAll(".resize"),
         topLeft = document.getElementById("topLeft"),
         topMidle =  document.getElementById("topMidle"),
         topRight = document.getElementById("topRight"),
         bottomLeft = document.getElementById("bottomLeft"),
         bottomMidle = document.getElementById("bottomMidle"),
         bottomRight = document.getElementById("bottomRight"),
         rightMidle = document.getElementById("rightMidle"),
         leftMidle = document.getElementById("leftMidle");
    
    
    
    container.style.position = "absolute";
    container.style.left = "0%";
    container.style.top = "0%";

    topLeft.style.top = "-1px";
    topLeft.style.left = "-1px";

    topMidle.style.top = "-1px";
    topMidle.style.left = "50%";
    
    topRight.style.top = "-1px";
    topRight.style.right = "-1px";

    bottomLeft.style.bottom = "-1px";
    bottomLeft.style.left = "-1px";
    
    bottomRight.style.bottom = "-1px";
    bottomRight.style.right = "-1px";
    
    bottomMidle.style.bottom = "-1px";
    bottomMidle.style.left = "50%";

    leftMidle.style.top = "50%";
    leftMidle.style.left = "-1px";
 
    rightMidle.style.top = "50%";
    rightMidle.style.right = "-1px";
 
    resizes.forEach(resize => {
    resize.addEventListener('mousedown',mdResizeFunc);
     });
       container.addEventListener("mousedown", mousedown);
  }

  

function mousedown(e) {
  e.preventDefault();
  if (e.target.id === "container") {
    let prevX = e.clientX - e.target.getBoundingClientRect().left;
    let prevY = e.clientY - e.target.getBoundingClientRect().top;

  window.addEventListener('mousemove', mousemove);
  e.target.addEventListener('mouseup', mouseup);

    function mouseup() {
    e.preventDefault();
    window.removeEventListener('mousemove', mousemove);
    window.removeEventListener('mouseup', mouseup);
  }

    function mousemove(e) {
     
        e.preventDefault();
      let coordX = e.clientX - prevX;
      let coordY = e.clientY - prevY;
        
      let wrapleftX = wrap.getBoundingClientRect().left / 2;
      let wrapRightX = wrap.getBoundingClientRect().right - wrapleftX;

      let wrapTopY = wrap.getBoundingClientRect().top / 2;
      let wrapBottomY = wrap.getBoundingClientRect().bottom - wrapTopY; 
        
      if (
            coordX > wrapleftX &&
            coordX < wrapRightX - e.target.offsetWidth &&
            coordY > wrapTopY &&
            coordY < wrapBottomY - e.target.offsetHeight ) {
              
            e.target.style.left = coordX - e.target.parentNode.getBoundingClientRect().left + 'px';
            e.target.style.top =  coordY - e.target.parentNode.getBoundingClientRect().top + 'px'; 
          }
        }
      } 
    }
  




function mdResizeFunc(e) {
const targetDiv = e.target.parentNode;
var tDright = e.target.parentNode.getBoundingClientRect().right;
var tDbottom = e.target.parentNode.getBoundingClientRect().bottom;
var tDheight = e.target.parentNode.getBoundingClientRect().height;
var tDwidth = e.target.parentNode.getBoundingClientRect().width;
var tDleft = e.target.parentNode.getBoundingClientRect().left;
var tDtop = e.target.parentNode.getBoundingClientRect().top;
var targetObj = e.target;

let startPosX = e.clientX;
let startPosY = e.clientY;
    
    window.addEventListener('mousemove', mousemove);
    window.addEventListener('mouseup', mouseup);

  function mouseup(e) {
    e.preventDefault();
    document.removeEventListener("mousemove", mousemove);
    document.removeEventListener("mouseup", mouseup);
  }

  function mousemove(e) {
    if (e.which === 1) {
       e.preventDefault();
       let currentPosX = e.clientX;
       let currentPosY = e.clientY;
	     
      switch (targetObj.id) {
        //изменение размеров по ширине и высоте отдельно
        case "topMidle": { 
          console.log('1')
          var resizeValue = currentPosY - startPosY;
          targetDiv.style.height = tDheight - resizeValue + "px";
          targetDiv.style.bottom = document.getElementById("wrap").getBoundingClientRect().bottom - tDbottom + "px";  //фиксация грани на противоположной действию стороне
          targetDiv.style.top = "";
          break;
        }
        case "leftMidle": {
          console.log('leftMidle')
          var resizeValue = currentPosX - startPosX;
          targetDiv.style.width = tDwidth - resizeValue + "px";
          targetDiv.style.left = "";
          targetDiv.style.right = document.getElementById("wrap").getBoundingClientRect().right - tDright + "px"; //фиксация грани на противоположной действию стороне
          break;
        }
        case "bottomMidle": {  
          console.log('3')
          var resizeValue = currentPosY - startPosY;
          targetDiv.style.height = tDheight + resizeValue + "px";
          targetDiv.style.left = tDleft + "px";
          targetDiv.style.top = tDtop + "px";
          break;
        }
        case "rightMidle": {  
          console.log('rightMidle')
          var resizeValue = currentPosX - startPosX;
          targetDiv.style.width = tDwidth + resizeValue + "px";
          targetDiv.style.left = tDleft + "px";
          targetDiv.style.top = tDtop + "px";
          break;
        }
        //изменение размеров при помощи угловых элем. управления
        case "topLeft": {  
         
          if (
            Math.abs(startPosX + currentPosX) >
            Math.abs(startPosY - currentPosY)
          )
            var resizeValue = currentPosX - startPosX;
          else resizeValue = currentPosY - startPosY;
		  
          targetDiv.style.height = tDheight - resizeValue + "px";
          targetDiv.style.width = tDwidth - resizeValue + "px";
          targetDiv.style.bottom = document.getElementById("wrap").getBoundingClientRect().bottom - tDbottom + "px";   //фиксация точки на противоположном действию углу
          targetDiv.style.right = document.getElementById("wrap").getBoundingClientRect().right - tDright + "px";     //фиксация точки на противоположном действию углу
          targetDiv.style.left = "";
          targetDiv.style.top = "";
          break;
        }
        case "bottomLeft": {   
          console.log('6')
          if (
            Math.abs(startPosX + currentPosX) >
            Math.abs(startPosY - currentPosY)
          )
            var resizeValue = currentPosX - startPosX;
          else resizeValue = currentPosY - startPosY;
          targetDiv.style.height = tDheight - resizeValue + "px";
          targetDiv.style.width = tDwidth - resizeValue + "px";
          targetDiv.style.right = document.getElementById("wrap").getBoundingClientRect().right - tDright + "px";   //фиксация точки на противоположном действию углу, top остаётся
          targetDiv.style.left = "";
          targetDiv.style.top = tDtop + "px";
          break;
        }
        case "bottomRight": {  
          console.log('7')
          if (
            Math.abs(startPosX + currentPosX) >
            Math.abs(startPosY - currentPosY)
          )
            var resizeValue = currentPosX - startPosX;
          else resizeValue = currentPosY - startPosY;
          targetDiv.style.height = tDheight + resizeValue + "px";
          targetDiv.style.width = tDwidth + resizeValue + "px"; 
          targetDiv.style.top = tDtop + "px";
          targetDiv.style.left = tDleft + "px";
          break;
        }
        case "topRight": {  
          console.log('8')
          if (
            Math.abs(startPosX + currentPosX) >
            Math.abs(startPosY - currentPosY)
          )
            var resizeValue = currentPosX - startPosX;
          else resizeValue = currentPosY - startPosY;
          targetDiv.style.height = tDheight + resizeValue + "px";
          targetDiv.style.width = tDwidth + resizeValue + "px";
          targetDiv.style.bottom = document.getElementById("wrap").getBoundingClientRect().bottom - tDbottom + "px"; //фиксация точки на противоположном действию углу, left остаётся
          targetDiv.style.left = tDleft + "px";
          targetDiv.style.top = "";
          break;
        }
      }
    } else return false;
    /*
    document.getElementById("3").style.top =
      100 -
      100 *
        (document.getElementById("3").offsetHeight / targetDiv.offsetHeight) +
      "%";
    document.getElementById("4").style.left =
      100 -
      100 * (document.getElementById("4").offsetWidth / targetDiv.offsetWidth) +
      "%";
      */
  }
}
