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
    
    
    
    
    container.style.left = "10px";
    container.style.top = "10px";

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

    container.style.position = "absolute";
    
    resizes.forEach(resize => {
    resize.style.position = 'absolute'
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
const targetObj = e.target;
let targetDivPos = getElementPos(e.target.parentNode);
let wrapPos = document.getElementById("wrap").getBoundingClientRect();

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
       let resizeValue = 0;
	     
      switch (targetObj.id) {
      
        case "topMidle": { 
          resizeValue = currentPosY - startPosY;
          targetDiv.style.height = targetDivPos.height - resizeValue + "px";
          targetDiv.style.bottom = wrapPos.bottom - targetDivPos.bottom + "px";  
          targetDiv.style.top = "";
          break;
        }
        case "leftMidle": {
          resizeValue = currentPosX - startPosX;
          targetDiv.style.width = targetDivPos.width - resizeValue + "px";
          targetDiv.style.left = "";
          targetDiv.style.right = wrapPos.right - targetDivPos.right + "px";
          break;
        }
        case "bottomMidle": {  
          resizeValue = currentPosY - startPosY;
          targetDiv.style.height = targetDivPos.height + resizeValue + "px";
          targetDiv.style.left = targetDivPos.left + "px";
          targetDiv.style.top = targetDivPos.top + "px";
          break;
        }
        case "rightMidle": {  
          resizeValue = currentPosX - startPosX;
          targetDiv.style.width = targetDivPos.width + resizeValue + "px";
          targetDiv.style.left = targetDivPos.left + "px";
          targetDiv.style.top = targetDivPos.top + "px";
          break;
        }
      
        case "topLeft": {  
          resizeValue = checkPosition(startPosX, startPosY, currentPosX, currentPosY);
		      targetDiv.style.height = targetDivPos.height - resizeValue + "px";
          targetDiv.style.width = targetDivPos.width - resizeValue + "px";
          targetDiv.style.bottom = wrapPos.bottom - targetDivPos.bottom + "px";   
          targetDiv.style.right = wrapPos.right - targetDivPos.right+ "px";     
          targetDiv.style.left = "";
          targetDiv.style.top = "";
          break;
        }
        case "bottomLeft": {   
          resizeValue = checkPosition(startPosX, startPosY, currentPosX, currentPosY);
          targetDiv.style.height = targetDivPos.height - resizeValue - "px";
          targetDiv.style.width = targetDivPos.width - resizeValue - "px";
          targetDiv.style.right = wrapPos.right + targetDivPos.right + "px";                     
          targetDiv.style.left = "";
          targetDiv.style.top = targetDivPos.top + "px";
         
          break;
        }
        case "bottomRight": {  
          resizeValue = checkPosition(startPosX, startPosY, currentPosX, currentPosY);
          targetDiv.style.height = targetDivPos.height + resizeValue + "px";
          targetDiv.style.width = targetDivPos.width + resizeValue + "px"; 
          targetDiv.style.top = targetDivPos.top + "px";
          targetDiv.style.left = targetDivPos.left + "px";
          break;
        }
        case "topRight": {  
          resizeValue = checkPosition(startPosX, startPosY, currentPosX, currentPosY);
          targetDiv.style.height = targetDivPos.height + resizeValue + "px";
          targetDiv.style.width = targetDivPos.width + resizeValue + "px";
          targetDiv.style.bottom = wrapPos.bottom - targetDivPos.bottom + "px"; 
          targetDiv.style.left = targetDivPos.left + "px";
          targetDiv.style.top = "";
          break;
        }
      }
    } 

  }
}

function getElementPos(elem) {
  const bbox = elem.getBoundingClientRect();
  return {
    left: bbox.left + window.pageXOffset,
    top: bbox.top + window.pageYOffset,
    bottom: bbox.bottom + window.pageYOffset,
    right: bbox.right + window.pageXOffset,
    height: bbox.height,
    width: bbox.width
    

  };
}

const checkPosition =  (startPosX, startPosY, currentPosX, currentPosY) => {
  if (Math.abs(startPosX + currentPosX) > Math.abs(startPosY - currentPosY)) {
          return  currentPosX - startPosX;
      } else {
          return  currentPosY - startPosY;
      }     
      
}
