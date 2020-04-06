let c, ctx;
let CANVAS_WIDTH, CANVAS_HEIGHT;
let catType = [catSolid, catBicolor];

window.onload = init();

function init() {
  c = document.getElementById("mainCanvas");
  ctx = c.getContext("2d");
  
  CANVAS_WIDTH = c.width;
  CANVAS_HEIGHT = c.height;
  
  clearCanvas();
  genCat();
}

function genCat() {
  clearCanvas();

  let colorScheme = ["#515151", "#909090", "#fee4b1", "#fccb78", "#232323", "#5e5e5e", "#f99013", "#ffffff"];
  let catStyle = randomInt(0, catType.length-1);

  catType[catStyle](ctx, colorScheme)
}

function clearCanvas() {
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, CANVAS_HEIGHT, CANVAS_WIDTH);
}
