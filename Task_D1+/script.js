window.addEventListener('load', preload);
const container = document.querySelector('#container'),
      wrap = document.querySelector('#wrap'),
      resizers = container.querySelectorAll(".resizer");
      
let isResizing = false;

function preload() {
  const pos = getElementPos(container);
  container.style.left = pos.left + 'px';
  container.style.top = pos.top + 'px';
  container.addEventListener("mousedown", mousedown);
  container.style.position = 'absolute';
  
}




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



for (let resizer of resizers) {
  resizer.addEventListener("mousedown", mousedown);

  function mousedown(EO) {
    var EO = EO || window.event;
    EO.preventDefault();
    var targetDiv = EO.target.parentNode;
    var tDright = EO.target.parentNode.getBoundingClientRect().right;
    var tDbottom = EO.target.parentNode.getBoundingClientRect().bottom;
    var tDheight = EO.target.parentNode.getBoundingClientRect().height;
    var tDwidth = EO.target.parentNode.getBoundingClientRect().width;
    var tDleft = EO.target.parentNode.getBoundingClientRect().left;
    var tDtop = EO.target.parentNode.getBoundingClientRect().top;
    var targetObj = EO.target;
  
  
    var startPosX = EO.clientX;
    var startPosY = EO.clientY;
   
    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);
  
    
    function mouseup(EO) {
      var EO = EO || window.event;
      EO.preventDefault();
      document.removeEventListener("mousemove", mousedown);
      document.removeEventListener("mouseup", mouseup);
    }
  
    function mousemove(EO) {
      if (EO.which === 1) {
        var EO = EO || window.event;
        EO.preventDefault();
        var currentPosX = EO.clientX;
        var currentPosY = EO.clientY;
      
        switch (EO.target.classList.item(1)) {
          //изменение размеров по ширине и высоте отдельно
          case "topMidle": { // OK
            var resizeValue = currentPosY - startPosY;
            targetDiv.style.height = tDheight - resizeValue + "px";
            targetDiv.style.bottom = document.getElementById("DRnDRarea").getBoundingClientRect().bottom - tDbottom + "px";  //фиксация грани на противоположной действию стороне
            targetDiv.style.top = "";
  
            break;
          }
          case "leftMidle": {
            var resizeValue = currentPosX - startPosX;
            targetDiv.style.width = tDwidth - resizeValue + "px";
            targetDiv.style.left = "";
            targetDiv.style.right = document.getElementById("DRnDRarea").getBoundingClientRect().right - tDright + "px"; //фиксация грани на противоположной действию стороне
            break;
          }
          case "bottomMidle": {  //OK
            var resizeValue = currentPosY - startPosY;
            targetDiv.style.height = tDheight + resizeValue + "px";
            targetDiv.style.left = tDleft + "px";
            targetDiv.style.top = tDtop + "px";
            break;
          }
          case "rightMidle": {  //OK
            var resizeValue = currentPosX - startPosX;
            targetDiv.style.width = tDwidth + resizeValue + "px";
            targetDiv.style.left = tDleft + "px";
            targetDiv.style.top = tDtop + "px";
            break;
          }
          //изменение размеров при помощи угловых элем. управления
          case "topLeft": {  //not OK
            if (
              Math.abs(startPosX + currentPosX) >
              Math.abs(startPosY - currentPosY)
            )
              var resizeValue = currentPosX - startPosX;
            else resizeValue = currentPosY - startPosY;
        console.log(startPosX);
        //console.log(currentPosX);
           
            targetDiv.style.height = tDheight - resizeValue + "px";
            targetDiv.style.width = tDwidth - resizeValue + "px";
            targetDiv.style.bottom = document.getElementById("DRnDRarea").getBoundingClientRect().bottom - tDbottom + "px";   //фиксация точки на противоположном действию углу
            targetDiv.style.right = document.getElementById("DRnDRarea").getBoundingClientRect().right - tDright + "px";     //фиксация точки на противоположном действию углу
            targetDiv.style.left = "";
            targetDiv.style.top = "";
            break;
          }
          case "bottomLeft": {   //not OK
            if (
              Math.abs(startPosX + currentPosX) >
              Math.abs(startPosY - currentPosY)
            )
              var resizeValue = currentPosX - startPosX;
            else resizeValue = currentPosY - startPosY;
         console.log(resizeValue);
        
            targetDiv.style.height = tDheight - resizeValue + "px";
            targetDiv.style.width = tDwidth - resizeValue + "px";
            targetDiv.style.right = document.getElementById("DRnDRarea").getBoundingClientRect().right - tDright + "px";   //фиксация точки на противоположном действию углу, top остаётся
            targetDiv.style.left = "";
            targetDiv.style.top = tDtop + "px";
            break;
          }
          case "bottomRight": {  //OK
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
          case "topRight": {   //not OK
            if (
              Math.abs(startPosX + currentPosX) >
              Math.abs(startPosY - currentPosY)
            )
        
              var resizeValue = currentPosX - startPosX;
            else resizeValue = currentPosY - startPosY;
        //верх право
            targetDiv.style.height = tDheight + resizeValue + "px";
            targetDiv.style.width = tDwidth + resizeValue + "px";
            targetDiv.style.bottom = document.getElementById("DRnDRarea").getBoundingClientRect().bottom - tDbottom + "px"; //фиксация точки на противоположном действию углу, left остаётся
            targetDiv.style.left = tDleft + "px";
            targetDiv.style.top = "";
            break;
          }
        }
      } else return false;
      document.getElementById("bottomMidle").style.top =
        100 -
        100 *
          (document.getElementById("bottomMidle").offsetHeight / targetDiv.offsetHeight) +
        "%";
      document.getElementById("rightMidle").style.left =
        100 -
        100 * (document.getElementById("rightMidle").offsetWidth / targetDiv.offsetWidth) +
        "%";
    }
  }
}  

