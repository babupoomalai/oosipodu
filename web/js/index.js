/* global moment, localStorage, history Vue */

const _ = require('underscore');
const download = require('./download');

const api = require('./api');
const userService = require("../src/user-service")
import html2canvas from "html2canvas"


function resetUser() {
	return {
		otp: null,
		otpId: null,
		waitingForOTP: false,
		beneficiaries: [],
		captchaImage: null,
		captcha: null,
		tokenExpiry: null,
		name: ""
	};
}

document.addEventListener('DOMContentLoaded', function () {
	const app = new Vue({
		el: '#app',
		data: {
			// selected
			selectedSession: null,
			selectedBeneficiaries: [],
			updatedAt: null,
			authenticatedAt: null,
			token: null,
			finishedProcess: false,
			mobile: null,
			user: resetUser(),
			coupons: null,
			// options
			// error success messages
			scheduleSuccess: null,
			scheduleError: null,
			otpError: null,
			sendOTPSuccess: null,
			sendOTPError: null,
			options: {
				age: ['18', '45'],
				dose: ['1', '2'],
				type: ['Free', 'Paid'],
				vaccine: ['COVISHIELD', 'COVAXIN']
			}
		},
		computed: {
			filteredCenters: function () {
				return this.centers.filter((center) => {
					let flag = true

					if (this.filters.type) flag = flag && center.fee_type === this.filters.type
					if (this.filters.age || this.filters.vaccine || this.filters.dose) flag = flag && this.checkSessions(center.sessions)

					return flag
				})
			},
			isAuthenticated: function () {
				return !!this.token
			},
			store: function () {
				var path = window.location.pathname;
				var page = path.split("/").pop();
				if ("kumaran.html" === page) {
					return "kumaran";
				}
				return null;
			},
			isFinishedProcess: function () {
				return this.finishedProcess;
			},
			isVaccinated: function () {
				let isVaccinated = false;
				if (!!this.user.dbUser) {
					isVaccinated = true;
				}
				if (!isVaccinated) {
					const beneficiaries = this.user.beneficiaries || [];
					isVaccinated = _.find(beneficiaries, person => !_.isEmpty(person.dose1_date) || !_.isEmpty(person.dose2_date)) != null;
				}
				if (isVaccinated) {
					setTimeout(() => {
						if (this.isOptIn()) {
							this.showOptIn();
						} else {
							this.showOptOut();
						}
					}, 1000);
				}
				return isVaccinated;
				// return this.user.dbuser.cnt > 0;
			}
			,
			beneficiaryIds: function () {
				return this.user.beneficiaries.map((beneficiary) => beneficiary.beneficiary_reference_id)
			}
			,
			beneficiaries: function () {
				return this.user.beneficiaries.map((beneficiary) => {
					let dose

					if (!!beneficiary.dose2_date) {
						dose = 2;
					} else if (!!beneficiary.dose1_date) {
						dose = 1;
					}

					const years = 2021 - beneficiary.birth_year

					let age

					if (years >= 45) age = '45+'
					else age = '18+'

					return {...beneficiary, dose, age}
				})
			}
		},
		watch: {
			token: function (value) {
				if (value) {
					localStorage.setItem('token', value)
					this.authenticatedAt = this.authenticatedAt || Date.now()
				} else {
					this.authenticatedAt = null
					localStorage.removeItem('token')
				}
			},
			authenticatedAt: function (value) {
				if (value) localStorage.setItem('authenticatedAt', value)
				else localStorage.removeItem('authenticatedAt')
			},
			mobile: function (value) {
				if (value) localStorage.setItem('mobile', value)
				else localStorage.removeItem('mobile')
			},
			selectedSession: function () {
				this.captcha = null
				this.captchaImage = null
				this.scheduleError = null
				this.scheduleSuccess = null
			},
			playSoundWhenAvailable: function (value) {
				if (value) localStorage.setItem('playSoundWhenAvailable', value)
				else localStorage.removeItem('playSoundWhenAvailable')
			}
		},
		created: async function () {
			this.setUserFromStorage()
		},
		methods: {
			updateTokenExpiry: function () {
				setInterval(() => {
					if (this.authenticatedAt) {
						const seconds = Math.floor((this.authenticatedAt - Date.now() + (15 * 60 * 1000)) / 1000)

						const minutes = Math.floor(seconds / 60)

						if (seconds <= 0) this.logout()

						if (minutes !== 0) this.user.tokenExpiry = `~${minutes}m`
						else this.user.tokenExpiry = `${seconds}s`
					}
				}, 1000)
			},
			logout: function () {
				this.token = null;
				this.user = resetUser();
				this.finishedProcess = false;
			},
			setUserFromStorage: function () {
				this.authenticatedAt = localStorage.getItem('authenticatedAt')
				this.token = localStorage.getItem('token')
				this.mobile = localStorage.getItem('mobile')

				this.autoSelectAvailableSession = localStorage.getItem('autoSelectAvailableSession')
				this.playSoundWhenAvailable = localStorage.getItem('playSoundWhenAvailable')

				if (this.isAuthenticated) this.loggedIn()
				if (this.authenticatedAt) this.updateTokenExpiry()
			},
			updateUrl: function () {
				const urlParams = new URLSearchParams()

				for (const filter in this.filters) {
					if (this.filters[filter]) urlParams.set(filter, this.filters[filter])
				}

				const url = new URL(window.location.href)
				url.search = urlParams

				history.pushState({}, null, url.href)
			},
			calculateDate: function (index) {
				return (moment().add(index, 'days'))
			},
			getImgUrl: function (coupon) {
				var images = require.context('../img/', false, /\.png$/)
				return images('./' + coupon.store + ".png");
			},
			getCouponCode: async function (coupon) {
				// console.log(coupon.coupon_code + "- code");
				coupon.text = coupon.coupon_code;
				$(`#${coupon.store}`).text(coupon.coupon_code);
				// const doc = new jsPDF();
				// const contentHtml = this.$refs.content.innerHTML;
				// doc.fromHTML(contentHtml, 15, 15, {
				// 	width: 170
				// });
				// doc.save("sample.pdf");
				html2canvas(this.$refs.kumaran(`div.card#${coupon.store}`)
					, {
						backgroundColor: '#ffffff'
					}
				).then(canvas => {
					var imgData = canvas.toDataURL("image/jpeg");
					this.fileDownload(imgData);
				})
				// htmlToImage.toPng(document.getElementById(coupon.store))
				// 	.then(function (dataUrl) {
				// 		download(dataUrl, 'my-node.png');
				// 	});
			},
			fileDownload(downloadUrl) {
				let aLink = document.createElement("a");
				aLink.style.display = "none";
				aLink.href = downloadUrl;
				aLink.download = "Monitoring Details.png";
				// Trigger click-then remove
				document.body.appendChild(aLink);
				aLink.click();
				document.body.removeChild(aLink);
			},
			sendOTP: async function () {
				const response = await api.sendOTP(this.mobile)

				if (response.ok) {
					const json = await response.json()
					this.user.otpId = json.txnId
					this.user.waitingForOTP = true
					this.sendOTPSuccess = `OTP sent successfully to ${this.mobile}`
				} else {
					this.sendOTPError = 'Failed to send OTP. Please try again'
				}
			},
			validateOTP: async function () {
				this.sendOTPSuccess = null
				this.otpError = null

				const json = await api.validateOTP(this.user.otpId, this.user.otp)

				if (json.error && json.errorCode !== 'APPOIN0001') this.otpError = json.error
				else {
					this.token = json.token
					this.user.waitingForOTP = false
					this.user.otp = null

					this.updateTokenExpiry()

					this.loggedIn();
				}
			},
			setDbUser: function (dbUser) {
				if (dbUser == null) {
					return;
				}
				this.user.dbUser = dbUser;
				this.user.name = dbUser.name;
			},
			loggedIn: async function () {
				const dbUser = await userService.getUserDetail(this.mobile);
				this.setDbUser(dbUser);
				// Existence of entry means vaccinated
				if (dbUser == null) {
					this.fetchBeneficiaries();
				} else {
					this.finishedProcess = true;
					$('#mainPanel').removeAttr('style');
					this.fetchCoupons();
				}
				if (dbUser != null) {
					this.fetchBeneficiaries(dbUser);
				}
			},
			fetchCoupons: async function () {
				if (this.isVaccinated) {
					this.coupons = await userService.getCoupons(this.store);
				}
			},
			fetchBeneficiaries: async function (dbUser) {
				const beneficiaries = await this.getBeneficiaries();
				// console.log("be: " + beneficiaries);
				if (_.isEmpty(beneficiaries)) {
					// _.find(beneficiaries, obj => )
				} else {
					if (this.isVaccinated) {
						// console.log("Person vaccinated");
						if (dbUser == null) {
							await userService.addUser(this.mobile, beneficiaries);
							dbUser = await userService.getUserDetail(this.mobile);
							this.setDbUser(dbUser);
							this.updateBeneficiaries();
							// If person newly vaccinated, mark in db
						} else if (dbUser.cnt != beneficiaries.length) {
							this.updateBeneficiaries();
						}
						this.fetchCoupons();
					}
				}
				console.log("fetchedBeneficaries")
				this.finishedProcess = true;
			},
			getBeneficiaries: async function () {
				const json = await api.getBeneficiaries(this.token)

				this.user.beneficiaries = json.beneficiaries || [];
				// auto select all beneficiaries
				this.selectedBeneficiaries = this.beneficiaryIds
				// backend.getUserDetail().then(event => console.log("ev: " + event));
				// console.log("backend: " + backend.getUserDetail());
				return this.user.beneficiaries;

			},
			updateBeneficiaries: async function () {
				if (!!this.user.dbUser) {
					await userService.updateBeneficiaries(this.user.dbUser.id, this.user.beneficiaries);
				}
			},
			getCaptcha: async function () {
				const json = await api.getCaptcha(this.token)

				this.user.captchaImage = json.captcha
			},
			showOptIn: function () {
				$('#optedOut').addClass('d-none');
				$('#optedIn').removeClass('d-none');
			},
			optIn: async function () {
				const result = await userService.optIn(this.mobile, true);
				if (result) {
					this.user.dbUser.opt_in = true;
					this.showOptIn();
				}
			},
			showOptOut: function () {
				$('#optedIn').addClass('d-none');
				$('#optedOut').removeClass('d-none');
			},
			optOut: async function () {
				const result = await userService.optIn(this.mobile, false);
				if (result) {
					this.user.dbUser.opt_in = false;
					this.showOptOut();
				}
			},
			isOptIn: function () {
				if (this.user.dbUser != null) {
					return this.user.dbUser.opt_in;
				}
				return false;
			}
		}
	})
})
