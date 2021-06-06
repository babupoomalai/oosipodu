const _ = require('underscore');

const dbutil = require('../database/dbutil');

exports.addUser = async function (user, beneficiaries) {
	if (!user || !beneficiaries) {
		return null;
	}
	const vaccinatedPerson = _.find(beneficiaries, person => !!person.dose1_date || !!person.dose2_date);
	if (!vaccinatedPerson) {
		return null;
	}
	// console.log("mob: " + user.mobile);
	let dbUser = getUser(user.mobile);
	if (!dbUser) {
		await dbutil.query(`INSERT INTO user(name, mobile) values(?, ?)`, [vaccinatedPerson.name, user.mobile]);
		dbUser = getUser(user.mobile);
		if (dbUser) {
			for(const person of beneficiaries) {

			}
		}
	} else {
		console.log("User exists: " + mobile);
	}
	return false;
}

exports.getUser = async function (mobile) {
	console.log(`insider UserService getUser 0 ${mobile}`);
	if (!mobile) {
		return null;
	}

	const dbUserList = await dbutil.query(`SELECT * from user where mobile = '${mobile}'`);
	console.log("insider UserService getUser: " + dbUserList === null);
	if (!!dbUserList && dbUserList.length > 0) {
		return dbUserList[0];
	}
	return null;
}

