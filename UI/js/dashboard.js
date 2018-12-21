const main = document.getElementById('table-cont');

class User {
	static getUserId() {
		return +localStorage.getItem('id');
	}

	static getAllUsers(offset = 0) {
		const token = localStorage.getItem('token'),
			config = {
				method: 'GET',
				headers: new Headers({
					'x-access-token': token
				}),
			};

		fetch(`http://localhost:3000/api/v1/users?offset=${offset}`, config)
			.then(handleErrors)
			.then(res => {
				main.innerHTML = '';
				User.buildAllUserCollection(res.data);
				User.populateUserTable();
				const span = document.querySelector('.pagination span');
				if (span === null) {
					createPagination(res.pages, User.getAllUsers);
				};
			})
			.catch((err) => {
				if (err.json) {
					err.json().then( obj => {
						notif.make({text: obj.message, type: 'danger' })
					})
				} else {
					console.log(err)
				}
			})
	}

	static getUser() {
		const token = localStorage.getItem('token'),
			userId = User.getUserId(),
			config = {
				method: 'GET',
				headers: new Headers({
					'x-access-token': token
				}),
			};

		fetch(`http://localhost:3000/api/v1/users/${userId}`, config)
			.then(handleErrors)
			.then(res => {
				const user = res.data;
				User.renderProfile(user);
				User.renderFilters();
			})
			.catch((err) => {
				if (err.json) {
					err.json().then( obj => {
						notif.make({text: obj.message, type: 'danger' })
					})
				} else {
					console.log(err)
				}
			})
	}

	static getUserByAdmin() {
		const token = localStorage.getItem('token'),
			userId = window.location.search.slice(4),
			config = {
				method: 'GET',
				headers: new Headers({
					'x-access-token': token
				}),
			};

		fetch(`http://localhost:3000/api/v1/auth/users/${userId}`, config)
			.then(handleErrors)
			.then(res => {
				const user = res.data;
				User.renderProfile(user);
			})
			.catch((err) => {
				if (err.json) {
					err.json().then( obj => {
						notif.make({text: obj.message, type: 'danger' })
					})
				} else {
					console.log(err)
				}
			})
	}

	static upgradeUser() {
		event.preventDefault();
		const token = localStorage.getItem('token'),
			userId = window.location.search.slice(4),
			config = {
				method: 'PATCH',
				headers: new Headers({
					'Content-Type': 'application/json',
					'x-access-token': token
				}),
			};

		fetch(`http://localhost:3000/api/v1/users/${userId}/upgrade`, config)
			.then(handleErrors)
			.then(res => {
				notif.make({text: 'Successfully Upgraded User', type: 'success' });
			})
			.catch((err) => {
				if (err.json) {
					err.json().then( obj => {
						notif.make({text: obj.message, type: 'danger' })
					})
				} else {
					console.log(err)
				}
			})
	}

