window.onload = function() {
  let ctx = {
    x: 100,
    y: 100,
    vx: 3,
    vy: 3,
  }

  var dvd = document.getElementById("dvd");
  dvd.style.top = 20;
  dvd.style.left = 400;
  updateColor();
  update();

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
    if(ctx.x + 240 >= window.innerWidth || ctx.x <= 0){
      ctx.vx *= -1;
      updateColor();
    }
  
    if(ctx.y + 320 >= window.innerHeight || ctx.y <= 0){
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


// /* Referenced https://github.com/AlessioMaddaluno/bouncing-dvd-logo */
// let speed = 20;
// let scale = 0.17; // Image scale (I work on 1080p monitor)
// let canvas;
// let ctx;
// let logoColor;

// let dvd = {
//     x: 200,
//     y: 300,
//     xspeed: 10,
//     yspeed: 10,
//     img: new Image()
// };

// (function main(){
//     canvas = document.body;
//     ctx = canvas.getContext("2d");
//     dvd.img.src = 'DVD_logo.svg';

//     //Draw the "tv screen"
//     canvas.width  = window.innerWidth;
//     canvas.height = window.innerHeight;

//     pickColor();
//     update();
// })();

// function update() {
//     setTimeout(() => {
//         //Draw the canvas background
//         ctx.fillStyle = '#000';
//         ctx.fillRect(0, 0, canvas.width, canvas.height);
//         //Draw DVD Logo and his background
//         ctx.fillStyle = logoColor;
//         ctx.fillRect(dvd.x, dvd.y, dvd.img.width*scale, dvd.img.height*scale);
//         ctx.drawImage(dvd.img, dvd.x, dvd.y, dvd.img.width*scale, dvd.img.height*scale);
//         //Move the logo
//         dvd.x+=dvd.xspeed;
//         dvd.y+=dvd.yspeed;
//         //Check for collision 
//         checkHitBox();
//         update();   
//     }, speed)
// }

// //Check for border collision
// function checkHitBox(){
//     if(dvd.x+dvd.img.width*scale >= canvas.width || dvd.x <= 0){
//         dvd.xspeed *= -1;
//         pickColor();
//     }
        
//     if(dvd.y+dvd.img.height*scale >= canvas.height || dvd.y <= 0){
//         dvd.yspeed *= -1;
//         pickColor();
//     }    
// }

// //Pick a random color in RGB format
// function pickColor(){
//     r = Math.random() * (254 - 0) + 0;
//     g = Math.random() * (254 - 0) + 0;
//     b = Math.random() * (254 - 0) + 0;

//     logoColor = 'rgb('+r+','+g+', '+b+')';
// }
