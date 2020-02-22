window.onload = function() {
  let ctx = {
    x: 100,
    y: 100,
    vx: 3,
    vy: 3,
    fieldx: null,
    fieldy: null,
  }
  let size = {
    x: null,
    y: null
  }

  var dvdField = document.getElementById("dvd-field");
  ctx.fieldx = dvdField.clientHeight;
  ctx.fieldy = dvdField.clientWidth;
  window.onresize = function() {
    ctx.fieldx = dvdField.clientHeight;
    ctx.fieldy = dvdField.clientWidth;
  }

  var dvd = document.getElementById("dvd");
  size.x = dvd.clientHeight;
  size.y = dvd.clientWidth;

  dvd.onclick = function(e) {
    e.preventDefault;
    updateColor();
  };
  dvd.ontouchstart = function(e) {
    e.preventDefault;
    updateColor();
  };

  dvd.style.top = 20;
  dvd.style.left = 400;
  updateColor();
  update();

  console.log(ctx);
  console.log(size);

  function update() {
    setTimeout(() => {
      ctx.x += ctx.vx;
      ctx.y += ctx.vy;
      dvd.style.top = ctx.x + "px";
      dvd.style.left = ctx.y + "px";
      checkHit();
      update();
    }, 10);
  }

  function checkHit() {
    if(ctx.x + size.x >= ctx.fieldx || ctx.x <= 0){
      ctx.vx *= -1;
      updateColor();
    }
  
    if(ctx.y + size.y >= ctx.fieldy || ctx.y <= 0){
      ctx.vy *= -1;
      updateColor();
    }
  }
  
  function updateColor() {
    r = Math.random() * (254 - 0) + 0;
    g = Math.random() * (254 - 0) + 0;
    b = Math.random() * (254 - 0) + 0;

    dvd.style.fill = 'rgb('+r+','+g+', '+b+')';
  }

}
