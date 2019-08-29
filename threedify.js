const clickScale = 0.9;
const hoverScale = 1.1;
const clickScaleString = "scale("+clickScale+")";
const hoverScaleString = "scale("+hoverScale+")";
const mainTransition = "transform .5s ease, background .5s ease-in";
const clickTransition = "transform .05s ease-in, background .05s ease-in";

function threed(e){
  const b = e.target.closest('.threed');
  const root = document.querySelector("main");
  
  b.style.transform = "";
  b.style.transition = "transform 0s ease";
  b.style.zIndex = "2";
  
  const brec = b.getBoundingClientRect();
  const x = e.clientX - brec.left;
  const y = e.clientY - brec.top;
  const width = Math.abs(brec.left - brec.right);
  const height = Math.abs(brec.top - brec.bottom);
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
  
  const aMid = (e.clientX+midX) + "px " +  (e.clientY+midY) + "px";
  
  b.style.transform = trans+" "+angle+" "+hoverScaleString;
  root.style.perspectiveOrigin = aMid;
  
  if(b.closest(".threed:active")){
    pushd(e, false);
  }
  
  //console.log(angle); 
}

function freed(e){
  const b = e.target.closest('.threed');
  b.style.transition = mainTransition;
  b.style.transform = "";
  b.style.zIndex = "";
}

function pushd(e, setTransition=true){
  const b = e.target.closest('.threed');
  
  const bscale = b.style.transform;
  if(!bscale.includes(clickScaleString)){ 
    b.style.transform += " "+clickScaleString;
  }
  
  if(setTransition){
    b.style.transition = clickTransition;
  }
}

function released(e){
  const b = e.target.closest('.threed');
  b.style.transition = clickTransition;
  
  const bscale = b.style.transform;
  b.style.transform = bscale.replace(" "+clickScaleString, "");;
}

//threedify everything
export function threedify(_parents="body"){
  const parents = document.querySelectorAll(_parents);
  for (let i = 0; i < parents.length; ++i){
    const parent = parents[i];
    parent.style.perspective = "700px";
  }
  
  const tbs = document.querySelectorAll(_parents+" > .threed");
  if(tbs.length == 0){
    console.warn("No threed-Buttons in DOM");
  }
  for (let i = 0; i < tbs.length; ++i){
    const tb = tbs[i];

    tb.addEventListener('mousemove', (e)=>{
      threed(e);
    });

    tb.addEventListener('mouseout', (e)=>{
      freed(e);
    });

    tb.addEventListener('mousedown', (e)=>{
      pushd(e);
    });

    tb.addEventListener('mouseup', (e)=>{
      released(e);
    });
  }
}

