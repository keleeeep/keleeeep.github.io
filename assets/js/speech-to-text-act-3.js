const resultElementAct3 = document.getElementById('resultAct3');
const startBtnAct3 = document.getElementById('startBtnAct3');
const stopBtnAct3A= document.getElementById('stopBtnAct3');

startBtnAct3.addEventListener('click', startRecordingAct3);
stopBtnAct3.addEventListener('click', stopRecordingAct3);

let recognitionAct3 = window.SpeechRecognition || window.webkitSpeechRecognition;

if (recognitionAct3) {
  recognitionAct3 = new recognitionAct3();
  recognitionAct3.continuous = true;
  recognitionAct3.interimResults = true;
  recognitionAct3.lang = 'id-ID';

  recognitionAct3.onstart = () => {
    startBtnAct3.disabled = true;
    stopBtnAct3.disabled = false;
    console.log('Recording started');
  };

  recognitionAct3.onresult = function (event) {
    let resultAct3 = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        resultAct3 += event.results[i][0].transcript + ' ';
      } else {
        resultAct3 += event.results[i][0].transcript;
      }
    }

    resultElementAct3.innerText = resultAct3;

    if (resultAct3.toLowerCase().includes('stop recording')) {
      resultElementAct3.innerText = resultAct3.replace(/stop recording/gi, '');
      stopRecording();
    }
  };

  recognitionAct3.onerror = function (event) {
    startBtnAct3.disabled = false;
    stopBtnAct3.disabled = true;
    console.error('Speech recognitionAct3 error:', event.error);
  };

  recognitionAct3.onend = function () {
    startBtnAct3.disabled = false;
    stopBtnAct3.disabled = true;
    console.log('Speech recognitionAct3 ended');
  };
} else {
  console.error('Speech recognitionAct3 not supported');
}

function startRecordingAct3() {
  resultElementAct3.innerText = '';
  recognitionAct3.start();
}

function stopRecordingAct3() {
  if (recognitionAct3) {
    recognitionAct3.stop();
  }
}