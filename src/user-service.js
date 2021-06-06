import axios from "axios"

const _ = require('underscore');

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000',
	/* other custom settings */
});

exports.getEvents = async function () {
	let res = await axios.get("http://localhost:3000/userAPI");
	return res.data;
}
exports.getUserDetail =
	async function (mobile) {
		axiosInstance.interceptors.request.use(config => {
			// perform a task before the request is sent
			console.log('Request was sent');

			return config;
		}, error => {
			// handle the error
			return Promise.reject(error);
		});
		const result = await axiosInstance.get("users/getDetail?mobile=" + mobile);
		// console.log("getUserDetail: " + result);
		if (_.isEmpty(result.data)) {
			return null;
		} else {
			return result.data;
		}
	}

exports.addUser = async (mobile, beneficiaries) => {
	const result = await axiosInstance({
		method: 'post',
		url: 'users/addUser',
		data: {
			mobile: mobile,
			beneficiaries: beneficiaries
		}
	});
	if (result && result.status === 200) {
		return true;
	} else {
		return false;
	}
}
