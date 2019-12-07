const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const file = document.getElementById('audioFile');
const audio = document.getElementById('audio');

// const playMusic = () => {
//   audio.play();
//   const context = new AudioContext();
//   const src = context.createMediaElementSource(audio);
//   const analyser = context.createAnalyser();
//   src.connect(analyser);
//   analyser.connect(context.destination);
// }

// file.addEventListener('change', playMusic);


const audioCtx = new AudioContext();
const analyser = audioCtx.createAnalyser();


const audioFile = new Audio();
audioFile.src = './music/cat.mp3';
audioFile.autoplay = true;
const audioSourceNode = audioCtx.createMediaElementSource(audioFile);


const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);
audioSourceNode.connect(analyser)
analyser.connect(audioCtx.destination);

context.clearRect(0, 0, canvasWidth, canvasHeight);

const drawBoombox = () => {
  const drawVisual = requestAnimationFrame(drawBoombox);

  analyser.getByteFrequencyData(dataArray);

  context.fillStyle = 'rgb(0, 0, 0)';
  context.fillRect(0, 0, canvasWidth, canvasHeight);

  const barWidth = 50;
  const barHeight = 50;
  let x = 5;
  const position = {
    x: 10,
    y: 10
  };

  for (let i = 1; i < 144; i++) {
    context.fillStyle = 'hsl(' + (i * 5) + ',' + (dataArray[i]) +'%' + ', 50%)';

    if (i === 16) context.fillRect(position.x, position.y, barWidth, barHeight);

    if (i % 16 === 0) {
      position.y = position.y + barHeight + 5;
      position.x = 10;
    };

    context.fillRect(position.x, position.y, barWidth, barHeight);
    position.x += barWidth + 5;
  };
};

drawBoombox();
