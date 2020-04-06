function catSolid(ctx, colors) {
  let bodyColor = randomColor(colors);

  ctx.fillStyle = bodyColor;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}