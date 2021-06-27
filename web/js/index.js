/* global moment, localStorage, history Vue */

const _ = require('underscore');
// import {jsPDF} from "jspdf";
// const html2canvas = require('html2canvas');

const download = require('./download');

const api = require('./api');
const userService = require("../src/user-service")


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
				if ("ijmhss.html" === page) {
					return "ijmhss";
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
				$(`#${coupon.store} button.btnCoupon`).text(coupon.coupon_code);
				// const doc = new jsPDF();
				// const contentHtml = this.$refs.content.innerHTML;
				// doc.fromHTML(contentHtml, 15, 15, {
				// 	width: 170
				// });
				// doc.save("sample.pdf");
				// const $this = this;
				// html2canvas(document.querySelector(`div.card#${coupon.store}`), {
				// 	onrendered: function (canvas) {
				// 		$this.saveAs(canvas, `${coupon.store}.png`);
				// 	}
				// });
				// htmlToImage.toPng(document.getElementById(coupon.store))
				// 	.then(function (dataUrl) {
				// 		download(dataUrl, 'my-node.png');
				// 	});
			},
			fileDownload(downloadUrl, fileName) {
				let aLink = document.createElement("a");
				aLink.style.display = "none";
				aLink.href = downloadUrl;
				aLink.download = fileName;
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
			onCouponClick: function () {
				$('.btnCoupon').click(function () {
					PDFJS.getDocument(url)
						.then(function (pdf) {

							// Get div#container and cache it for later use
							var container = document.getElementById("app");

							// Loop from 1 to total_number_of_pages in PDF document
							for (var i = 1; i <= pdf.numPages; i++) {

								// Get desired page
								pdf.getPage(i).then(function (page) {

									var scale = 1.5;
									var viewport = page.getViewport(scale);
									var div = document.createElement("div");

									// Set id attribute with page-#{pdf_page_number} format
									div.setAttribute("id", "page-" + (page.pageIndex + 1));

									// This will keep positions of child elements as per our needs
									div.setAttribute("style", "position: relative");

									// Append div within div#container
									container.appendChild(div);

									// Create a new Canvas element
									var canvas = document.createElement("canvas");

									// Append Canvas within div#page-#{pdf_page_number}
									div.appendChild(canvas);

									var context = canvas.getContext('2d');
									canvas.height = viewport.height;
									canvas.width = viewport.width;

									var renderContext = {
										canvasContext: context,
										viewport: viewport
									};

									// Render PDF page
									page.render(renderContext)
										.then(function () {
											// Get text-fragments
											return page.getTextContent();
										})
										.then(function (textContent) {
											// Create div which will hold text-fragments
											var textLayerDiv = document.createElement("div");

											// Set it's class to textLayer which have required CSS styles
											textLayerDiv.setAttribute("class", "textLayer");

											// Append newly created div in `div#page-#{pdf_page_number}`
											div.appendChild(textLayerDiv);

											// Create new instance of TextLayerBuilder class
											var textLayer = new TextLayerBuilder({
												textLayerDiv: textLayerDiv,
												pageIndex: page.pageIndex,
												viewport: viewport
											});

											// Set text-fragments
											textLayer.setTextContent(textContent);

											// Render text-fragments
											textLayer.render();
										});
								});
							}
						});
				});
			},
			generateCanvas: function (elem, index, pdf, deferred, pdfX, pdfY) {
				let $this = this;

				var scrollPos = window.scrollX;
				// console.log('currentPos: ' + scrollPos);
				html2canvas(elem, {
					scrollY: -window.scrollY,
				}).then(function (canvas) {
					// scrollX: 0,
					// scrollY: -window.scrollY,
					// dpi: 300,
					// scale: 3,

					var ctx = canvas.getContext('2d'),
						a4w = 100, a4h = 257,//A4 size, 210mm x 297mm, 10 mm margin on each side, display area 190x277
						imgHeight = Math.floor(a4h * canvas.width / a4w),//Convert pixel height of one page image to A4 display scale
						renderedHeight = 0;

					while (renderedHeight < canvas.height) {
						var page = document.createElement("canvas");
						page.width = canvas.width;
						page.height = Math.min(imgHeight, canvas.height - renderedHeight);//Maybe less than one page


						//Trim the specified area with getImageData and draw it into the canvas object created earlier
						page.getContext('2d').putImageData(ctx.getImageData(0, renderedHeight, canvas.width, Math.min(imgHeight, canvas.height - renderedHeight)), 0, 0);
						//Add an image to the page with a 10 mm / 20 mm margin
						let height = Math.min(a4h, a4w * page.height / page.width);
						// pdf.setFillColor(0, 174, 239, 0);
						ctx.fillStyle = "#ffffff";
						// ctx.fillRect($this.pdfX, $this.pdfY, a4w, height, "F");
						var w1 = pdf.internal.pageSize.width;
						var h1 = pdf.internal.pageSize.height;
						// console.log(`${$this.pdfY} w:${w1} h1:${h1} h:${height}`);
						pdf.addImage(page.toDataURL('image/png', 1.0), 'PNG', $this.pdfX, $this.pdfY, a4w, height);
						$this.pdfY += height;

						renderedHeight += imgHeight;
						if (renderedHeight < canvas.height)
							pdf.addPage();//Add an empty page if there is more to follow

					}
					// console.log('currentPos: ' + scrollPos);
					// window.scrollTo(0, scrollPos);
					deferred.resolve();
				});
			},
			registerDownloadPdf: function () {
				const $this = this;

				$('.btnCoupon').click(function () {
					var deferreds = [];
					var options = {'background-color': '#FFFFFF'};
					var doc = new jsPDF('p', 'mm', 'a4');
					let cardElem = this.closest('div.card');
					let welcomePanel = $('#welcomePanel')[0];
					let header = $('#header')[0]
					let footer = $('#footer')[0]
					let divs = [header, cardElem, footer];
					$this.pdfX = 50, $this.pdfY = 5;
					// $('html,body').scrollTop(0); // Take your <div> / html at top position before calling html2canvas
					for (let i = 0; i < divs.length; i++) {
						var deferred = $.Deferred();
						deferreds.push(deferred.promise());
						let htmlElem = divs[i];
						$this.generateCanvas(htmlElem, i, doc, deferred, $this.pdfX, $this.pdfY);

					}
					$.when.apply($, deferreds).then(function () { // executes after adding all images
						doc.save(`${cardElem.getAttribute("id")}.pdf`);
					});
				});
			},
			registerCouponClick: function () {
				$('.btnCoupon').click(function () {
					return;

					console.log('downloading');
					let cardElem = this.closest('div.card');
					let app = $('#header')[0]
					const storeName = cardElem.getAttribute('id');
					// $(".card").each(function (index, element) {
					// 	if ($(element).attr('id') !== storeName) {
					// 		$(element).attr('data-html2canvas-ignore', true);
					// 	}
					// });

					html2canvas(cardElem, {
						onrendered: function (canvas) {
							// Download as pdf
							var pdf = new jsPDF('p', 'mm', 'a4');//A4 paper, portrait

							var ctx = canvas.getContext('2d'),
								a4w = 190, a4h = 257,//A4 size, 210mm x 297mm, 10 mm margin on each side, display area 190x277
								imgHeight = Math.floor(a4h * canvas.width / a4w),//Convert pixel height of one page image to A4 display scale
								renderedHeight = 0;

							var header = document.getElementById('header');
							while (renderedHeight < canvas.height) {
								var page = document.createElement("canvas");
								page.width = canvas.width;
								page.height = Math.min(imgHeight, canvas.height - renderedHeight);//Maybe less than one page

								//Trim the specified area with getImageData and draw it into the canvas object created earlier
								page.getContext('2d').putImageData(ctx.getImageData(0, renderedHeight, canvas.width, Math.min(imgHeight, canvas.height - renderedHeight)), 0, 0);
								//Add an image to the page with a 10 mm / 20 mm margin
								pdf.addImage(page.toDataURL('image/jpeg', 1.0), 'JPEG', 10, 20, a4w, Math.min(a4h, a4w * page.height / page.width));
								//Add header logo
								pdf.addImage(header, 'PNG', 5, 3);
								// pdf.text("Header", 10, 10);

								renderedHeight += imgHeight;
								if (renderedHeight < canvas.height)
									pdf.addPage();//Add an empty page if there is more to follow

								// delete page;
							}
							pdf.save('content.pdf');

							// Download as image
							// var tempcanvas = document.createElement('canvas');
							// let width = 351;
							// let height = 238;
							//
							// tempcanvas.width = width;
							// tempcanvas.height = height;
							// var context = tempcanvas.getContext('2d');
							// context.drawImage(canvas, width, 40, width, height, 0, 0, width, height);
							// var link = document.createElement("a");
							// link.href = canvas.toDataURL('image/jpg');
							// link.download = `${storeName}.jpg`;
							// link.click();
							//
							// // remove attr
							// $(".card").each(function (index, element) {
							// 	$(element).removeAttr('data-html2canvas-ignore');
							// });

						}
					});
				});
			},
			fetchCoupons: async function () {
				if (this.isVaccinated) {
					this.coupons = await userService.getCoupons(this.store);
				}
				this.registerDownloadPdf();
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
			},
			getBrandImage: function (store) {
				if ("clothing" === store) {
					return "CLOTHING-BRAND.png";
				} else if ("vegetable" === store) {
					return "VEGETABLES.png";
				}
			}
		}
	})
})
