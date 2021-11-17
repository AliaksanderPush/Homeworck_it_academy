'use strict'
window.addEventListener('load', () => {
const container = document.querySelector('#container'),
      wrap = document.querySelector('#wrap'),
      resizers = container.querySelectorAll('.resizer'),
      bottomMidle = document.querySelector(".bottomMidle"),
      rightMidle =  document.querySelector(".rightMidle");

  container.addEventListener('mousedown', mousedown);

 

let isResizing = false;

function mousedown(e) {
  e.preventDefault();
 //if (e.target.id === 'container') {
 
  let prevX = e.clientX - e.target.getBoundingClientRect().left;
  let prevY = e.clientY - e.target.getBoundingClientRect().top;

  window.addEventListener('mousemove', mousemove);
  e.target.addEventListener('mouseup', mouseup);
    

    function mousemove(e) {
      e.preventDefault();
     if (!isResizing) {   
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
  function mouseup() {
    e.preventDefault();
    window.removeEventListener('mousemove', mousemove);
    window.removeEventListener('mouseup', mouseup);
  }
//}
           
 }
   


for (let resizer of resizers) {
  resizer.addEventListener('mousedown', mousedown);

  function mousedown(e) {
    e.preventDefault();
   if (e.which=== 1) {
    isResizing = true;
    const targetDiv = e.target.parentNode;
    let targetDivPos = targetDiv.getBoundingClientRect();
    let wrapPosition = wrap.getBoundingClientRect();

    let startPosX = e.clientX;
    let startPosY = e.clientY;
    
    window.addEventListener('mousemove', mousemove);
    window.addEventListener('mouseup', mouseup);

  function mousemove(e)  {
   
       e.preventDefault();
      
      let currentPosX = e.clientX;
      let currentPosY = e.clientY;
      let resizeValue = 0;
      
      switch (e.target.classList.item(1)) {
        case 'topLeft': {
            resizeValue = checkPosition(startPosX, startPosY, currentPosX, currentPosY);
            
            targetDiv.style.height = targetDivPos.height - resizeValue + 'px';
            targetDiv.style.width = targetDivPos.width - resizeValue + 'px';
            targetDiv.style.bottom = wrapPosition.bottom - targetDivPos.bottom + 'px';   
            targetDiv.style.right = wrapPosition.right - targetDivPos.right + 'px';     
            targetDiv.style.left = '';
            targetDiv.style.top = '';
            break;
        }
        case 'topMidle': { 
            resizeValue = currentPosY - startPosY;
            targetDiv.style.height = targetDivPos.height - resizeValue + 'px';
            targetDiv.style.bottom = wrapPosition.bottom - targetDivPos.bottom + 'px';  
            targetDiv.style.top = '';
            break;
          }
        case 'topRight': {//+
            resizeValue = checkPosition(startPosX, startPosY, currentPosX, currentPosY);
            targetDiv.style.height = targetDivPos.height + resizeValue + 'px';
            targetDiv.style.width = targetDivPos.width + resizeValue + 'px';
            targetDiv.style.bottom = wrapPosition.bottom - targetDivPos.bottom + 'px'; 
            targetDiv.style.left = targetDivPos.left + 'px';
            targetDiv.style.top = '';
            break;  
          }
        case 'bottomLeft': { //+  
            resizeValue = checkPosition(startPosX, startPosY, currentPosX, currentPosY);
        
            targetDiv.style.height = targetDivPos.height - resizeValue + 'px';
            targetDiv.style.width = targetDivPos.width - resizeValue + 'px';
            targetDiv.style.right = wrapPosition.right - targetDivPos.right + 'px';   
            targetDiv.style.left = '';
            targetDiv.style.top = targetDivPos.top + 'px';
            break;
          }
        case 'bottomRight': {  //+
            resizeValue = checkPosition(startPosX, startPosY, currentPosX, currentPosY);
            targetDiv.style.height = targetDivPos.height + resizeValue + 'px';
            targetDiv.style.width = targetDivPos.width + resizeValue + 'px'; 
            targetDiv.style.top = targetDivPos.top + 'px';
            targetDiv.style.left = targetDivPos.left + 'px';
            break;
          }   
        case 'bottomMidle': {  
            resizeValue = currentPosY - startPosY;
            targetDiv.style.height = targetDivPos.height - resizeValue + 'px';
            targetDiv.style.left = targetDivPos.left + 'px';
            targetDiv.style.top = targetDivPos.top + 'px';
            break;
          }
        case 'rightMidle': {  
            resizeValue = currentPosX - startPosX;
            targetDiv.style.width = targetDivPos.width + resizeValue + 'px';
            targetDiv.style.left = targetDivPos.left +'px';
            targetDiv.style.top = targetDivPos.top + 'px';
            break;
        }  
        case 'leftMidle': { //+
            resizeValue = currentPosX - startPosX;
            targetDiv.style.width = targetDivPos.width - resizeValue + 'px';
            targetDiv.style.left = '';
            targetDiv.style.right = wrapPosition.right - targetDivPos.right + 'px'; 
            break;
          }
        case "topMidle": {  
            resizeValue = currentPosY - startPosY;
            targetDiv.style.height = targetDivPos.height + resizeValue + "px";
            targetDiv.style.left = targetDivPos.left + "px";
            targetDiv.style.top = targetDivPos.top + "px";
          break;  
              
      }
    }
    // bottomMidle.style.top = 100 - 100 *(bottomMidle.offsetHeight / targetDiv.offsetHeight) + "%";
    // rightMidle.style.left =   100 - 100 * (rightMidle.offsetWidth / targetDiv.offsetWidth) + "%";
  } 
}
function mouseup(e) {
      e.preventDefault();
      document.removeEventListener('mousemove', mousedown);
      document.removeEventListener('mouseup', mouseup);
  }

}



const checkPosition =  (startPosX, startPosY, currentPosX, currentPosY) => {
   if (Math.abs(startPosX + currentPosX) > Math.abs(startPosY - currentPosY)) {
          return  currentPosX - startPosX;
      } else {
          return  currentPosY - startPosY;
      }     
      
}
}
});





  