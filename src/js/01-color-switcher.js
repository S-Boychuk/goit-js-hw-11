const refs = {
	startBtn: document.querySelector("[data-start]"),
	stopBtn: document.querySelector("[data-stop]"),
	bodyEl: document.body,
};

refs.startBtn.addEventListener("click", onStartBtnClick);
refs.stopBtn.addEventListener("click", onStopBtnClick);

let changeColorId = null;

function onStartBtnClick() {
	changeColorId = setInterval(() => {
		refs.bodyEl.style.backgroundColor = getRandomHexColor();
	}, 1000);
	refs.startBtn.disabled = true;
}

function onStopBtnClick() {
	clearInterval(changeColorId);
	refs.startBtn.disabled = false;
}

function getRandomHexColor() {
	return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
