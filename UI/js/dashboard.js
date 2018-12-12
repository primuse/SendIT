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
	static getAllParcels() {
		const token = localStorage.getItem('token'),
			config = {
				method: 'GET',
				headers: new Headers({
					'x-access-token': token
				}),
			};

		fetch('http://localhost:3000/api/v1/parcels', config)
			.then(res => res.json())
			.then(res => {
				Parcel.buildAllParcelCollection(res.data);
				Parcel.populateTable();
				Parcel.renderFilters();
			});
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
			.then(res => res.json())
			.then(res => {
				Parcel.buildDeliveredParcelCollection(res.data);
				Parcel.populateTable();
				Parcel.renderFilters();
			});
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
			.then(res => res.json())
			.then(res => {
				Parcel.buildTransitParcelCollection(res.data);
				Parcel.populateTable();
				Parcel.renderFilters();
			});
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
			.then(res => res.json())
			.then(res => {
				Parcel.buildAllParcelCollection(res.data);
				Parcel.populateTable();
				Parcel.renderFilters();
			});
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
			.then(res => res.json())
			.then(res => {
				Parcel.buildDeliveredParcelCollection(res.data);
				Parcel.populateTable();
				Parcel.renderFilters();
			});
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
			.then(res => res.json())
			.then(res => {
				Parcel.buildTransitParcelCollection(res.data);
				Parcel.populateTable();
				Parcel.renderFilters();
			});
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
			.then(res => res.json())
			.then(res => {
				console.log(res);
				const parcel = res.data[0];
				Parcel.renderDetails(parcel);
				(new ParcelItem(parcel)).getLongAndLat();
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
		const table = createTable();

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
			receiver = document.getElementById("parcel-receiver"),
			phoneNumber = document.getElementById("receiver-phone"),
			price = document.getElementById("parcel-price"),
			status = document.getElementById("parcel-status"),
			parcelId = document.getElementById("parcel-Id");

		name.innerText = parcel.parcelname;
		destination.innerText = parcel.destination;
		pickup.innerText = parcel.pickuplocation;
		receiver.innerText = parcel.receiver;
		phoneNumber.innerText = parcel.phonenumber;
		price.innerText = `N${parcel.price}`;
		status.innerText = parcel.status;
		parcelId.innerText = `PO${parcel.id}`;
	}
}

Parcel.filteredCollection = [];
Parcel.collection = [];
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

function createTable() {
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

// Implementing the create parcel modal
let createParcel = document.getElementById("createParcel");
if (createParcel !== null) {
	createParcel.addEventListener('submit', Parcel.createParcel);
}


function handleErrors(res) {
	if(!res.ok) {
    console.log(res);
    if(res.statusText === 'Bad Request') {
      notif.make({text: 'Create Parcel Failed, You are Offline', type: 'danger' })
    }
		throw new Error(res.statusText);
	}
	return res.json();
}

function hide(modal) {
	modal.style.display = 'none';
}

const notif = new Notification()
document.body.append(notif.getElement());

