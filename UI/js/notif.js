class Notification {
	constructor() {
		this.notification = this.createNotif()
	}

	getElement() {
		return this.notification
	}

	changeText(text) {
		this.notification.querySelector('span').innerText = text
		return this
	}
	changeType(type) {
		const types = {
			danger: 'is-danger',
			success: 'is-success',
			warning: 'is-warning',
			info: 'is-info'
		}
		const keys = Object.keys(types);
		if(keys.includes(type)) {
			const className = types[type];
			const replaced = this.notification.classList[1];
			this.notification.classList.replace(replaced, className);
		}
	}

	make(props = {}) {
		this.changeText(props.text);
		this.changeType(props.type);
		const time = props.text.split(' ').length * 1000;
		setTimeout(() => {
			this.notification.classList.remove('swipe-left');
		}, time)
		this.notification.classList.add('swipe-left');
	}

	createNotif() {
		const notif = createElement('div', ['notification', 'is-info'], [{
			rel: 'js-notification js-notion'
		}])
		const span = createElement('span')
		notif.appendChild(span)

		return notif
	}
}

function createElement(tag, classes = [], attribs = []) {
	const el = document.createElement(tag)

	classes.forEach(className => el.classList.add(className));
	attribs.forEach(attribute => {
		const key = Object.keys(attribute)[0]
		el.setAttribute(key, attribute[key])
	})
	return el
}