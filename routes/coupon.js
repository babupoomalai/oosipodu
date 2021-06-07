var express = require('express');

const couponService = require('../src/service/CouponService');

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

/* GET users listing. */
router.get('/get', function (req, res, next) {
	console.log("inside getCoupon");
	couponService.getCoupons().then(coupons => {
		res.send(coupons);
	});
});

module.exports = router;
