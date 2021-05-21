const WIDTH = 600;
const HEIGHT = 200;
const DPI_WIDTH = WIDTH * 2;
const DPI_HEIGHT = HEIGHT * 2;

export default (document) => {
    
    const canvas = document.getElementById('canvas-plot');
    const ctx = canvas.getContext('2d');

    canvas.style.width = WIDTH + 'px';
    canvas.style.height = HEIGHT + 'px';
    canvas.width = DPI_WIDTH + 'px';
    canvas.height = DPI_HEIGHT + 'px';

    ctx.beginPath();
    ctx.lineTo(200,300);
    ctx.lineTo(150,300);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
ctx.rect(20, 20, 150, 100);
ctx.fillStyle = "red";
ctx.fill();

ctx.beginPath();
ctx.rect(40, 40, 150, 100);
ctx.fillStyle = "blue";
ctx.fill();
}
