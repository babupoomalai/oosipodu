const _ = require('underscore');

const dbutil = require('../database/dbutil');

exports.addUser = async function (mobile, beneficiaries) {
	if (!mobile || !beneficiaries) {
		return null;
	}
	const vaccinatedPerson = _.find(beneficiaries, person => !!person.dose1_date || !!person.dose2_date);
	console.log(`vaccinatedPerson: ${vaccinatedPerson}`);
	if (!vaccinatedPerson) {
		return null;
	}
	// console.log("mob: " + user.mobile);
	let dbUser = await module.exports.getUser(mobile);
	console.log(`dbUser: ${dbUser}`);
	if (!dbUser) {
		await dbutil.query(`INSERT INTO user(name, mobile) values(?, ?)`, [vaccinatedPerson.name, mobile]);
		dbUser = await module.exports.getUser(mobile);
		if (dbUser) {
			await module.exports.updateBeneficiaries(beneficiaries, dbUser.id);
			return true;
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

exports.updateBeneficiaries = async function (beneficiaries, userId) {
	if (!beneficiaries || beneficiaries.length === 0) {
		return false;
	}
	let query = `INSERT INTO beneficiary(name, userId, gender, reference_id, dose1_date, dose2_date, vaccination_status) values`;
	for (const i in beneficiaries) {
		const beneficiary = beneficiaries[i];
		query += (i > 0 ? `, ` : '') + `('${beneficiary.name}', ${userId}, '${beneficiary.gender}', '${beneficiary.beneficiary_reference_id}', '${beneficiary.dose1_date}', '${beneficiary.dose2_date}', '${beneficiary.vaccination_status}')`;
	}
	query += `ON DUPLICATE KEY UPDATE dose1_date = VALUES(dose1_date), dose2_date = VALUES(dose2_date), vaccination_status = VALUES(vaccination_status)`;
	console.log(`query: ${query}`);
	await dbutil.query(query);
}

