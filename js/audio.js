
function audioPlay() {
	nwaSelect('body').classList.add('audioPlay');
	nwaSelect('body footer button#autoScroll').classList.add('nwaActive');
	nwaSelect('body footer audio').play();
}

function audioPouse() {
	nwaSelect('body').classList.remove('audioPlay');
	nwaSelect('body footer button#autoScroll').classList.remove('nwaActive');
	nwaSelect('footer audio').pause();
}

function audioChangeCurrentTime() {
	nwaSelect('footer audio').currentTime = nwaSelect('footer input[type="range"]').value;
}

function audioProgressValue() {
	nwaSelect('footer input[type="range"]').max = nwaSelect('footer audio').duration;
	nwaSelect('footer input[type="range"]').value = nwaSelect('footer audio').currentTime;
}

setInterval(audioProgressValue, 1000);

function audioOnEnded() {
	audioPouse();
}
