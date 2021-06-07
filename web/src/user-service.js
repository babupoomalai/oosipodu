import axios from "axios"

const _ = require('underscore');

const axiosInstance = axios.create({
	// baseURL: 'http://localhost:' + (process.env.PORT || 3000) + '/api/',
	baseURL: 'api/',
	/* other custom settings */
});

exports.getUserDetail =
	async function (mobile) {
		axiosInstance.interceptors.request.use(config => {
			// perform a task before the request is sent
			// console.log('Request was sent');

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

exports.updateBeneficiaries = async (userId, beneficiaries) => {
	const result = await axiosInstance({
		method: 'post',
		url: 'users/updateBeneficiaries',
		data: {
			userId: userId,
			beneficiaries: beneficiaries
		}
	});
	if (result && result.status === 200) {
		return true;
	} else {
		return false;
	}
}

exports.getCoupons =
	async function (store) {
		axiosInstance.interceptors.request.use(config => {
			// perform a task before the request is sent
			// console.log('Request was sent');

			return config;
		}, error => {
			// handle the error
			return Promise.reject(error);
		});
		let url = "coupons/get";
		if (!_.isEmpty(store)) {
			url += "?store=" + store;
		}
		const result = await axiosInstance.get(url);
		// console.log("getUserDetail: " + result);
		if (_.isEmpty(result.data)) {
			return null;
		} else {
			return result.data;
		}
	}
