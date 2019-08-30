const clickScale = 0.9;
const hoverScale = 1.1;
const clickScaleString = "scale("+clickScale+")";
const hoverScaleString = "scale("+hoverScale+")";
// const mainTransitionClass = "threedify_release";
// const clickTransitionClass = "threedify_click";
// const noTransitionClass = "threedify_hover";

function threed(e){
  const b = e.target.closest(".threed");
  const root = b.parentNode;
  
  b.style.transform = "";
  // onlyClass(b, noTransitionClass);
  b.style.zIndex = "2";
  
  const brec = b.getBoundingClientRect();
  const prec = root.getBoundingClientRect();
  const x = e.clientX - brec.left;
  const y = e.clientY - brec.top;
  const width = brec.width;
  const height = brec.height;
  const midX = width/2;
  const midY = height/2;
  const xDist = x - midX;
  const yDist = y - midY;
  //console.log("("+xDist/midX+", "+yDist/midY+")");
  //maximum allowed angle
  const max = 25;

  // rotation in x direction is around y-Axis
  let yAngle = (xDist/midX)*max;
  let xAngle = -(yDist/midY)*max;
  let xTrans = 0.3*xDist;
  let yTrans = 0.3*yDist;
  
  //inputs tend to fly away, lol
  if (Math.abs(xAngle) > max){
    xAngle = Math.sign(xAngle)*max;
  }
  if (Math.abs(yAngle) > max){
    yAngle = Math.sign(yAngle)*max;
  }
  if (Math.abs(xTrans) > midX*clickScale){
    xTrans = Math.sign(xTrans)*midX*clickScale;
  }
  if (Math.abs(yTrans) > midY*clickScale){
    yTrans = Math.sign(yTrans)*midY*clickScale;
  }
  
  const angle = "rotateX("+Math.min(xAngle,max)+"deg) rotateY("+Math.min(yAngle,max)+"deg)";
  const trans = "translateX("+xTrans+"px) translateY("+yTrans+"px)";
  
  const aMid = (brec.left-prec.left+midX) + "px " +  (brec.top-prec.top+midY) + "px";
  
  b.style.transform = trans+" "+angle+" "+hoverScaleString;
  root.style.perspectiveOrigin = aMid;
  
  if(b.closest(".threed:active")){
    pushd(e, false);
  }
}

// function onlyClass(b, c){
//   const cl = b.classList;
//   cl.remove(clickTransitionClass);
//   cl.remove(mainTransitionClass);
//   cl.remove(noTransitionClass);
//   cl.add(c);
// }

function freed(e){
  const b = e.target.closest(".threed");
  // onlyClass(b,mainTransitionClass);
  b.style.transform = "";
  b.style.zIndex = "";
}

function pushd(e, setTransition=true){
  const b = e.target.closest(".threed");
  
  const bscale = b.style.transform;
  if(!bscale.includes(clickScaleString)){ 
    b.style.transform += " "+clickScaleString;
  }
  
  if(setTransition){
    // onlyClass(b, clickTransitionClass);
  }
}

function released(e){
  const b = e.target.closest(".threed");
  // onlyClass(b, clickTransitionClass);
  
  const bscale = b.style.transform;
  b.style.transform = bscale.replace(" "+clickScaleString, "");;
}

//threedify everything
export function threedify(_parents="body", perspective="700px"){
  if(_parents.includes(",")){
    console.warn("Commas in selectors are likely to cause issues.");
    console.trace();
  }
  const parents = document.querySelectorAll(_parents);
  for(let i = 0; i< parents.length; i++){
    const parent = parents[i];
    parent.style.perspective = perspective;
  }
  
  const tbs = document.querySelectorAll(_parents+" > .threed");
  if(tbs.length == 0){
    console.warn("No threed-Buttons in DOM");
    console.trace();
  }
  for (let i = 0; i < tbs.length; ++i){
    const tb = tbs[i];

    // tb.classList.add(mainTransitionClass);

    tb.addEventListener("mousemove", (e)=>{
      threed(e);
    });

    tb.addEventListener("mouseout", (e)=>{
      freed(e);
    });

    tb.addEventListener("mousedown", (e)=>{
      pushd(e);
    });

    tb.addEventListener("mouseup", (e)=>{
      released(e);
    });
  }
}