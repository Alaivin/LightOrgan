const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const scale = 50;

const drawGrid = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  for (let i = 0; i <= canvas.width; i+= scale) {
    context.moveTo(i, 0);
    context.lineTo(i, canvas.height);
  }
  for (let i = 0; i <= canvas.height; i+= scale) {
    context.moveTo(0, i);
    context.lineTo(canvas.width, i);
  }
context.stroke();
}
drawGrid();