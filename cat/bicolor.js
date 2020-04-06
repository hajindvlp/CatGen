function catBicolor(ctx, colors) {
  let bodyColor = randomColor(colors);
  let secColor = randomColor(colors);

  ctx.fillStyle = bodyColor;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  let spotNum = randomInt(1, 4);
  for(let i=0 ; i<spotNum ; i++) { genRandomSpot(ctx, secColor); }
}