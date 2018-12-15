const table = document.createElement('table');

class User {
	static getUserId() {
		return +localStorage.getItem('id');
	}

	static getAllUsers() {
		const token = localStorage.getItem('token'),
			config = {
				method: 'GET',
				headers: new Headers({
					'x-access-token': token
				}),
			};

		fetch('http://localhost:3000/api/v1/users', config)
			.then(handleErrors)
			.then(res => {
				User.buildAllUserCollection(res.data);
				User.populateUserTable();
			})
			.catch((err) => {
				// err.json().then( obj => {
				// 	notif.make({text: obj.message, type: 'danger' })
				// })
			})
	}

	static renderUserName() {
		const firstname = localStorage.getItem('firstName');
		const lastname = localStorage.getItem('lastName');
		const username = document.getElementById('username');
		const userIdCont = document.getElementById('user-id');
		username.innerHTML = `${firstname} ${lastname}`;
		userIdCont.innerHTML = `SD0${User.getUserId()}`;
	}

	static buildAllUserCollection(users) {
		User.collection = users.map((user) => new UserItem(user));
	}

	static populateUserTable() {
		const table = createUserTable();

		User.collection
		.map(userItem => {
			table.append(userItem.buildRow());
		});
	}
}


class Parcel {
	static getAllParcels() {
		const token = localStorage.getItem('token'),
			config = {
				method: 'GET',
				headers: new Headers({
					'x-access-token': token
				}),
			};

		fetch('http://localhost:3000/api/v1/parcels', config)
			.then(handleErrors)
			.then(res => {
				Parcel.buildAllParcelCollection(res.data);
				Parcel.populateTable();
				Parcel.renderFilters();
			})
			.catch((err) => {
				err.json().then( obj => {
					notif.make({text: obj.message, type: 'danger' })
				})
			})
	}

	static getDeliveredParcels() {
		const token = localStorage.getItem('token'),
			config = {
				method: 'GET',
				headers: new Headers({
					'x-access-token': token
				}),
			};

			fetch('http://localhost:3000/api/v1/parcels', config)
			.then(handleErrors)
			.then(res => {
				Parcel.buildDeliveredParcelCollection(res.data);
				Parcel.populateTable();
				Parcel.renderFilters();
			})
			.catch((err) => {
				err.json().then( obj => {
					notif.make({text: obj.message, type: 'danger' })
				})
			})
	}

