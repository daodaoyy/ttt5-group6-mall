import axios from 'axios';

export const manageApi = (url, data, options = {}) => {
	const newOptions = Object.assign({}, options);
	newOptions.url = `/manageapi?_csrf=${window._csrf}`;
	newOptions.method = newOptions.method ? newOptions.method : 'GET';
	if (newOptions.method !== 'GET') {
		newOptions.data = {
			url,
			data: data || {},
		};
	} else {
		newOptions.params = {
			url,
			data: data || {},
		}
	};
	return axios(newOptions);
};

export const manageFormApi = (data) => {
	const options = {};
	options.url = `/manageFormApi?_csrf=${window._csrf}`;
	options.headers = data.headers;
	options.method = data, method;
	options.data = { data };
	return axios(options);
}