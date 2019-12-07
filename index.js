const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const audio = document.getElementById('audio');

const audioCtx = new AudioContext();
const analyser = audioCtx.createAnalyser();
const audioSourceNode = audioCtx.createMediaElementSource(audio);
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);
audioSourceNode.connect(analyser)
analyser.connect(audioCtx.destination);

const drawBoombox = () => {
  const drawVisual = requestAnimationFrame(drawBoombox);

  analyser.getByteFrequencyData(dataArray);

  context.fillStyle = 'rgb(0, 0, 0)';
  context.fillRect(0, 0, canvasWidth, canvasHeight);
  
  const barData = {
    positionX: 5,
    positionY: 5,
    width: 50,
    height: 50,
    gap: 5
  }

  for (let i = 1; i < 144; i++) {
    context.fillStyle = 'hsl(' + (i * 5) + ',' + dataArray[i] +'%' + ', 50%)';

    if (i === 16) {
      context.fillRect(barData.positionX, barData.positionY, barData.width, barData.height);
    }

    if (i % 16 === 0) {
      barData.positionY = barData.positionY + barData.height + barData.gap;
      barData.positionX = barData.gap;
    };

    context.fillRect(barData.positionX, barData.positionY, barData.width, barData.height);
    barData.positionX += barData.width + barData.gap;
  };
};

drawBoombox();