function getElementPos(elem) {
  const bbox = elem.getBoundingClientRect();
  return {
    left: bbox.left + window.pageXOffset,
    top: bbox.top + window.pageYOffset
  };
}
//________________________________________________________________________________________
/*
 let currentResizer;

for (let resizer of resizers) {
  resizer.addEventListener("mousedown", mousedown);

  function mousedown(e) {
    e.preventDefault();
    currentResizer = e.target;
    isResizing = true;
      
    let prevX = e.clientX;
    let prevY = e.clientY;

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e) {
      e.preventDefault();
      let currentPosX = e.clientX;
      let currentPosY = e.clientY;

      let valueResize;
      const res = container.getBoundingClientRect(); 
     

      switch (currentResizer.classList.item(1)) {
        case "topLeft": {
      //   console.log(currentPosX+'!');
     //    console.log(currentPosY)
          console.log(prevX);
      //    console.log(prevY); 

          if  ((Math.abs( prevX + currentPosX) > Math.abs(prevY - currentPosY))) {
                  valueResize =currentPosX - prevX;
          } else {
                  valueResize = currentPosY - prevY;
          }
             

            
            container.style.height = res.height - valueResize + "px";
            container.style.width =  res.width - valueResize + "px";
            container.style.bottom = wrap.getBoundingClientRect().bottom - res.bottom + 'px';
            container.style.right =  wrap.getBoundingClientRect().right - res.right + 'px' ;
            container.style.left = '';
            container.style.top = '';
            break;
        }
        case "bottomLeft": {
     
       
          container.style.height = res.height - valueResize + "px";
          container.style.width =  res.width - valueResize + "px";
          container.style.right =  wrap.getBoundingClientRect().right - res.right + 'px' ;
          container.style.left = '';
          container.style.top = res.top + 'px';
          break;
      } 
      
        default:
          break;
      }
          
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
    return  prevY + currResizerY;
  }
}

function getElementPos(elem) {
  const bbox = elem.getBoundingClientRect();
  return {
    left: bbox.left + window.pageXOffset,
    top: bbox.top + window.pageYOffset
  };
}

*/