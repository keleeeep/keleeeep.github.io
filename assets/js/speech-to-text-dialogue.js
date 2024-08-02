const resultElementDialogue = document.getElementById('resultDialogue');
const startBtnDialogue = document.getElementById('startBtnDialogue');
const stopBtnDialogue = document.getElementById('stopBtnDialogue');

startBtnDialogue.addEventListener('click', startRecordingDialogue);
stopBtnDialogue.addEventListener('click', stopRecordingDialogue);

let recognitionDialogue = window.SpeechRecognition || window.webkitSpeechRecognition;

if (recognitionDialogue) {
  recognitionDialogue = new recognitionDialogue();
  recognitionDialogue.continuous = true;
  recognitionDialogue.interimResults = false;
  recognitionDialogue.lang = 'id-ID';

  recognitionDialogue.onstart = () => {
    startBtnDialogue.disabled = true;
    stopBtnDialogue.disabled = false;
    console.log('Recording started');
  };

  recognitionDialogue.onresult = function (event) {
    let resultDialogue = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        resultDialogue += event.results[i][0].transcript + ' ';
      } else {
        resultDialogue += event.results[i][0].transcript;
      }
    }

    finalResultDialogue = resultElementDialogue.innerText + resultDialogue

    resultElementDialogue.innerText = finalResultDialogue + '\n';

    if (resultDialogue.toLowerCase().includes('stop recording')) {
      resultElementDialogue.innerText = resultDialogue.replace(/stop recording/gi, '');
      stopRecording();
    }
  };

  recognitionDialogue.onerror = function (event) {
    startBtnDialogue.disabled = false;
    stopBtnDialogue.disabled = true;
    console.error('Speech recognitionDialogue error:', event.error);
  };

  recognitionDialogue.onend = function () {
    startBtnDialogue.disabled = false;
    stopBtnDialogue.disabled = true;
    console.log('Speech recognitionDialogue ended');
  };
} else {
  console.error('Speech recognitionDialogue not supported');
}

function startRecordingDialogue() {
  recognitionDialogue.start();
  resultElementDialogue.innerText = '';
}

function stopRecordingDialogue() {
  if (recognitionDialogue) {
    recognitionDialogue.stop();
  }
}
