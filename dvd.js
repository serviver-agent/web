const dvdFieldDOM = document.getElementById("dvd-field");

class DVD {

  constructor(dvdSvgDOM) {
    const acc = 0.12

    this.dom = dvdSvgDOM
    this.coord = { x: 0, y: 0 }
    this.speed = { x: acc, y: acc }
    this.rgbVec3 = [0, 0, 0]
    this.previousTime = 0

    this.dom.onclick = () => this.changeColor()
    this.dom.ontouchstart = () => this.changeColor()
  }

  update(t) {

    const dt = t - this.previousTime

    const areaWidth = dvdFieldDOM.clientWidth - this.dom.clientWidth
    const areaHeight = dvdFieldDOM.clientHeight - this.dom.clientHeight

    let needColorChange = false

    if (this.coord.x < 0 && this.speed.x < 0 || this.coord.x > areaWidth && this.speed.x > 0) {
      this.speed.x = this.speed.x * -1
      needColorChange = true
    }
    if (this.coord.y < 0 && this.speed.y < 0 || this.coord.y > areaHeight && this.speed.y > 0) {
      this.speed.y = this.speed.y * -1
      needColorChange = true
    }

    if (needColorChange) this.changeColor()

    this.coord.x = this.coord.x + this.speed.x * dt
    this.coord.y = this.coord.y + this.speed.y * dt

    this.dom.style.left = this.coord.x + "px";
    this.dom.style.top = this.coord.y + "px";

    this.previousTime = t

  }

  changeColor() {
    this.rgbVec3 = Array(3).fill(null).map(_ => parseInt(Math.floor(Math.random() * 256), 10))
    this.dom.style.fill = `rgb(${this.rgbVec3.map(int => int.toString()).join(',')})`;
  }

}

function runDVD() {

  const dvd = new DVD(document.getElementById("dvd"));

  function loop(dt) {
    dvd.update(dt)
    requestAnimationFrame(loop)
  }
  requestAnimationFrame(loop)

}

runDVD()
