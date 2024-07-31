const resultElementAct1 = document.getElementById('resultAct1');
const startBtnAct1 = document.getElementById('startBtnAct1');
const stopBtnAct1A= document.getElementById('stopBtnAct1');

startBtnAct1.addEventListener('click', startRecordingAct1);
stopBtnAct1.addEventListener('click', stopRecordingAct1);

let recognitionAct1 = window.SpeechRecognition || window.webkitSpeechRecognition;

if (recognitionAct1) {
  recognitionAct1 = new recognitionAct1();
  recognitionAct1.continuous = true;
  recognitionAct1.interimResults = true;
  recognitionAct1.lang = 'id-ID';

  recognitionAct1.onstart = () => {
    startBtnAct1.disabled = true;
    stopBtnAct1.disabled = false;
    console.log('Recording started');
  };

  recognitionAct1.onresult = function (event) {
    let resultAct1 = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        resultAct1 += event.results[i][0].transcript + ' ';
      } else {
        resultAct1 += event.results[i][0].transcript;
      }
    }

    resultElementAct1.innerText = resultAct1;

    if (resultAct1.toLowerCase().includes('stop recording')) {
      resultElementAct1.innerText = resultAct1.replace(/stop recording/gi, '');
      stopRecording();
    }
  };

  recognitionAct1.onerror = function (event) {
    startBtnAct1.disabled = false;
    stopBtnAct1.disabled = true;
    console.error('Speech recognitionAct1 error:', event.error);
  };

  recognitionAct1.onend = function () {
    startBtnAct1.disabled = false;
    stopBtnAct1.disabled = true;
    console.log('Speech recognitionAct1 ended');
  };
} else {
  console.error('Speech recognitionAct1 not supported');
}

function startRecordingAct1() {
  resultElementAct1.innerText = '';
  recognitionAct1.start();
}

function stopRecordingAct1() {
  if (recognitionAct1) {
    recognitionAct1.stop();
  }
}