// import jquery from "jquery";
// export default (window.$ = window.jQuery = jquery);

const baseURL = 'https://cdn-api.co-vin.in/api/v2'


const sha256 = async function (message) {
	const msgUint8 = new TextEncoder().encode(message)
	const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
	const hashArray = Array.from(new Uint8Array(hashBuffer))
	const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
	return hashHex
}


exports.sendOTP = async function (mobile) {
	// const mobile = $('#mobileNo').val();
	$('#alert').text('OTP successfully sent to ' + mobile);
	$('#alertPanel').removeAttr('style');
	$('#validatePanel').removeAttr('style');
	return fetch(`${baseURL}/auth/generateMobileOTP`, {
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			mobile,
			secret: 'U2FsdGVkX19mD56KTNfQsZgXJMwOG7u/6tuj0Qvil1LEjx783oxHXGUTDWYm+XMYVGXPeu+a24sl5ndEKcLTUQ=='
		})
	})
}

exports.validateOTP = async function (id, otp) {
	const response = await fetch(`${baseURL}/auth/validateMobileOtp`, {
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			txnId: id,
			otp: CryptoJS.SHA256(otp).toString()
			// otp: await sha256(otp)
		})
	})

	return response.json()
}

exports.getBeneficiaries = async function (token) {
	const response = await fetch(`${baseURL}/appointment/beneficiaries`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	})

	return response.json()
}

exports.getCaptcha = async function (token) {
	const response = await fetch(`${baseURL}/auth/getRecaptcha`, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({})
	})

	return response.json()
}