	static getTransitParcels() {
		const token = localStorage.getItem('token'),
			config = {
				method: 'GET',
				headers: new Headers({
					'x-access-token': token
				}),
			};

			fetch('http://localhost:3000/api/v1/parcels', config)
			.then(handleErrors)
			.then(res => {
				Parcel.buildTransitParcelCollection(res.data);
				Parcel.populateTable();
				Parcel.renderFilters();
			})
			.catch((err) => {
				err.json().then( obj => {
					notif.make({text: obj.message, type: 'danger' })
				})
			})
	}

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
			.then(handleErrors)
			.then(res => {
				Parcel.buildAllParcelCollection(res.data);
				Parcel.populateTable();
				Parcel.renderFilters();
			})
			.catch((err) => {
				err.json().then( obj => {
					notif.make({text: obj.message, type: 'danger' })
				})
			})
	}

	static getDeliveredUserParcels() {
		const token = localStorage.getItem('token'),
			userId = User.getUserId(),
			config = {
				method: 'GET',
				headers: new Headers({
					'x-access-token': token
				}),
			};

		fetch(`http://localhost:3000/api/v1/users/${userId}/parcels`, config)
			.then(handleErrors)
			.then(res => {
				Parcel.buildDeliveredParcelCollection(res.data);
				Parcel.populateTable();
				Parcel.renderFilters();
			})
			.catch((err) => {
				err.json().then( obj => {
					notif.make({text: obj.message, type: 'danger' })
				})
			})
	}

	static getTransitUserParcels() {
		const token = localStorage.getItem('token'),
			userId = User.getUserId(),
			config = {
				method: 'GET',
				headers: new Headers({
					'x-access-token': token
				}),
			};

		fetch(`http://localhost:3000/api/v1/users/${userId}/parcels`, config)
			.then(handleErrors)
			.then(res => {
				Parcel.buildTransitParcelCollection(res.data);
				Parcel.populateTable();
				Parcel.renderFilters();
			})
			.catch((err) => {
				err.json().then( obj => {
					notif.make({text: obj.message, type: 'danger' })
				})
			})
	}

	static getParcel() {
		const token = localStorage.getItem('token'),
			parcelId = window.location.search.slice(4),
			config = {
				method: 'GET',
				headers: new Headers({
					'x-access-token': token
				}),
			};

		fetch(`http://localhost:3000/api/v1/parcels/${parcelId}`, config)
			.then(handleErrors)
			.then(res => {
				const parcel = res.data[0];
				Parcel.renderDetails(parcel);
				(new ParcelItem(parcel)).getLongAndLat();
			})
			.catch((err) => {
				err.json().then( obj => {
					notif.make({text: obj.message, type: 'danger' })
				})
			})
	}

	static editParcelDestination() {
		event.preventDefault();
		const token = localStorage.getItem('token'),
			parcelId = window.location.search.slice(4),
			destination = document.getElementById('destination').value,
			modal = document.getElementById('destination-modal'),
			myData = {
				destination, 
			},
			config = {
				method: 'PATCH',
				headers: new Headers({
					'Content-Type': 'application/json',
					'x-access-token': token
				}),
				body: JSON.stringify(myData),
			};

		fetch(`http://localhost:3000/api/v1/parcels/${parcelId}/destination`, config)
			.then(handleErrors)
			.then(res => {
				notif.make({text: 'Successfully Updated destination', type: 'success' });
				hide(modal);
				document.forms.changeDestination.reset()
				Parcel.getParcel();
			})
			.catch((err) => {
				err.json().then( obj => {
					notif.make({text: obj.message, type: 'danger' });
					hide(modal);
					document.forms.changeDestination.reset()
				})
			})
	}

	static editParcelLocation() {
		event.preventDefault();
		const token = localStorage.getItem('token'),
			parcelId = window.location.search.slice(4),
			currentLocation = document.getElementById('location').value,
			modal = document.getElementById('location-modal'),
			myData = {
				currentLocation, 
			},
			config = {
				method: 'PATCH',
				headers: new Headers({
					'Content-Type': 'application/json',
					'x-access-token': token
				}),
				body: JSON.stringify(myData),
			};

		fetch(`http://localhost:3000/api/v1/parcels/${parcelId}/currentlocation`, config)
			.then(handleErrors)
			.then(res => {
				notif.make({text: 'Successfully Updated location', type: 'success' });
				hide(modal);
				document.forms.locationForm.reset()
				Parcel.getParcel();
			})
			.catch((err) => {
				err.json().then( obj => {
					notif.make({text: obj.message, type: 'danger' })
				})
				hide(modal);
				document.forms.locationForm.reset()
			})
	}

	static editParcelStatus() {
		event.preventDefault();
		const token = localStorage.getItem('token'),
			parcelId = window.location.search.slice(4),
			status = document.getElementById('status').value,
			modal = document.getElementById('update-modal'),
			myData = {
				status, 
			},
			config = {
				method: 'PATCH',
				headers: new Headers({
					'Content-Type': 'application/json',
					'x-access-token': token
				}),
				body: JSON.stringify(myData),
			};

		fetch(`http://localhost:3000/api/v1/parcels/${parcelId}/status`, config)
			.then(handleErrors)
			.then(res => {
				notif.make({text: 'Successfully Updated status', type: 'success' });
				hide(modal);
				document.forms.statusForm.reset()
				Parcel.getParcel();
			})
			.catch((err) => {
				err.json().then( obj => {
					notif.make({text: obj.message.slice(18), type: 'danger' })
				})
				hide(modal);
				document.forms.statusForm.reset()
			})
	}

	static cancelParcel() {
		event.preventDefault();
		const token = localStorage.getItem('token'),
			parcelId = window.location.search.slice(4),
			modal = document.getElementById('cancel-modal'),
			config = {
				method: 'PATCH',
				headers: new Headers({
					'Content-Type': 'application/json',
					'x-access-token': token
				}),
			};


		fetch(`http://localhost:3000/api/v1/parcels/${parcelId}/cancel`, config)
			.then(handleErrors)
			.then(res => {
				notif.make({text: 'Successfully Canceled Parcel', type: 'success' });
				hide(modal);
				Parcel.getParcel();
			})
			.catch((err) => {
				err.json().then( obj => {
					notif.make({text: obj.message, type: 'danger' });
					hide(modal);
				})
			})
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
			.then(res => res.json())
			.then(res => {
        notif.make({text: 'Successfully created parcel', type: 'success' });
				hide(modal);
				document.forms.createParcel.reset()
			})
			.catch((err) => {
				if(err.message === 'Failed to fetch') {
					notif.make({text: 'Create Parcel Failed, You are Offline', type: 'danger' });
				}
			})

	}

	static buildAllParcelCollection(parcels) {
		Parcel.collection = parcels.map((parcel) => new ParcelItem(parcel));
		Parcel.filteredCollection = parcels.map((parcel) => new ParcelItem(parcel));
	}

	static buildDeliveredParcelCollection(parcels) {
		Parcel.collection = parcels.map((parcel) => new ParcelItem(parcel));
		Parcel.filteredCollection = Parcel.collection.filter(parcelItem => parcelItem.isDelivered());
	}

	static buildTransitParcelCollection(parcels) {
		Parcel.collection = parcels.map((parcel) => new ParcelItem(parcel));
		Parcel.filteredCollection = Parcel.collection.filter(parcelItem => parcelItem.isInTransit());
	}

	static populateTable() {
		const table = createParcelTable();

		Parcel.filteredCollection
		.map(parcelItem => {
			table.append(parcelItem.buildRow());
		});
	}

	static renderFilters() {
		const created = document.getElementById('created');
		const inTransit = document.getElementById('in-transit');
		const delivered = document.getElementById('delivered');

		created.innerText = Parcel.collection.filter(parcelItem => parcelItem.isCreated()).length;
		inTransit.innerText = Parcel.collection.filter(parcelItem => parcelItem.isInTransit()).length;
		delivered.innerText = Parcel.collection.filter(parcelItem => parcelItem.isDelivered()).length;
	}

	static renderDetails(parcel) {
		const name = document.getElementById("parcel-name"),
			destination = document.getElementById("parcel-destination"),
			pickup = document.getElementById("parcel-pickup"),
			location = document.getElementById("parcel-location"),
			receiver = document.getElementById("parcel-receiver"),
			phoneNumber = document.getElementById("receiver-phone"),
			price = document.getElementById("parcel-price"),
			sentOn = document.getElementById("parcel-sent"),
			deliveredOn = document.getElementById("parcel-delivered"),
			status = document.getElementById("parcel-status"),
			parcelId = document.getElementById("parcel-Id");

		name.innerText = parcel.parcelname;
		destination.innerText = parcel.destination;
		pickup.innerText = parcel.pickuplocation;
		location.innerText = parcel.currentlocation;
		receiver.innerText = parcel.receiver;
		phoneNumber.innerText = parcel.phonenumber;
		price.innerText = `N${parcel.price}`;
		status.innerText = parcel.status;
		parcelId.innerText = `PO${parcel.id}`;
		sentOn.innerText = parcel.senton;
		if (parcel.deliveredon === null) {
			deliveredOn.innerText = 'Not yet delivered';
		} else {
			deliveredOn.innerText = parcel.deliveredon;
		}
		
		
	}
}

