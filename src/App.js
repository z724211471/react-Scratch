import React from "react";
import './App.css'
import scratch from '../assets/scratch-2x.jpg'
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.canvas = React.createRef();
  }
  componentDidMount() {

    this.zcanvas = this.canvas.current
    this.context = this.zcanvas.getContext('2d')
    console.log(this.context)
 
setTimeout(()=>{
  this.offsetX = this.zcanvas.offsetLeft
  this.offSetY = this.zcanvas.offsetTop
  let coverImg = new Image()
  coverImg.src = scratch
  let self=this;
  coverImg.onload = function () {
    self.context.drawImage(coverImg, 0, 0);
    self.context.globalCompositeOperation = 'destination-out';
  }
  this.zcanvas.addEventListener('touchstart', this._eventDown.bind(this), { passive: false });
  this.zcanvas.addEventListener('touchend', this._eventUp.bind(this), { passive: false });
  this.zcanvas.addEventListener('touchmove', this._scratch.bind(this), { passive: false });
  this.zcanvas.addEventListener('mousedown', this._eventDown.bind(this), { passive: false });
  this.zcanvas.addEventListener('mouseup', this._eventUp.bind(this), { passive: false });
  this.zcanvas.addEventListener('mousemove', this._scratch.bind(this), { passive: false });
},100)
  }
  _eventDown(e) {
    e.preventDefault();

  }
  _eventUp(e) {
    e.preventDefault();
  }
  _scratch(e){
    e.preventDefault();  
  let  loc = this.windowToCanvas(e);
				this.drawEraser(loc);
  }
  drawEraser(loc) {
    this.context.save();
    this.context.beginPath();
    this.context.arc(loc.x, loc.y, 25, 0, Math.PI * 2, false);
    this.context.clip();
    this.context.clearRect(0, 0, this.zcanvas.width, this.zcanvas.height);
    this.context.restore();
  }

  windowToCanvas(e) {
    let x = e.targetTouches[0].clientX,
      y = e.targetTouches[0].clientY,
      bbox = this.zcanvas.getBoundingClientRect();
    return {
      x: x, 
      y: y
    }
  }

  render() {
    return (
      <div className='card'>
        <canvas ref={this.canvas} width="750" height="280"></canvas>
      </div>
    );
  }
}
