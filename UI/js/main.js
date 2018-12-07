// Implementing the Login page
let loginBtn = document.getElementById("loginBtn");
console.log('joseph');

loginBtn.addEventListener('click', () => {
	const email = document.getElementById('email').value;
	const password = document.getElementById("pwd").value;
	const myData = { email, password };

	const formData = new FormData();
	formData.append('email', email);
	formData.append('password', password);

	const config = {
		method: 'POST',
		headers: new Headers({
			'Content-Type': 'application/json'
		}),
		body: JSON.stringify(myData),
	};

	console.log(config.body);
	 
	fetch('http://localhost:3000/api/v1/auth/login', config)
		.then(res => res.json())
		.then(res => console.log(res))
})
