let c, ctx;
let CANVAS_WIDTH, CANVAS_HEIGHT;

class randomCurve {
  constructor() {
    // Generate a random sine wave
    // Formula : A*sin(a*x) + B*sin(b*x) 
    // where A, a, B, b are random  
    // A+B = 1 , the frequency must be 2pi

    this.size = randomFloat(5, 10);
    this.A = randomFloat(-1, 1) * this.size; 
    this.a = randomFloat(0.5, 1.5);
    this.B = (1 - this.A) * this.size;
    this.b = 2 - this.a;

    this.min = - this.A - this.B;
    this.offset = 10;
  }

  getXY(angle) {  
    let R = this.A * Math.sin(this.a * angle) + this.B * Math.sin(this.b * angle) - this.min + this.offset;

    let X = Math.cos(angle) * R;
    let Y = Math.sin(angle) * R;

    return [X, Y];
  }
}

window.onload = init();

function init() {
  c = document.getElementById("mainCanvas");
  ctx = c.getContext("2d");
  
  CANVAS_WIDTH = c.clientWidth;
  CANVAS_HEIGHT = c.clientHeight;

  clearCanvas();
  genCat();
}

function clearCanvas() {
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, CANVAS_HEIGHT, CANVAS_WIDTH);
}

function genCat() {
  clearCanvas();

  let colorScheme = ["", "#515151", "#909090", "#fee4b1", "#fccb78", "#232323", "#5e5e5e", "#f99013"];
  let colorNum = randomInt(1, 5);

  for(let i=0 ; i<colorNum ; i++) {
    let colorIdx = randomInt(1, 8);
    let colorCode = colorScheme[colorIdx];
    console.log(colorCode);

    let startX, startY;
    startX = randomInt(0, CANVAS_WIDTH);
    startY = randomInt(0, CANVAS_HEIGHT);
    console.log(startX, startY);
    
    let newCurve = new randomCurve();
    ctx.beginPath();
    for(let angle=0 ; angle < 2 * Math.PI ; angle += 0.01) {
      let [aX, aY] = newCurve.getXY(angle);
      let [X, Y] = [startX + aX, startY + aY];
      
      if(!angle)
        ctx.moveTo(X, Y);
      ctx.lineTo(X, Y);
    }
    ctx.fillStyle = colorCode;
    ctx.fill();
  }

  
}

function randomInt(start, end) {
  if(end < start) {
    console.error("Start is bigger than End");
    return null;
  } else {
    rawRand = Math.floor(Math.random() * 10000);
    parsedRand = rawRand % (end-start+1) + 1;
    return parsedRand;
  }
}

function randomFloat(start, end) {
  if(end < start) {
    console.error("Start is bigger than End");
    return null;
  } else {
    return Math.random() * (end - start) + start;
  }
}