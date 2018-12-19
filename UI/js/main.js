class Fetch {
	static login(event) {
		event.preventDefault();
		const email = document.getElementById('email').value;
		const password = document.getElementById("pwd").value;
		const myData = {
			email,
			password,
		};
		const config = {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(myData),
		};

		fetch('http://localhost:3000/api/v1/auth/login', config)
		.then(handleErrors)
		.then(res =>  { 
			localStorage.setItem('token', res.data[0].token);
			localStorage.setItem('id', res.data[0].user.id);
			localStorage.setItem('firstName', res.data[0].user.firstname);
			localStorage.setItem('lastName', res.data[0].user.lastname)
			if (Object.keys(res.data[0].user).includes('auth')) {
				localStorage.setItem('auth', res.data[0].user.auth)
				window.location = 'admin.html';
			} else {
				window.location = 'dashboard.html';
			}
		})
		.catch((err) => {
			err.json().then( obj => {
				notif.make({text: obj.message, type: 'danger' })
			})
		})
	}

	static signup(event) {
		event.preventDefault();
		const firstName = document.getElementById('firstName').value;
		const lastName = document.getElementById('lastName').value;
		const email = document.getElementById('email').value;
		const password = document.getElementById("password").value;
		const myData = {
			firstName,
			lastName,
			email,
			password,
		};
		const config = {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(myData),
		};

		fetch('http://localhost:3000/api/v1/auth/signup', config)
		.then(handleErrors)
		.then(res =>  { 
			localStorage.setItem('token', res.data.token);
			localStorage.setItem('id', res.data.user.id);
			localStorage.setItem('firstName', res.data.user.firstname);
			localStorage.setItem('lastName', res.data.user.lastname)
			window.location = 'dashboard.html'
		})
		.catch((err) => {
		  notif.make({text: 'Email already Registered', type: 'danger' });
		})
	}

	static sendResetEmail(event) {
		event.preventDefault();
		const email = document.getElementById('email').value;
		const myData = {
			email,
		};
		const config = {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(myData),
		};

		fetch('http://localhost:3000/api/v1/reset/email', config)
		.then(handleErrors)
		.then(res =>  { 
			notif.make({text: 'A reset link has been sent to your mail', type: 'success'});
		})
		.catch((err) => {
			err.json().then( obj => {
				notif.make({text: obj.message, type: 'danger' })
			})
		})
	}

	static updatePassword(event) {
		event.preventDefault();
		const password = document.getElementById('password').value,
					myData = {
						password,
					},
					urlParams = new URLSearchParams(window.location.search),
					token = urlParams.get('auth'),
					userId = urlParams.get('id'),
					config = {
						method: 'PATCH',
						headers: new Headers({
							'Content-Type': 'application/json',
							'x-access-token': token
						}),
						body: JSON.stringify(myData),
					};

		fetch(`http://localhost:3000/api/v1/reset/${userId}`, config)
		.then(handleErrors)
		.then(res =>  { 
			notif.make({text: 'Successfuly updated Password', type: 'success'});
		})
		.catch((err) => {
			err.json().then( obj => {
				notif.make({text: obj.message, type: 'danger' })
			})
		})
	}
}

// Implementing the Login page
let loginForm = document.getElementById('login-form');
if (loginForm !== null) {
	loginForm.addEventListener('submit', Fetch.login);
}

// Implementing the signup page
let signupForm = document.getElementById("signupForm");
if (signupForm !== null) {
	signupForm.addEventListener('submit', Fetch.signup);
}

// Implementing the signup page
let resetForm = document.getElementById("resetForm");
if (resetForm !== null) {
	resetForm.addEventListener('submit', Fetch.sendResetEmail);
}

// Implementing the signup page
let passwordForm = document.getElementById("passwordForm");
if (passwordForm !== null) {
	passwordForm.addEventListener('submit', Fetch.updatePassword);
}



// Function to handle errors
function handleErrors(res) {
	if(!res.ok) {
		throw res;	
	}
	else {
	return res.json();
	}
}


const notif = new Notification()
document.body.append(notif.getElement());
