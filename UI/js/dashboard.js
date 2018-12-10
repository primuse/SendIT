const table = document.createElement('table');

class User {
	static getUserId() {
		return +localStorage.getItem('id');
	}

	static renderUserName() {

		const firstname = localStorage.getItem('firstName');
		const lastname = localStorage.getItem('lastName');
		const username = document.getElementById('username');
		const userIdCont = document.getElementById('user-id');

		username.innerHTML = `${firstname} ${lastname}`;
		userIdCont.innerHTML = `SD0${User.getUserId()}`;

	}
}


class Parcel {
	static getUserParcels() {
		const token = localStorage.getItem('token'),
			userId = User.getUserId(),
			config = {
				method: 'GET',
				headers: new Headers({
					'x-access-token': token
				}),
			};

		fetch(`http://localhost:3000/api/v1/users/${userId}/parcels`, config)
			.then(res => res.json())
			.then(res => {
				Parcel.buildParcelCollection(res.data);
				Parcel.populateTable();
				Parcel.renderFilters();
			});
	}

	static createParcel(event) {
		event.preventDefault();
		const token = localStorage.getItem('token'),
			parcelName = document.getElementById('parcelName').value,
			weight = document.getElementById('weight').value,
			pickupLocation = document.getElementById('PickupLocation').value,
			destination = document.getElementById('destination').value,
			receiver = document.getElementById('receiver').value,
			email = document.getElementById('email').value,
			phoneNumber = document.getElementById('phoneNumber').value,
			modal = document.getElementById('parcelmodal'),
			myData = {
				parcelName, 
				weight, 
				pickupLocation, 
				destination, 
				receiver,
				email, 
				phoneNumber
			},
			config = {
				method: 'POST',
				headers: new Headers({
					'Content-Type': 'application/json',
					'x-access-token': token
				}),
				body: JSON.stringify(myData),
			};

		fetch('http://localhost:3000/api/v1//parcels', config)
			.then(handleErrors)
			.then(res => {
				hide(modal);
				document.forms.createParcel.reset()
				console.log(res);
			})
			.catch((err) => {
				if(err.message === 'Failed to fetch') {
					console.log('yay');
					notif.make({text: 'Create Parcel Failed, You are Offline', type: 'danger' });
				}
				// console.log(arguments);
			})

	}

	static buildParcelCollection(parcels) {
		Parcel.collection = parcels.map((parcel) => new ParcelItem(parcel));
	}

	static populateTable() {
		const table = createTable();

		Parcel.collection
		.map(parcelItem => {
			table.append(parcelItem.buildRow());
		});
	}

	static renderFilters() {

		console.log(Parcel.collection);

		const created = document.getElementById('created');
		const inTransit = document.getElementById('in-transit');
		const delivered = document.getElementById('delivered');

		created.innerText = Parcel.collection.filter(parcelItem => parcelItem.isCreated()).length;
		inTransit.innerText = Parcel.collection.filter(parcelItem => parcelItem.isInTransit()).length;
		delivered.innerText = Parcel.collection.filter(parcelItem => parcelItem.isDelivered()).length;
	}
}

Parcel.collection = []

Parcel.getUserParcels()
User.renderUserName()

class ParcelItem  {

	constructor(parcel) {
		this.parcel = parcel
	}

	isInTransit() {
		return this.parcel.status === 'In-transit';
	}

	isCreated() {
		return this.parcel.status === 'Created';
	}

	isDelivered() {
		return this.parcel.status === 'Delivered';
	}

	buildRow() {
		let {
			id,
			weight,
			metric,
			price,
			destination,
			receiver,
			senton,
			status
		} = this.parcel
		weight = `${weight}${metric}`;
		const datas = [id, weight, price, destination, receiver, senton, status];
		const row = document.createElement('tr');

		for (let data of datas) {
			const dataRow = document.createElement('td');
			dataRow.innerText = data;
			row.appendChild(dataRow);
		}
		
		const dataRow = document.createElement('td');
		dataRow.appendChild(this.buildButton());
		row.appendChild(dataRow);

		return row; //Element
	}
	
	buildButton() {
		const anchor = document.createElement('a');
		anchor.href = 'details.html';
		anchor.innerText = 'View';
		const classes = ['btn', 'xsm', 'bg-bright-blue', 'white'];
		for (let clas of classes) {
			anchor.classList.add(clas);
		}
		return anchor;
	}
}

function createTable() {
	const main = document.getElementById('table-cont');
	const tableRow = document.createElement('tr');
	const id = document.createElement('th');
	id.innerHTML = 'ID';
	const weight = document.createElement('th');
	weight.innerHTML = 'Weight';
	const price = document.createElement('th');
	price.innerHTML = 'Price';
	const destination = document.createElement('th');
	destination.innerHTML = 'Destination';
	const receiver = document.createElement('th');
	receiver.innerHTML = 'Receiver';
	const sentOn = document.createElement('th');
	sentOn.innerHTML = 'Sent On';
	const status = document.createElement('th');
	status.innerHTML = 'Status';

	const headers = [id, weight, price, destination, receiver, sentOn, status];
	for (let i = 0; i < headers.length; i++) {
		tableRow.appendChild(headers[i]);
	};
	table.appendChild(tableRow);
	main.appendChild(table);

	return table;
}

// Implementing the create parcel modal
let createParcel = document.getElementById("createParcel");
if (createParcel !== null) {
	createParcel.addEventListener('submit', Parcel.createParcel);
}


function handleErrors(res) {
	if(!res.ok) {
		console.log(res);
		throw new Error(res.statusText);
	}
	return res.json();
}

function hide(modal) {
	modal.style.display = 'none';
}

const notif = new Notification()
document.body.append(notif.getElement());
