const _ = require('underscore');

const dbutil = require('../database/dbutil');

exports.getCoupons = async function (store) {
	let query = `SELECT * from coupon where valid_till >= NOW() AND active = 1 `;
	if (!_.isEmpty(store)) {
		query += ` AND store='${store}'`
	}
	const couponList = await dbutil.query(query);
	// console.log(`insider getCoupons: ${couponList} ${query}`);
	if (!!couponList && couponList.length > 0) {
		return couponList;
	}
	return null;
}

