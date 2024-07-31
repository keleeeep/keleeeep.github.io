const resultElementAct4 = document.getElementById('resultAct4');
const startBtnAct4 = document.getElementById('startBtnAct4');
const stopBtnAct4 = document.getElementById('stopBtnAct4');

startBtnAct4.addEventListener('click', startRecordingAct4);
stopBtnAct4.addEventListener('click', stopRecordingAct4);

let recognitionAct4 = window.SpeechRecognition || window.webkitSpeechRecognition;

if (recognitionAct4) {
  recognitionAct4 = new recognitionAct4();
  recognitionAct4.continuous = true;
  recognitionAct4.interimResults = true;
  recognitionAct4.lang = 'id-ID';

  recognitionAct4.onstart = () => {
    startBtnAct4.disabled = true;
    stopBtnAct4.disabled = false;
    console.log('Recording started');
  };

  recognitionAct4.onresult = function (event) {
    let resultAct4 = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        resultAct4 += event.results[i][0].transcript + ' ';
      } else {
        resultAct4 += event.results[i][0].transcript;
      }
    }

    resultElementAct4.innerText = resultAct4;

    if (resultAct4.toLowerCase().includes('stop recording')) {
      resultElementAct4.innerText = resultAct4.replace(/stop recording/gi, '');
      stopRecording();
    }
  };

  recognitionAct4.onerror = function (event) {
    startBtnAct4.disabled = false;
    stopBtnAct4.disabled = true;
    console.error('Speech recognitionAct4 error:', event.error);
  };

  recognitionAct4.onend = function () {
    startBtnAct4.disabled = false;
    stopBtnAct4.disabled = true;
    console.log('Speech recognitionAct4 ended');
  };
} else {
  console.error('Speech recognitionAct4 not supported');
}

function startRecordingAct4() {
  resultElementAct4.innerText = '';
  recognitionAct4.start();
}

function stopRecordingAct4() {
  if (recognitionAct4) {
    recognitionAct4.stop();
  }
}