'use strict'
window.addEventListener('load', () => {
const container = document.querySelector('#container'),
      wrap = document.querySelector('#wrap'),
      resizers = container.querySelectorAll('.resizer');
  
container.addEventListener('mousedown', mousedown);
let isResizing = false;

function mousedown(e) {
  e.preventDefault();
  isResizing = false;
  window.addEventListener('mousemove', mousemove);
  window.addEventListener('mouseup', mouseup);
    
  let prevX = e.clientX - e.target.getBoundingClientRect().left;
  let prevY = e.clientY - e.target.getBoundingClientRect().top;

function mousemove(e) {
  e.preventDefault();
  if (!isResizing) {   
    let coordX = e.pageX - prevX;
    let coordY = e.pageY - prevY;
      let minX = wrap.getBoundingClientRect().left / 2;
      let minY = wrap.getBoundingClientRect().top / 2;
      let maxX = wrap.getBoundingClientRect().right - minX;
      let maxY = wrap.getBoundingClientRect().bottom - minY;
      if (
        coordX > minX &&
        coordX < maxX - e.target.offsetWidth &&
        coordY > minY &&
        coordY < maxY - e.target.offsetHeight ) {
          
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
  
}

for (let resizer of resizers) {
  resizer.addEventListener('mousedown', mousedown);
  function mousedown(e) {
    e.preventDefault();
    isResizing = true;
    const targetDiv = e.target.parentNode;
    let targetDivPos = targetDiv.getBoundingClientRect();

    let startPosX = e.clientX;
    let startPosY = e.clientY;
    
    window.addEventListener('mousemove', mousemove);
    window.addEventListener('mouseup', mouseup);

  function mousemove(e)  {
    if (e.which=== 1) {
       e.preventDefault();
      let wrapPosition = wrap.getBoundingClientRect();
      let currentPosX = e.clientX;
      let currentPosY = e.clientY;
      
      switch (e.target.classList.item(1)) {
        case 'topLeft': {
           let resizeValue = checkPosition(startPosX, startPosY, currentPosX, currentPosY);
       
            targetDiv.style.height = targetDivPos.height - resizeValue + 'px';
            targetDiv.style.width = targetDivPos.width - resizeValue + 'px';
            targetDiv.style.bottom = wrapPosition.bottom - targetDivPos.bottom + 'px';   
            targetDiv.style.right = wrapPosition.right - targetDivPos.right + 'px';     
            targetDiv.style.left = '';
            targetDiv.style.top = '';
          break;
        }
        case 'topMidle': { 
            let resizeValue = currentPosY - startPosY;
            targetDiv.style.height = targetDivPos.height - resizeValue + 'px';
            targetDiv.style.bottom = wrapPosition.bottom - targetDivPos.bottom + 'px';  
            targetDiv.style.top = '';
            break;
          }
        case 'topRight': {
            let resizeValue = checkPosition(startPosX, startPosY, currentPosX, currentPosY);
            targetDiv.style.height = targetDivPos.height + resizeValue + 'px';
            targetDiv.style.width = targetDivPos.width + resizeValue + 'px';
            targetDiv.style.bottom = wrapPosition.bottom - targetDivPos.bottom + 'px'; 
            targetDiv.style.left = targetDivPos.left + 'px';
            targetDiv.style.top = '';
            break;  
          }
        case 'bottomLeft': {   
            let resizeValue = checkPosition(startPosX, startPosY, currentPosX, currentPosY);
        
            targetDiv.style.height = targetDivPos.height - resizeValue + 'px';
            targetDiv.style.width = targetDivPos.width - resizeValue + 'px';
            targetDiv.style.right = wrapPosition.right - targetDivPos.right + 'px';   
            targetDiv.style.left = '';
            targetDiv.style.top = targetDivPos.top + 'px';
            break;
          }
        case 'bottomRight': {  
            let resizeValue = checkPosition(startPosX, startPosY, currentPosX, currentPosY);
            targetDiv.style.height = targetDivPos.height + resizeValue + 'px';
            targetDiv.style.width = targetDivPos.width + resizeValue + 'px'; 
            targetDiv.style.top = targetDivPos.top + 'px';
            targetDiv.style.left = targetDivPos.left + 'px';
            break;
          }   
         case 'bottomMidle': {  
            let resizeValue = currentPosY - startPosY;
            targetDiv.style.height = targetDivPos.height + resizeValue + 'px';
            targetDiv.style.left = targetDivPos.left + 'px';
            targetDiv.style.top = targetDivPos.top + 'px';
            break;
          }
        case 'rightMidle': {  
            let resizeValue = currentPosX - startPosX;
            targetDiv.style.width = targetDivPos.height + resizeValue + 'px';
            targetDiv.style.left = targetDivPos.left + 'px';
            targetDiv.style.top = targetDivPos.top + 'px';
            break;
        }  
        case 'leftMidle': {
            let resizeValue = currentPosX - startPosX;
            targetDiv.style.width = targetDivPos.width - resizeValue + 'px';
            targetDiv.style.left = '';
            targetDiv.style.right = wrapPosition.right - targetDivPos.right + 'px'; 
            break;
          }
        case "topMidle": {  
            let resizeValue = currentPosY - startPosY;
            targetDiv.style.height = targetDivPos.height + resizeValue + "px";
            targetDiv.style.left = targetDivPos.left + "px";
            targetDiv.style.top = targetDivPos.top + "px";
          break;  
              
      }


    }
  } 
 }
function mouseup(e) {
      e.preventDefault();
      document.removeEventListener('mousemove', mousedown);
      document.removeEventListener('mouseup', mouseup);
  }

}

}

const checkPosition =  (startPosX, startPosY, currentPosX, currentPosY) => {
   if (Math.abs(startPosX + currentPosX) > Math.abs(startPosY - currentPosY)) {
          return  currentPosX - startPosX;
      } else {
          return  currentPosY - startPosY;
      }     
      
}

});




  