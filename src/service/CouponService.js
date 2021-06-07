const _ = require('underscore');

const dbutil = require('../database/dbutil');

exports.getCoupons = async function () {
	const couponList = await dbutil.query(`SELECT * from coupon where valid_till >= NOW();`);
	console.log("insider getCoupons");
	if (!!couponList && couponList.length > 0) {
		return couponList;
	}
	return null;
}

