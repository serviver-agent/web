const dvdFieldDOM = document.getElementById("dvd-field");

class DVD {

  constructor(dvdSvgDOM, x, y) {

    this.dom = dvdSvgDOM
    this.coord = { x: x, y: y }
    this.speed = 0.26
    this.rgbVec3 = [0, 0, 0]
    this.previousTime = 0

    this.dom.onclick = () => {
      this.changeColor();
      runDVD(dvdFieldDOM.clientWidth - this.dom.clientWidth - x, y);
    }
    this.dom.ontouchstart = () => {
      this.changeColor()
      runDVD(dvdFieldDOM.clientWidth - this.dom.clientWidth - x, y);
    }

    this.changeColor()

  }

  update(t) {

    const dt = t - this.previousTime

    const areaWidth = dvdFieldDOM.clientWidth - this.dom.clientWidth
    const areaHeight = dvdFieldDOM.clientHeight - this.dom.clientHeight

    const x = (this.coord.x + this.speed * dt) % (areaWidth * 2)
    const y = (this.coord.y + this.speed * dt) % (areaHeight * 2)

    if ((Math.floor(this.coord.x / areaWidth) != Math.floor(x / areaWidth))
      || (Math.floor(this.coord.y / areaHeight) != Math.floor(y / areaHeight)))
      this.changeColor()

    this.coord = {x, y}

    this.dom.style.left = areaWidth - Math.abs(this.coord.x - areaWidth) + "px";
    this.dom.style.top = areaHeight - Math.abs(this.coord.y - areaHeight) + "px";

    this.previousTime = t

  }

  changeColor() {
    this.rgbVec3 = Array(3).fill(null).map(_ => parseInt(Math.floor(Math.random() * 256), 10))
    this.dom.style.fill = `rgb(${this.rgbVec3.map(int => int.toString()).join(',')})`;
  }

}

function runDVD(x, y) {

  const template = document.querySelector("#dvd-template");
  const body = document.querySelector("body");
  const clone = document.importNode(template.content, true);
  const svg = clone.querySelector(".dvd");
  console.log(svg);
  body.appendChild(svg);
  const dvd = new DVD(svg, x, y);

  function loop(dt) {
    dvd.update(dt)
    requestAnimationFrame(loop)
  }
  requestAnimationFrame(loop)

}

runDVD(0, 0)
