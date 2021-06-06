var express = require('express');
const userService = require("../src/service/UserService");

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

router.get("/getDetail", function (req, res, next) {
	console.log("inside getDetail");
	if (!req.query || !req.query.mobile) {
		res.status(422);
		res.render('error', {error: "Bad input"})
	}
	userService.getUser(req.query.mobile).then(user => {
		console.log("Found user: " + JSON.stringify(user))
		res.send(user);
	});
})

router.post("/addUser", function (req, res, next) {
	if (!req.query || !req.query.mobile) {
		res.status(422);
		res.render('error', {error: err})
	}
	userService.addUser(req.query.mobile, req.query.beneficiaries);
})


module.exports = router;