Parcel.filteredCollection = [];
Parcel.collection = [];
User.collection = [];
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
			parcelname,
			weight,
			metric,
			price,
			destination,
			receiver,
			senton,
			status
		} = this.parcel
		id = `PO${id}`;
		weight = `${weight}${metric}`;
		const datas = [id, parcelname, weight, price, destination, receiver, senton, status];
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
		const anchor = document.createElement('a'),
			auth = localStorage.getItem('auth');
		anchor.href = '#';
		anchor.innerText = 'View';
		const classes = ['btn', 'xsm', 'bg-bright-blue', 'white'];
		for (let clas of classes) {
			anchor.classList.add(clas);
		}
		anchor.addEventListener('click', (event) => {
			event.preventDefault();
			auth != null ? window.location = 'admin_parcel_details.html?id='+this.parcel.id
				:window.location = 'details.html?id='+this.parcel.id;
		})
		return anchor;
	}
	drawFlightPath() {}
  getLongAndLat() { //dot
		Promise.all([
			getLongAndLat(this.parcel.destination), 
			getLongAndLat(this.parcel.pickuplocation)
		]).then((response) => {
			const [firstPosiiton, secondPosition] = response;
			MapObject.map.setCenter(secondPosition)
			drawFlightPath(firstPosiiton, secondPosition)
		});
	}
	
}

