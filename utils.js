function randomInt(min, max) {
  if(max < min) {
    console.error("Start is bigger than End");
    return null;
  } else {
    return Math.floor(Math.random() * (max - min+1)) + min;
  }
}

function randomFloat(min, max) {
  if(max < min) {
    console.error("Start is bigger than End");
    return null;
  } else {
    return Math.random() * (max - min) + min;
  }
}

function randomColor(colors) {
  let colorNum = colors.length;
  return colors[randomInt(0, colorNum-1)];
}

class vect2d {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// used mechanism https://stackoverflow.com/questions/22155614/how-to-create-a-random-closed-smooth-cgpath
function genRandomSpot(ctx, color) {
  let angleSteps = 8;
  let baseRadius = 30;
  
  let centerPoint = new vect2d(randomFloat(40, CANVAS_WIDTH-40), randomFloat(40, CANVAS_WIDTH-40));
  let points = [];

  for(let i=0 ; i<angleSteps ; i++) {
    let angle = 2 * Math.PI / angleSteps * i + randomFloat(-Math.PI/angleSteps, Math.PI/angleSteps);
    let radius = baseRadius + randomFloat(0, baseRadius/2);
    let aVect = new vect2d(radius * Math.cos(angle), radius * Math.sin(angle));

    points.push(new vect2d(centerPoint.x + aVect.x, centerPoint.y + aVect.y));
  }

  ctx.beginPath();
  for(let i=0 ; i<angleSteps ; i++) {
    let startPoint = points[i], endPoint = points[(i+1)%angleSteps];
    let sub1 = points[(i-1+angleSteps)%angleSteps], sub2 = points[(i+2)%angleSteps];
  
    let slope1 = (startPoint.y - sub1.y) / (startPoint.x - sub1.x), yInt1 = -slope1 * sub1.x + sub1.y;
    let slope2 = (endPoint.y - sub2.y) / (endPoint.x - sub2.x),  yInt2 = -slope2 * sub2.x + sub2.y; 
    // intersect of two lines startPoint - sub1 & endPoint - sub2
    let controlPointX = (yInt2 - yInt1) / (slope1 - slope2);
    let controlPointY = slope1 * controlPointX + yInt1;

    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.quadraticCurveTo(controlPointX, controlPointY, endPoint.x, endPoint.y);
  }
  ctx.fillStyle = color;
  ctx.fill();
  ctx.beginPath();
  for(let i=0 ; i<angleSteps ; i++) {
    let startPoint = points[i], endPoint = points[(i+1)%angleSteps];
    let sub1 = points[(i-1+angleSteps)%angleSteps], sub2 = points[(i+2)%angleSteps];
  
    let slope1 = (startPoint.y - sub1.y) / (startPoint.x - sub1.x), yInt1 = -slope1 * sub1.x + sub1.y;
    let slope2 = (endPoint.y - sub2.y) / (endPoint.x - sub2.x),  yInt2 = -slope2 * sub2.x + sub2.y; 
    // intersect of two lines startPoint - sub1 & endPoint - sub2
    let controlPointX = (yInt2 - yInt1) / (slope1 - slope2);
    let controlPointY = slope1 * controlPointX + yInt1;

    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(controlPointX, controlPointY);
  }
  ctx.stroke();
}

function drawCircle(ctx, x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = "black";
  ctx.fill();
}