const dvdFieldDOM = document.getElementById("dvd-field");

class DVD {

  constructor(dvdSvgDOM) {

    this.dom = dvdSvgDOM
    this.coord = { x: 0, y: 0 }
    this.speed = 0.26
    this.rgbVec3 = [0, 0, 0]
    this.previousTime = 0

    this.dom.onclick = () => this.changeColor()
    this.dom.ontouchstart = () => this.changeColor()

    this.changeColor()
  }

  update(t) {

    const dt = t - (this.previousTime || t)

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

function runDVD() {

  const dvds = [new DVD(document.getElementById("dvd"))];

  onDVD(() => {
    const dvdDOM = document.getElementById("dvd").cloneNode(true)
    document.body.appendChild(dvdDOM)
    dvds.push(new DVD(dvdDOM))
  })


  function loop(dt) {
    dvds.forEach(dvd => dvd.update(dt))
    requestAnimationFrame(loop)
  }

  requestAnimationFrame(loop)

}

runDVD()


function onDVD(callback) {
  let keyQueue = ['', '', '']
  const listener = e => {
    keyQueue.shift()
    keyQueue.push(e.key)
    if (keyQueue.join('') === 'dvd') {
      callback()
    }
  }
  document.addEventListener('keypress', listener)

  return () => document.removeEventListener('keypress', listener)
}
