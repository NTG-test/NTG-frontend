var apiUrl = 'https://api.nategh.org';

var $nwaConfig = {
	supportedLanguages: ['ar', 'enUS', 'fa'],
	defaultColor: 'nwaColorBlackGold'
};

var $nwaScope = {
    intro: {
        landing: {
            nwaPageHistoryUrl: '/',
            nwaPageFetch: {
            	url: '/html/introLanding.html',
            	header: false,
            	footer: false,
            	nav: false,
            },
            nwaPageData: false,
            nwaPageForm: false
        }
    },
    account: {
        signIn: {
            nwaPageHistoryUrl: '/account/signin',
            nwaPageFetch: {
            	url: '/html/accountSignIn.html',
            	header: false,
            	footer: false,
            	nav: false,
            	menu: false
            },
            nwaPageData: false,
            nwaPageForm: {
            	url: apiUrl + '/account',
            	onResponse: function(status,responseText) {
            		nwaPageFetch(false, 'account', 'verify', responseText);
            	}
            }
        },
        verify: {
            nwaPageHistoryUrl: '/account/verify',
            nwaPageFetch: {
            	url: '/html/accountVerify.html',
            	header: false,
            	footer: false,
            	nav: false,
            	menu: false
            },
            nwaPageData: {
                url: apiUrl + '/account',
                onResponse: function(status,responseText) {
                	nwaSelect('main form input[name="email"]').setAttribute('value', responseText);
                }
            },
            nwaPageForm: {
            	url: apiUrl + '/account',
            	onResponse: function(status,responseText) {
                	if (responseText === 'emailAndLogInCodeNotMatch') {alert(status + ' emailAndLogInCodeNotMatch'); return;}
                	if (responseText === 'onlyAdminCanCreateAccounts') {alert('onlyAdminCanCreateAccounts'); return;}
                	responseObject=JSON.parse(responseText);
                	localStorage.setItem('token', responseObject.token);
                	if (status==201) nwaPageFetch(false, 'account', 'register');
                	if (status==200) nwaPageFetch(false, 'quran', 'landing');
            	}
            }
        },
        register: {
            nwaPageHistoryUrl: '/account/register',
            nwaPageFetch: {
            	url: '/html/accountRegister.html',
            	header: false,
            	footer: false,
            	nav: false,
            	menu: false
            },
			nwaPageData: {
                url: apiUrl + '/account',
                onResponse: function(status,responseText) {
                	nwaSelect('main form input[name="email"]').setAttribute('value', responseText);
                }
            },
            nwaPageForm: {
            	url: apiUrl + '/account',
            	onResponse: function(status,responseText) {
            		if (status == '200')
                    	nwaPageFetch(false, 'quran', 'landing');
                	else
                    	alert(responseText);
            	}
            }
        }
	},
	profile: {
		edit: {
        	nwaPageHistoryUrl: '/profile/edit',
        	nwaPageFetch: {
            	url: '/html/profileEdit.html',
            	header: 'Edit profile',
            	footer: false,
            	nav: false,
            	menu: false
        	},
        	nwaPageData:  {
        		url: apiUrl + '/profile',
            	onResponse: function(status,responseText) {
                	responseObject=JSON.parse(responseText);
					nwaSelect('main form input[name="email"]').setAttribute('value', responseObject.email);
                	nwaSelect('main form input[name="username"]').setAttribute('value', responseObject.username);
					nwaSelect('main form input[name="name"]').setAttribute('value', responseObject.name);
            	}
			},
        	nwaPageForm: {
        		url: apiUrl + '/profile',
            	onResponse: function(status,responseText) {
            	if (status == '200')
            		window.history.back();
            	else
            		alert('formOnResponse Error: ' + status + ' ' + responseText);
            	}
        	}
    	},
		show: {
            nwaPageHistoryUrl: '/profile',
            nwaPageFetch: {
            	url: '/html/profileShow.html',
            	header: 'Profile',
            	footer: false,
            	nav: false,
            	menu: false
            },
            nwaPageData: {
                url: apiUrl + '/profile',
                onResponse: function(status,responseText) {
                	responseObject=JSON.parse(responseText);
					nwaSelect('main span#username').innerHTML = responseObject.username;
					nwaSelect('main span#name').innerHTML = responseObject.name;
                }
            },
            nwaPageForm: false
        },
		delete: {
            nwaPageHistoryUrl: '/profile/delete',
            nwaPageFetch: {
            	url: '/html/profileDelete.html',
            	header: 'Delete profile',
            	footer: false,
            	nav: false,
            	menu: false
            },
            nwaPageData: {
                url: apiUrl + '/profile',
                onResponse: function(status,responseText) {
                	responseObject=JSON.parse(responseText);
					nwaSelect('main span#name').innerHTML = responseObject.name;
					nwaSelect('main span#username').innerHTML = responseObject.username;
                }
            },
            nwaPageForm: {
        		url: apiUrl + '/profile',
            	onResponse: function(status,responseText) {
            		if (status == '200') {
						alert(status + ' ' + responseText);
            			window.history.back();
            		} else
            			alert('formOnResponse Error: ' + status + ' ' + responseText);
            	}
        	}
        }
    },
    quran: {
		landing: {
			nwaPageHistoryUrl: '/quran',
			nwaPageFetch: {
				url: '/html/quranLanding.html',
				header: 'Nategh',
				footer: true,
				nav: true,
			},
			nwaPageData: {
				url: apiUrl+'/quran',
				onResponse: function(status,responseText) {
					nwaSelect('main article').innerHTML += status+': '+responseText;
				}
			},
			nwaPageForm: false
		}
	},
	search: {
		landing: {
			nwaPageHistoryUrl: '/search',
			nwaPageFetch: {
				url: '/html/searchLanding.html',
				header: 'Search',
				footer: false,
				nav: false
			},
			nwaPageData: {
				url: apiUrl+'/search',
				onResponse: function(status,responseText) {
					responseObject = JSON.parse(responseText);
					responseObject.forEach(element => console.log(element));

					var surahList = '';
					var i;
					var j;
					for (i in responseObject) {
						j = i + 1;
						console.log('j = '+j);
						nwaSelect('main article#suraList section#sura'+j+' span.suraName').innerHTML = responseObject[i].name;
						if (responseObject[i].period == 'makki')
							nwaSelect('main article#suraList section#sura'+j+' span.suraName').innerHTML += "+";
						else
							nwaSelect('main article#suraList section#sura'+j+' span.suraName').innerHTML += "-";
                	}
				}
			},
			nwaPageForm: false
		}
    },
	majlis: {
        list: {
            nwaPageHistoryUrl: '/majlisi',
            nwaPageFetch: {
            	url: '/html/majlisiList.html',
            	header: 'Majlisi recitations',
            	footer: true,
            	nav: false,
            },
            nwaPageData: false,
            nwaPageForm: false
        }
    }
};
