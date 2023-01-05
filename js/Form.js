const COUNTRY_API_URL =
	'https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json';

const countrySelect = document.getElementById('country');
const stateSelect = document.getElementById('state');
const mainForm = document.getElementById('rootClass-form');

let allData = undefined;
let countryList = [];
let options;

const isEmailValid = (email) => {
	return email.match(
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);
};

const insertCountryInsideSelect = (data) => {
	for (index in data) {
		countryList.push(data[index].name);
		countrySelect.options[countrySelect.options.length] = new Option(
			data[index]['name'],
			index
		);
	}
};

const performFormValidation = () => {
	const name = document.getElementById('name');
	const dateOfBirth = document.getElementById('dateOfBirth');
	const contactNumber = document.getElementById('contactNumber');
	const country = document.getElementById('country');
	const state = document.getElementById('state');
	const yourEmail = document.getElementById('yourEmail');

	let hasErrorOccured = false;
	const result = {};

	for (let i = 0; i < options.validators.length; i++) {
		let { field, validator } = options.validators[i];
		if (field == 'name') {
			if (validator.required == true && !!!name.value) {
				result['Name'] = { error: 'Name is a required field' };
				hasErrorOccured = true;
				continue;
			}
			if (
				!(
					name.value.length >= validator.minLength &&
					name.value.length <= validator.maxLength
				)
			) {
				result['Name'] = {
					error: `Length should be between ${validator.minLength} to ${validator.maxLength}`,
				};
				hasErrorOccured = true;
				continue;
			}
		}
		if (field == 'dateOfBirth') {
			if (validator.required == true && !!!dateOfBirth.value) {
				result['Date of Birth'] = { error: 'Date of Birth is a required field' };
				hasErrorOccured = true;
				continue;
			}
		}
		if (field == 'contactNumber') {
			if (validator.required == true && !!!contactNumber.value) {
				result['Contact Number'] = { error: 'Contact Number is a required field' };
				hasErrorOccured = true;
				continue;
			}
			if (
				!!contactNumber.value &&
				!(
					contactNumber.value.length >= validator.minLength &&
					contactNumber.value.length <= validator.maxLength
				)
			) {
				result['Contact Number'] = {
					error: `Length should be of ${validator.maxLength} digits`,
				};
				hasErrorOccured = true;
				continue;
			}
		}
		if (field == 'country') {
			if (validator.required == true && !!!country.value) {
				result['Country'] = { error: 'Country is a required field' };
				hasErrorOccured = true;
				continue;
			}
		}
		if (field == 'state') {
			if (validator.required == true && !!!state.value) {
				result['State'] = { error: 'State is a required field' };
				hasErrorOccured = true;
				continue;
			}
		}
		if (field == 'yourEmail') {
			if (validator.required == true && !!!yourEmail.value) {
				result['Email'] = { error: 'Email is a required field' };
				hasErrorOccured = true;
				continue;
			}
			if (!!yourEmail.value && !isEmailValid(yourEmail.value)) {
				result['Email'] = { error: 'Email is not valid' };
				hasErrorOccured = true;
				continue;
			}
		}
	}
	return { hasErrorOccured, result };
};

const loadData = async () => {
	let data;
	try {
		data = await (await fetch(COUNTRY_API_URL)).json();
		allData = data;
		insertCountryInsideSelect(data);
		document.getElementById('helperInfo').innerText =
			'Data fetch from API completed, now country list and state list is available';
	} catch (error) {
		data = await (await fetch('../countries.json')).json();
		if (allData === undefined) {
			allData = data;
			insertCountryInsideSelect(data);
			document.getElementById('helperInfo').innerText =
				'API is not returning data, fetched data from loaded json file';
		}
	}
	stateSelect.setAttribute('disabled', 'enabled');
};

const getValidatorDataFromParent = (event) => {
	options = event.data;
};

const sendDataToParent = (event) => {
	event.preventDefault();
	const { hasErrorOccured, result } = performFormValidation();
	if (!hasErrorOccured) window.parent.postMessage({ Success: 'All fields are valid' }, '*');
	else {
		window.parent.postMessage(result, '*');
	}
};

const updateStateAttributeOptions = () => {
	stateSelect.removeAttribute('disabled');
	for (index in allData[countrySelect.value]['states']) {
		console.log(allData[countrySelect.value]['states']);
		stateSelect.options[stateSelect.options.length] = new Option(
			allData[countrySelect.value]['states'][index]['name'],
			index
		);
	}
};

countrySelect.addEventListener('change', updateStateAttributeOptions);
mainForm.addEventListener('submit', sendDataToParent);
window.addEventListener('load', loadData);
window.addEventListener('message', getValidatorDataFromParent);