class UserItem {

	constructor(user) {
		this.user = user
	}

	buildRow() {
		let {
			id,
			firstname,
			lastname,
			isadmin,
			email,
			registered
		} = this.user;
		id = `SD0${id}`;
		const datas = [id, firstname, lastname,isadmin, email, registered];
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
		anchor.href = '#';
		anchor.innerText = 'Upgrade';
		const classes = ['btn', 'xsm', 'bg-bright-blue', 'white'];
		for (let clas of classes) {
			anchor.classList.add(clas);
		}
		anchor.addEventListener('click', (event) => {
			event.preventDefault();
			window.location = 'admin_profile_details.html?id='+this.user.id;
		})
		return anchor;
	}
}

function createParcelTable() {
	const main = document.getElementById('table-cont');
	const tableRow = document.createElement('tr');
	const id = document.createElement('th');
	id.innerText = 'ID';
	const name = document.createElement('th');
	name.innerText = 'Name';
	const weight = document.createElement('th');
	weight.innerText = 'Weight';
	const price = document.createElement('th');
	price.innerText = 'Price';
	const destination = document.createElement('th');
	destination.innerText = 'Destination';
	const receiver = document.createElement('th');
	receiver.innerText = 'Receiver';
	const sentOn = document.createElement('th');
	sentOn.innerText = 'Sent On';
	const status = document.createElement('th');
	status.innerText = 'Status';

	const headers = [id, name, weight, price, destination, receiver, sentOn, status];
	for (let i = 0; i < headers.length; i++) {
		tableRow.appendChild(headers[i]);
	};
	table.appendChild(tableRow);
	main.appendChild(table);

	return table;
}

function createUserTable() {
	const main = document.getElementById('table-cont');
	const tableRow = document.createElement('tr');
	const tableData = ['ID', 'First Name', 'Last Name', 'Admin', 'Email', 'Registered On']

	for (let data of tableData) {
		const value = document.createElement('th');
		value.innerText = data;
		tableRow.appendChild(value);
	}
	table.appendChild(tableRow);
	main.appendChild(table);

	return table;
}

// Implementing the create parcel modal
const createParcel = document.getElementById("createParcel");
if (createParcel !== null) {
	createParcel.addEventListener('submit', Parcel.createParcel);
}

// Implementing the change destination modal
const changeDestination = document.getElementById('changeDestination');
if (changeDestination !== null) {
	changeDestination.addEventListener('submit', Parcel.editParcelDestination);
}

// Implementing the change destination modal
const changeLocation = document.getElementById('locationForm');
if (changeLocation !== null) {
	changeLocation.addEventListener('submit', Parcel.editParcelLocation);
}

// Implementing the cancel parcel modal
const cancelParcel = document.getElementById('cancelForm');
if (cancelParcel !== null) {
	cancelParcel.addEventListener('submit', Parcel.cancelParcel);
}

// Implementing the change parcel status modal
const statusParcel = document.getElementById('statusForm');
if (statusParcel !== null) {
	statusParcel.addEventListener('submit', Parcel.editParcelStatus);
}


function handleErrors(res) {
	if(!res.ok) {
		throw res;	
	}
	else {
	return res.json();
	}
}

function hide(modal) {
	modal.style.display = 'none';
}

const notif = new Notification()
document.body.append(notif.getElement());
