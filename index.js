const submitBoomboxSizeButton = document.querySelector('.submit');
const widthBarsInput = document.getElementById('width-number');
const heightBarsInput = document.getElementById('height-number');
const minColorInput = document.getElementById('min-color');
const maxColorInput = document.getElementById('max-color');
const boomboxSizeElement = document.getElementsByClassName('boombox-size')[0];
const errorBox = document.getElementsByClassName('error-box')[0];
const controlsWrapper = document.getElementsByClassName('controls-wrapper')[0];
const sliders = [...document.getElementsByClassName('slider')];

sliders.forEach(slider => {
    slider.addEventListener('change', event => {
      const { value, name } = event.target;
      const element = document.getElementById(name);
      element.textContent = value;
    })
  }
)

const getBarsNumbersValid = (widthNumber, heightNumber, minColor, maxColor) => Number.isInteger(widthNumber) && Number.isInteger(heightNumber) && widthNumber > 4 && widthNumber < 21 && heightNumber > 4 && heightNumber < 21 && maxColor > minColor;

const generateRandomColor = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;


submitBoomboxSizeButton.addEventListener('click', event => {
  event.preventDefault();
  const widthNumber = Number(widthBarsInput.value);
  const heightNumber = Number(heightBarsInput.value);
  const minColor = Number(minColorInput.value);
  const maxColor = Number(maxColorInput.value);
  const isBarsNumbersValid = getBarsNumbersValid(widthNumber, heightNumber, minColor, maxColor);
  if (isBarsNumbersValid) {
    boomboxSizeElement.classList.add("disable");
    errorBox.classList.add('disable');
    controlsWrapper.classList.remove('disable');
    renderBoombox(widthNumber, heightNumber, minColor, maxColor);
  } else {
    errorBox.classList.remove('disable');
  };
});


const renderBoombox = (widthNumber, heightNumber, minColor, maxColor) => {
  const canvas = document.querySelector('canvas');
  const context = canvas.getContext('2d');
  canvas.width = widthNumber * 50 + widthNumber * 5 + 5;
  canvas.height = heightNumber * 50 + heightNumber * 5 + 5;

  const audio = document.getElementById('audio');

  const audioCtx = new AudioContext();
  const analyser = audioCtx.createAnalyser();
  const audioSourceNode = audioCtx.createMediaElementSource(audio);

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  audioSourceNode.connect(analyser);
  analyser.connect(audioCtx.destination);

  const totalBarsNumber = widthNumber * heightNumber;

  const drawBoombox = () => {
    const drawVisual = requestAnimationFrame(drawBoombox);

    analyser.getByteFrequencyData(dataArray);

    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    const barData = {
      positionX: 5,
      positionY: 5,
      width: 50,
      height: 50,
      gap: 5
    };

    const color = generateRandomColor(minColor, maxColor)

    for (let i = 1; i < totalBarsNumber; i++) {
      context.fillStyle = 'hsl(' + color + ',' + dataArray[i] +'%' + ', 50%)';

      if (i === widthNumber) {
        context.fillRect(barData.positionX, barData.positionY, barData.width, barData.height);
      };

      if (i % widthNumber === 0) {
        barData.positionY = barData.positionY + barData.height + barData.gap;
        barData.positionX = barData.gap;
      };

      context.fillRect(barData.positionX, barData.positionY, barData.width, barData.height);
      barData.positionX += barData.width + barData.gap;
    };
  };

  drawBoombox();
}
