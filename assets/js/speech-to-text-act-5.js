const resultElementAct5 = document.getElementById('resultAct5');
const startBtnAct5 = document.getElementById('startBtnAct5');
const stopBtnAct5 = document.getElementById('stopBtnAct5');

startBtnAct5.addEventListener('click', startRecordingAct5);
stopBtnAct5.addEventListener('click', stopRecordingAct5);

let recognitionAct5 = window.SpeechRecognition || window.webkitSpeechRecognition;

if (recognitionAct5) {
  recognitionAct5 = new recognitionAct5();
  recognitionAct5.continuous = true;
  recognitionAct5.interimResults = true;
  recognitionAct5.lang = 'id-ID';

  recognitionAct5.onstart = () => {
    startBtnAct5.disabled = true;
    stopBtnAct5.disabled = false;
    console.log('Recording started');
  };

  recognitionAct5.onresult = function (event) {
    let resultAct5 = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        resultAct5 += event.results[i][0].transcript + ' ';
      } else {
        resultAct5 += event.results[i][0].transcript;
      }
    }

    resultElementAct5.innerText = resultAct5;

    if (resultAct5.toLowerCase().includes('stop recording')) {
      resultElementAct5.innerText = resultAct5.replace(/stop recording/gi, '');
      stopRecording();
    }
  };

  recognitionAct5.onerror = function (event) {
    startBtnAct5.disabled = false;
    stopBtnAct5.disabled = true;
    console.error('Speech recognitionAct5 error:', event.error);
  };

  recognitionAct5.onend = function () {
    startBtnAct5.disabled = false;
    stopBtnAct5.disabled = true;
    console.log('Speech recognitionAct5 ended');
  };
} else {
  console.error('Speech recognitionAct5 not supported');
}

function startRecordingAct5() {
  resultElementAct5.innerText = '';
  recognitionAct5.start();
}

function stopRecordingAct5() {
  if (recognitionAct5) {
    recognitionAct5.stop();
  }
}