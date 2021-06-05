/* global moment, localStorage, history Vue */

const api = require('./api')

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
			mobile: null,
			user: {
				otp: null,
				otpId: null,
				waitingForOTP: false,
				beneficiaries: [],
				captchaImage: null,
				captcha: null,
				tokenExpiry: null
			},
			// options
			autoSelectAvailableSession: false,
			playSoundWhenAvailable: false,
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
			beneficiaryIds: function () {
				return this.user.beneficiaries.map((beneficiary) => beneficiary.beneficiary_reference_id)
			},
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

					return { ...beneficiary, dose, age }
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
			autoSelectAvailableSession: function (value) {
				if (value) localStorage.setItem('autoSelectAvailableSession', value)
				else localStorage.removeItem('autoSelectAvailableSession')
			},
			playSoundWhenAvailable: function (value) {
				if (value) localStorage.setItem('playSoundWhenAvailable', value)
				else localStorage.removeItem('playSoundWhenAvailable')
			}
		},
		created: async function () {
			this.setUserFromStorage()

			this.setFiltersFromURL()
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
				this.token = null
			},
			setUserFromStorage: function () {
				this.authenticatedAt = localStorage.getItem('authenticatedAt')
				this.token = localStorage.getItem('token')
				this.mobile = localStorage.getItem('mobile')

				this.autoSelectAvailableSession = localStorage.getItem('autoSelectAvailableSession')
				this.playSoundWhenAvailable = localStorage.getItem('playSoundWhenAvailable')

				if (this.isAuthenticated) this.getBeneficiaries()
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
			setFiltersFromURL: function () {
				const urlParams = new URLSearchParams(window.location.search)

				for (const filter in this.filters) {
					if (urlParams && urlParams.get(filter)) {
						this.filters[filter] = urlParams.get(filter)
						if (filter === 'state_id') this.getDistricts()
					}
				}
			},
			calculateDate: function (index) {
				return (moment().add(index, 'days'))
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

				if (json.error) this.otpError = json.error
				else {
					this.token = json.token
					this.user.waitingForOTP = false
					this.user.otp = null

					this.updateTokenExpiry()

					await this.getBeneficiaries()
				}
			},
			getBeneficiaries: async function () {
				const json = await api.getBeneficiaries(this.token)

				this.user.beneficiaries = json.beneficiaries

				// auto select all beneficiaries
				this.selectedBeneficiaries = this.beneficiaryIds
			},
			getCaptcha: async function () {
				const json = await api.getCaptcha(this.token)

				this.user.captchaImage = json.captcha
			}
		}
	})
})
