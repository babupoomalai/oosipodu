exports.getUserDetail = function (mobile) {
	fetch("http://localhost:3000/userAPI")
		.then(res => res.text())
		.then(function (res) {
			console.log("res: " + JSON.stringify(res));
			return res;
		})
		.catch(err => err);
}
