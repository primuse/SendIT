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
			window.location = 'dashboard.html';
		})
		.catch((err) => {
		  notif.make({text: 'Invalid Email or Password', type: 'danger' });
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
			window.location = 'new_dashboard.html'
		})
		.catch((err) => {
		  notif.make({text: 'Email already Registered', type: 'danger' });
		})
	}

	static getUserParcels(event) {
		const id = Number(localStorage.getItem('id'));
		const token = localStorage.getItem('token');

		const config = {
			method: 'GET',
			headers: new Headers({
				'x-access-token': token
			}),
		};

		fetch(`http://localhost:3000/api/v1/users/${id}/parcels`, config)
		.then(res => res.json())
		.then(res => {
			const parcels = res.data[0]; 
			console.log(parcels);

		});
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



// Function to handle errors
function handleErrors(res) {
	if(!res.ok) {
		throw new Error(res.statusText);
	}
	return res.json();
}


const notif = new Notification()
document.body.append(notif.getElement());