	static downgradeUser() {
		event.preventDefault();
		const token = localStorage.getItem('token'),
			userId = window.location.search.slice(4),
			config = {
				method: 'PATCH',
				headers: new Headers({
					'Content-Type': 'application/json',
					'x-access-token': token
				}),
			};

		fetch(`http://localhost:3000/api/v1/users/${userId}/downgrade`, config)
			.then(handleErrors)
			.then(res => {
				notif.make({text: 'Successfully Downgraded User', type: 'success' });
			})
			.catch((err) => {
				if (err.json) {
					err.json().then( obj => {
						notif.make({text: obj.message, type: 'danger' })
					})
				} else {
					console.log(err)
				}
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

	static renderProfile(user) {
		const ID = document.getElementById('id'),
					firstName = document.getElementById('firstName'),
					lastName = document.getElementById('lastName'),
					emails = document.getElementById('email'),
					registeredOn = document.getElementById('registered');
		const { id, firstname, lastname, email, registered } = user;
		ID.innerText = `SD0${id}`;
		firstName.innerText = firstname;
		lastName.innerText = lastname;
		emails.innerText = email;
		registeredOn.innerText = `Registered On: ${registered}`;
	}

	static buildAllUserCollection(users) {
		User.collection = users.map((user) => new UserItem(user));
	}

	static populateUserTable() {
		const table = document.createElement('table');
		table.append(createUserTable());

		User.collection
		.map(userItem => {
			table.append(userItem.buildRow());
		});
		main.append(table);
	}

	static renderFilters() {
		const created = document.getElementById('created'),
				inTransit = document.getElementById('in-transit'),
				delivered = document.getElementById('delivered'),
				canceled = document.getElementById('canceled'),
				createdParcels = localStorage.getItem('created'),
				inTransitParcels = localStorage.getItem('inTransit'),
				deliveredParcels = localStorage.getItem('delivered'),
				canceledParcels = localStorage.getItem('canceled')

		created.innerText = createdParcels;
		inTransit.innerText = inTransitParcels;
		delivered.innerText = deliveredParcels;
		canceled.innerText = canceledParcels;
	}
}


class Parcel {
	static getAllParcels(offset = 0) {
		const token = localStorage.getItem('token'),
			config = {
				method: 'GET',
				headers: new Headers({
					'x-access-token': token
				}),
			};

		fetch(`http://localhost:3000/api/v1/parcels?offset=${offset}`, config)
			.then(handleErrors)
			.then(res => {
				main.innerHTML = '';
				Parcel.buildAllParcelCollection(res.data);
				Parcel.populateTable();
				Parcel.renderFilters();
				const span = document.querySelector('.pagination span');
				if (span === null) {
					createPagination(res.pages, Parcel.getAllParcels);
				};
			})
			.catch((err) => {
				if (err.json) {
					err.json().then( obj => {
						notif.make({text: obj.message, type: 'danger' })
					})
				} else {
					console.log(err)
				}
			})
	}

	static getDeliveredParcels(offset = 0) {
		const token = localStorage.getItem('token'),
			config = {
				method: 'GET',
				headers: new Headers({
					'x-access-token': token
				}),
			};

		fetch(`http://localhost:3000/api/v1/parcels?offset=${offset}`, config)
		.then(handleErrors)
		.then(res => {
			Parcel.buildDeliveredParcelCollection(res.data);
			Parcel.populateTable();
			Parcel.renderFilters();
		})
		.catch((err) => {
			if (err.json) {
				err.json().then( obj => {
					notif.make({text: obj.message, type: 'danger' })
				})
			} else {
				console.log(err)
			}
		})
	}

	static getTransitParcels(offset = 0) {
		const token = localStorage.getItem('token'),
			config = {
				method: 'GET',
				headers: new Headers({
					'x-access-token': token
				}),
			};

		fetch(`http://localhost:3000/api/v1/parcels?offset=${offset}`, config)
		.then(handleErrors)
		.then(res => {
			Parcel.buildTransitParcelCollection(res.data);
			Parcel.populateTable();
			Parcel.renderFilters();
		})
		.catch((err) => {
			if (err.json) {
				err.json().then( obj => {
					notif.make({text: obj.message, type: 'danger' })
				})
			} else {
				console.log(err)
			}
		})
	}

	static getUserParcels(offset = 0) {
		const token = localStorage.getItem('token'),
			userId = User.getUserId(),
			config = {
				method: 'GET',
				headers: new Headers({
					'x-access-token': token
				}),
			};

		fetch(`http://localhost:3000/api/v1/users/${userId}/parcels?offset=${offset}`, config)
			.then(handleErrors)
			.then(res => {
				main.innerHTML = '';
				Parcel.buildAllParcelCollection(res.data);
				Parcel.populateTable();
				Parcel.renderFilters();
				const span = document.querySelector('.pagination span');
				if (span === null) {
					createPagination(res.pages, Parcel.getUserParcels);
				};
			})
			.catch((err) => {
				if (err.json) {
					err.json().then( obj => {
						notif.make({text: obj.message, type: 'danger' })
					})
				} else {
					console.log(err)
				}
			})
	}

	static getDeliveredUserParcels(offset = 0) {
		const token = localStorage.getItem('token'),
			userId = User.getUserId(),
			config = {
				method: 'GET',
				headers: new Headers({
					'x-access-token': token
				}),
			};

		fetch(`http://localhost:3000/api/v1/users/${userId}/parcels?offset=${offset}`, config)
			.then(handleErrors)
			.then(res => {
				Parcel.buildDeliveredParcelCollection(res.data);
				Parcel.populateTable();
				Parcel.renderFilters();
			})
			.catch((err) => {
				if (err.json) {
					err.json().then( obj => {
						notif.make({text: obj.message, type: 'danger' })
					})
				} else {
					console.log(err)
				}
			})
	}

	static getTransitUserParcels(offset = 0) {
		const token = localStorage.getItem('token'),
			userId = User.getUserId(),
			config = {
				method: 'GET',
				headers: new Headers({
					'x-access-token': token
				}),
			};

		fetch(`http://localhost:3000/api/v1/users/${userId}/parcels?offset=${offset}`, config)
			.then(handleErrors)
			.then(res => {
				Parcel.buildTransitParcelCollection(res.data);
				Parcel.populateTable();
				Parcel.renderFilters();
			})
			.catch((err) => {
				if (err.json) {
					err.json().then( obj => {
						notif.make({text: obj.message, type: 'danger' })
					})
				} else {
					console.log(err)
				}
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
				if (err.json) {
					err.json().then( obj => {
						notif.make({text: obj.message, type: 'danger' })
					})
				} else {
					console.log(err)
				}
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
				if (err.json) {
					err.json().then( obj => {
						notif.make({text: obj.message, type: 'danger' });
						hide(modal);
						document.forms.changeDestination.reset()
					})
				} else {
					console.log(err)
				}
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
				if (err.json) {
					err.json().then( obj => {
						notif.make({text: obj.message, type: 'danger' })
					})
					hide(modal);
					document.forms.locationForm.reset()
				} else {
					console.log(err)
				}
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
				if (err.json) {
					err.json().then( obj => {
						notif.make({text: obj.message.slice(18), type: 'danger' })
					})
					hide(modal);
					document.forms.statusForm.reset()
				} else {
					console.log(err)
				}
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
				if (err.json) {
					err.json().then( obj => {
						notif.make({text: obj.message, type: 'danger' });
						hide(modal);
					})
				} else {
					console.log(err)
				}
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
				document.forms.createParcel.reset();
				Parcel.getUserParcels();
			})
			.catch((err) => {
				if (err.json) {
					err.json().then( obj => {
						notif.make({text: obj.message, type: 'danger' });
						hide(modal);
					})
				} else if (err.message === 'Failed to fetch') {
					notif.make({text: 'Create Parcel Failed, You are Offline', type: 'danger' });
				} else {
					console.log(err)
				}
			})
	}

	static buildAllParcelCollection(parcels) {
		if(parcels.length) {
			Parcel.collection = parcels.map((parcel) => new ParcelItem(parcel));
			Parcel.filteredCollection = parcels.map((parcel) => new ParcelItem(parcel));
		}
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
		const table = document.createElement('table');
		table.append(createHeadingRow());
		
		Parcel.filteredCollection
		.map(parcelItem => {
			table.append(parcelItem.buildRow());
		});
		
		main.append(table)
	}

	static renderFilters() {
		const created = document.getElementById('created'),
				inTransit = document.getElementById('in-transit'),
				delivered = document.getElementById('delivered'),
				createdParcels = Parcel.collection.length,
				inTransitParcels = Parcel.collection.filter(parcelItem => parcelItem.isInTransit()).length,
				deliveredParcels = Parcel.collection.filter(parcelItem => parcelItem.isDelivered()).length,
				canceledParcels = Parcel.collection.filter(parcelItem => parcelItem.isCanceled()).length;

		created.innerText = createdParcels;
		inTransit.innerText = inTransitParcels;
		delivered.innerText = deliveredParcels;
		localStorage.setItem('created', createdParcels);
		localStorage.setItem('delivered', deliveredParcels);
		localStorage.setItem('inTransit', inTransitParcels);
		localStorage.setItem('canceled', canceledParcels);
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

	isCanceled() {
		return this.parcel.status === 'Canceled';
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
		anchor.innerText = 'Edit';
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

function createHeadingRow() {
	const tableRow = document.createElement('tr');
	const tableData = ['ID', 'Name', 'Weight', 'Price', 'Destination', 'Receiver', 'Sent On', 'Status']

	for (let data of tableData) {
		const value = document.createElement('th');
		value.innerText = data;
		tableRow.appendChild(value);
	}

	return tableRow;
}

function createUserTable() {
	const tableRow = document.createElement('tr');
	const tableData = ['ID', 'First Name', 'Last Name', 'Admin', 'Email', 'Registered On'];

	for (let data of tableData) {
		const value = document.createElement('th');
		value.innerText = data;
		tableRow.appendChild(value);
	}

	return tableRow;
}

function createPagination(pages, callback) {
	const span = document.createElement('span');
	const pagination = document.getElementsByClassName('pagination');

	Array(pages).fill(0).map((value, index) => {
		const anchor = document.createElement('a');
		anchor.classList.add('links');
		anchor.href= '#';
		anchor.innerText = index + 1;
		anchor.addEventListener('click', () => { 
			callback(index) 
		});
		span.append(anchor);
	});
	pagination[0].append(span);
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

// Implementing the upgrade user functionality
const upgrade = document.getElementById('upgrade');
if (upgrade !== null) {
	upgrade.addEventListener('click', User.upgradeUser);
}

// Implementing the downgrade user functionality
const downgrade = document.getElementById('downgrade');
if (downgrade !== null) {
	downgrade.addEventListener('click', User.downgradeUser);
}


