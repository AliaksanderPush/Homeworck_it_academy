const el = document.querySelector("img");
const container = document.querySelector('.container');
const resizers = document.querySelectorAll(".resizer");


let isResizing = false;

el.addEventListener("mousedown", mousedown);

function mousedown(e) {
  
  window.addEventListener("mousemove", mousemove);
  window.addEventListener("mouseup", mouseup);

  let prevX = e.clientX;
  let prevY = e.clientY;
  
  function mousemove(e) {
    if (!isResizing) {
      container.style.position = 'absolute';
      let newX = prevX - e.clientX;
      let newY = prevY - e.clientY;

      const rect = el.getBoundingClientRect();
      
      container.style.left = rect.left - newX + "px";
      container.style.top = rect.top - newY + "px";

         prevX = e.clientX;
         prevY = e.clientY;
      
    }
  }




  function mouseup() {
    container.style.position = 'relative';
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

    let prevX = e.clientX;
    let prevY = e.clientY;

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e) {
      const rect = el.getBoundingClientRect();

      if (currentResizer.classList.contains("topLeft")) {
        el.style.width = rect.width - (prevX - e.clientX) + "px";
        el.style.height = rect.height - (prevY - e.clientY) + "px";
      } else if (currentResizer.classList.contains("topRight")) {
        el.style.width = rect.width + (prevX - e.clientX) + "px";
        el.style.height = rect.height - (prevY - e.clientY) + "px";
        el.style.left = rect.left - (prevX - e.clientX) + "px";
      } else if (currentResizer.classList.contains("bottomLeft")) {
        el.style.width = rect.width - (prevX - e.clientX) + "px";
        el.style.height = rect.height + (prevY - e.clientY) + "px";
        el.style.top = rect.top - (prevY - e.clientY) + "px";
      } else {
        el.style.width = rect.width + (prevX - e.clientX) + "px";
        el.style.height = rect.height + (prevY - e.clientY) + "px";
        el.style.top = rect.top - (prevY - e.clientY) + "px";
        el.style.left = rect.left - (prevX - e.clientX) + "px";
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


function preload() {
  const content = document.createComment('div');
  content.classList.add("content");
  content.style.width = '300px';
  content.style.height = '150px';
  content.style.backgroundColor = 'orange';

  const ne = document.createElement('div');
  ne.style.width = '10px';
  ne.style.height = '10px';
  ne.style.backgroundColor = 'black'; 
  ne.style.position = 'absolute';
  ne.top = '-1px';
  ne.left = '-1px';

  const s = document.createElement('div');
  s.style.width = '10px';
  s.style.height = '10px';
  s.style.backgroundColor = 'black'; 
  s.style.position = 'absolute';
  s.top = '-1px';
  s.left = (content.offsetWidth / 2)+'px' ;

}
preload()