const resultElementAct2 = document.getElementById('resultAct2');
const startBtnAct2 = document.getElementById('startBtnAct2');
const stopBtnAct2A= document.getElementById('stopBtnAct2');

startBtnAct2.addEventListener('click', startRecordingAct2);
stopBtnAct2.addEventListener('click', stopRecordingAct2);

let recognitionAct2 = window.SpeechRecognition || window.webkitSpeechRecognition;

if (recognitionAct2) {
  recognitionAct2 = new recognitionAct2();
  recognitionAct2.continuous = true;
  recognitionAct2.interimResults = true;
  recognitionAct2.lang = 'id-ID';

  recognitionAct2.onstart = () => {
    startBtnAct2.disabled = true;
    stopBtnAct2.disabled = false;
    console.log('Recording started');
  };

  recognitionAct2.onresult = function (event) {
    let resultAct2 = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        resultAct2 += event.results[i][0].transcript + ' ';
      } else {
        resultAct2 += event.results[i][0].transcript;
      }
    }

    resultElementAct2.innerText = resultAct2;

    if (resultAct2.toLowerCase().includes('stop recording')) {
      resultElementAct2.innerText = resultAct2.replace(/stop recording/gi, '');
      stopRecording();
    }
  };

  recognitionAct2.onerror = function (event) {
    startBtnAct2.disabled = false;
    stopBtnAct2.disabled = true;
    console.error('Speech recognitionAct2 error:', event.error);
  };

  recognitionAct2.onend = function () {
    startBtnAct2.disabled = false;
    stopBtnAct2.disabled = true;
    console.log('Speech recognitionAct2 ended');
  };
} else {
  console.error('Speech recognitionAct2 not supported');
}

function startRecordingAct2() {
  resultElementAct2.innerText = '';
  recognitionAct2.start();
}

function stopRecordingAct2() {
  if (recognitionAct2) {
    recognitionAct2.stop();
  }
}