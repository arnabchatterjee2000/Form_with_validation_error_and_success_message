const option = {
	validators: [
		{ field: 'name', validator: { required: true, minLength: 4, maxLength: 10 } },
		{ field: 'dateOfBirth', validator: { required: false } },
		{ field: 'contactNumber', validator: { required: false, minLength: 10, maxLength: 10 } },
		{ field: 'country', validator: { required: true } },
		{ field: 'state', validator: { required: true } },
		{ field: 'yourEmail', validator: { required: false } },
	],
};
const sendBtn = document.getElementById('sendBtn');
const innerChildMessage = document.getElementById('innerChildMessage');

const sendMessage = () => {
	const iframe = document.getElementById('iframe');
	iframe.contentWindow.postMessage(option, '*');
};

window.onload = () => {
	sendMessage();
};

window.addEventListener('message', function (event) {
	document.getElementById('innerChildMessage').innerHTML = `Result: ${JSON.stringify(event.data)}`;
});
