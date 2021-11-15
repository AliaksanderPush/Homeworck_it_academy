
const container = document.querySelector('#container'),
      wrap = document.querySelector('#wrap'),
      resizers = container.querySelectorAll(".resizer");



let isResizing = false;

container.addEventListener("mousedown", mousedown);

function mousedown(e) {
  
  window.addEventListener("mousemove", mousemove);
  window.addEventListener("mouseup", mouseup);

  let prevX = e.clientX;
  let prevY = e.clientY;
  
  function mousemove(e) {
    if (!isResizing) {
      
      let newX = prevX - e.clientX;
      let newY = prevY - e.clientY;

      const rect = container.getBoundingClientRect();
      
      container.style.left = rect.left - newX + "px";
      container.style.top = rect.top - newY + "px";

         prevX = e.clientX;
         prevY = e.clientY;
      
    }
  }


  function mouseup() {
    window.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", mouseup);
  }
}


let currentResizer;

for (let resizer of resizers) {
  resizer.addEventListener("mousedown", mousedown);

  function mousedown(e) {
    currentResizer = e.target;
    isResizing = true;
    const rect =  currentResizer.parentNode.getBoundingClientRect();
    console.log(rect)
    
    let prevX = e.clientX;
    let prevY = e.clientY;

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e) {
      
      const content = wrap.getBoundingClientRect();
     
      
     // const rect =  container.getBoundingClientRect();
      let  valueResize; 

      switch (currentResizer.classList.item(1)) {
        case "topLeft": {
         valueResize = checkPosition(prevX, e.clientX, prevY, e.clientY);
         
            container.style.width = rect.width - valueResize + "px";
            container.style.height = rect.height - valueResize + "px";
            container.style.bottom = wrap.bottom - rect.bottom + 'px';
            container.style.right =  wrap.right - rect.right + 'px' ;
            container.style.top = '';
            container.style.left = '';
          //  console.log(content)
         //   console.log(content.bottom);
            
            
           // console.log(rect.bottom)
            
            
           
           
        }
          
          break;
      
        default:
          break;
      }


      /*

      if (currentResizer.classList.contains("topLeft")) {
       
        container.style.width = rect.width - (e.clientX - prevX) + "px";
        container.style.height = rect.height - (e.clientY - prevY) + "px";
        container.style.bottom = rect.bottom + 'px';
        container.style.top = rect.top + 'px';
      } else if (currentResizer.classList.contains("topRight")) {
        container.style.width = rect.width + (prevX - e.clientX) + "px";
        container.style.height = rect.height - (prevY - e.clientY) + "px";
        container.style.left = rect.left - (prevX - e.clientX) + "px";
      } else if (currentResizer.classList.contains("bottomLeft")) {
        container.style.width = rect.width - (prevX - e.clientX) + "px";
        container.style.height = rect.height + (prevY - e.clientY) + "px";
        container.style.top = rect.top - (prevY - e.clientY) + "px";
      } else {
        container.style.width = rect.width + (prevX - e.clientX) + "px";
        container.style.height = rect.height + (prevY - e.clientY) + "px";
        container.style.top = rect.top - (prevY - e.clientY) + "px";
        container.style.left = rect.left - (prevX - e.clientX) + "px";
      }
*/
      prevX = e.clientX;
      prevY = e.clientY;
    }

    function mouseup() {
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
      isResizing = false;
    }
  }

}

function checkPosition(prevX, currResizerX, prevY, currResizerY) {
  if (Math.abs(prevX + currResizerX) > Math.abs(prevY - currResizerY)) {
    return  prevX - currResizerX;
  } else {
    return  prevY - currResizerY;
  }
}

