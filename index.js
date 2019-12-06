const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const scale = 50;
const file = document.getElementById('audioFile');
const audio = document.getElementById('audio');

const playMusic = () => {
  audio.play();
  const context = new AudioContext();
  const src = context.createMediaElementSource(audio);
  const analyser = context.createAnalyser();
  src.connect(analyser);
  analyser.connect(context.destination);
}

file.addEventListener('change', playMusic);

const drawGrid = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  for (let i = 0; i <= canvas.width; i+= scale) {
    context.moveTo(i, 0);
    context.lineTo(i, canvas.height);
  };
  for (let i = 0; i <= canvas.height; i+= scale) {
    context.moveTo(0, i);
    context.lineTo(canvas.width, i);
  };
context.stroke();
};

drawGrid();