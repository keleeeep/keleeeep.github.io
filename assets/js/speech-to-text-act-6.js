const resultElementAct6 = document.getElementById('resultAct6');
const startBtnAct6 = document.getElementById('startBtnAct6');
const stopBtnAct6 = document.getElementById('stopBtnAct6');

startBtnAct6.addEventListener('click', startRecordingAct6);
stopBtnAct6.addEventListener('click', stopRecordingAct6);

let recognitionAct6 = window.SpeechRecognition || window.webkitSpeechRecognition;

if (recognitionAct6) {
  recognitionAct6 = new recognitionAct6();
  recognitionAct6.continuous = true;
  recognitionAct6.interimResults = false;
  recognitionAct6.lang = 'id-ID';

  recognitionAct6.onstart = () => {
    startBtnAct6.disabled = true;
    stopBtnAct6.disabled = false;
    console.log('Recording started');
  };

  recognitionAct6.onresult = function (event) {
    let resultAct6 = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        resultAct6 += event.results[i][0].transcript + ' ';
      } else {
        resultAct6 += event.results[i][0].transcript;
      }
    }

    finalResultAct6 = resultElementAct6.innerText + resultAct6

    resultElementAct6.innerText = finalResultAct6 + '\n';

    if (resultAct6.toLowerCase().includes('stop recording')) {
      resultElementAct6.innerText = resultAct6.replace(/stop recording/gi, '');
      stopRecording();
    }
  };

  recognitionAct6.onerror = function (event) {
    startBtnAct6.disabled = false;
    stopBtnAct6.disabled = true;
    console.error('Speech recognitionAct6 error:', event.error);
  };

  recognitionAct6.onend = function () {
    startBtnAct6.disabled = false;
    stopBtnAct6.disabled = true;
    console.log('Speech recognitionAct6 ended');
  };
} else {
  console.error('Speech recognitionAct6 not supported');
}

function startRecordingAct6() {
  recognitionAct6.start();
  resultElementAct6.innerText = '';
}

function stopRecordingAct6() {
  if (recognitionAct6) {
    recognitionAct6.stop();
  }
}
