import {threedify} from "./threedify.js";

function initBox(x,y,g){
  const box = document.querySelector(".box");
  box.innerHTML="";
  for(let i = 0; i< x*y; ++i){
    const b = document.createElement("button");
    b.classList.add("threed");
    box.appendChild(b);
  }
  box.style.gridTemplateColumns = "repeat("+x+",1fr)";
  box.style.gridGap = g+"px";
}

initBox(8,8,1);
threedify('.options span');
threedify('.box');

document.querySelector('.set').addEventListener('click',()=>{
  const _x = document.querySelector(".options .x_size").value;
  const _y = document.querySelector(".options .y_size").value;
  const _g = document.querySelector(".options .gap_size").value;
  
  const x = parseInt(_x);
  const y = parseInt(_y);
  const g = parseInt(_g);
  
  if (isNaN(x) || isNaN(y) || isNaN(g)){
    console.log("Did not enter numbers only :/")
    return;
  }
  
  initBox(x,y,g);
  threedify(".box");
});

