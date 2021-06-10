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
		// console.log("Found user: " + JSON.stringify(user))
		res.send(user);
	});
})

router.post("/addUser", function (req, res, next) {
	console.log(`inside addUser: ${JSON.stringify(req.body)}`)
	if (!req.body || !req.body.mobile) {
		res.status(422);
		res.render('error', {error: "Bad input"})
	}
	userService.addUser(req.body.mobile, req.body.beneficiaries).then(() => {
		res.end("success")
	})
})

router.post("/updateBeneficiaries", function (req, res, next) {
	console.log(`inside updateBeneficiaries: ${JSON.stringify(req.body)}`)
	if (!req.body || !req.body.userId) {
		res.status(422);
		res.render('error', {error: "Bad input"})
	}
	userService.updateBeneficiaries(req.body.beneficiaries, req.body.userId).then(() => {
		res.end("success")
	})
})

router.post("/optIn", function (req, res, next) {
	console.log(`inside optIn: ${JSON.stringify(req.body)}`)
	if (!req.body || !req.body.mobile) {
		res.status(422);
		res.render('error', {error: "Bad input"})
	}
	userService.optIn(req.body.mobile, req.body.isIn).then(() => {
		res.status(200)
	})
})


module.exports = router;
