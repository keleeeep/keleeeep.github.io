const resultElementAct7 = document.getElementById('resultAct7');
const startBtnAct7 = document.getElementById('startBtnAct7');
const stopBtnAct7 = document.getElementById('stopBtnAct7');

startBtnAct7.addEventListener('click', startRecordingAct7);
stopBtnAct7.addEventListener('click', stopRecordingAct7);

let recognitionAct7 = window.SpeechRecognition || window.webkitSpeechRecognition;

if (recognitionAct7) {
  recognitionAct7 = new recognitionAct7();
  recognitionAct7.continuous = true;
  recognitionAct7.interimResults = true;
  recognitionAct7.lang = 'id-ID';

  recognitionAct7.onstart = () => {
    startBtnAct7.disabled = true;
    stopBtnAct7.disabled = false;
    console.log('Recording started');
  };

  recognitionAct7.onresult = function (event) {
    let resultAct7 = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        resultAct7 += event.results[i][0].transcript + ' ';
      } else {
        resultAct7 += event.results[i][0].transcript;
      }
    }

    resultElementAct7.innerText = resultAct7;

    if (resultAct7.toLowerCase().includes('stop recording')) {
      resultElementAct7.innerText = resultAct7.replace(/stop recording/gi, '');
      stopRecording();
    }
  };

  recognitionAct7.onerror = function (event) {
    startBtnAct7.disabled = false;
    stopBtnAct7.disabled = true;
    console.error('Speech recognitionAct7 error:', event.error);
  };

  recognitionAct7.onend = function () {
    startBtnAct7.disabled = false;
    stopBtnAct7.disabled = true;
    console.log('Speech recognitionAct7 ended');
  };
} else {
  console.error('Speech recognitionAct7 not supported');
}

function startRecordingAct7() {
  resultElementAct7.innerText = '';
  recognitionAct7.start();
}

function stopRecordingAct7() {
  if (recognitionAct7) {
    recognitionAct7.stop();
  }
}