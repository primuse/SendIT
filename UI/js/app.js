window.addEventListener('load', () => {
  resize();
  modalSetup();
})

window.addEventListener('resize', function () {
  resize();
})

const $ = (selector) => {
  return document.querySelector(selector)
};

// Function to hide and show side menu
function resize() {
  let deviceWidth = window.innerWidth;
  let aside = $('aside');
  let asideClass = aside.classList;

  if (deviceWidth <= 767) {
    $('#main-content-page').addEventListener('click', () => {
      asideClass.remove('fade-in');
      asideClasslass.remove('toggled-nav')
    });

    $('#toggle').addEventListener('click', () => {
      asideClass.add('fade-in')
      asideClass.add('toggled-nav');
    });
  }
}

// Function to validate if element is on the DOM and call Modal function
function validate(btn, modal) {
  if (btn !== null) {
    btn.onclick = () => toggleModal(modal);
  }
}

// Function to open and close modal
function toggleModal(modalElement) {
  modalElement.style.display = 'block';
  modalElement.show = function () {
    this.style.display = "block";
  }
  modalElement.hide = function () {
    this.style.display = "none";
  }
  window.onclick = function (event) {
    if (event.target == modalElement) {
      modalElement.hide();
    }
  }
}

// Funtion to get all Modal Buttons and their respective modals
function modalSetup() {
  const modalButtons = document.querySelectorAll('[data-modal]');

  for (let button of modalButtons) {
    let targetModal = button.getAttribute('data-target');
    validate(button, $(targetModal));
  }
}

// Function to create google map
const MapObject = {}

function initMap() {
  const mapCont = document.getElementById('map');

  MapObject.cont = mapCont;
  MapObject.geocoder = new google.maps.Geocoder();
  MapObject.map = new google.maps.Map(mapCont, {
      zoom: 7,
      center: { lat: 6.517400, lng: 3.361030 }
    });
}

function drawFlightPath(startPoint, endPoint) {
  var flightPlanCoordinates = [ startPoint, endPoint ];
  var flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  flightPath.setMap(MapObject.map);
}


function getLongAndLat(address) {
  return new Promise((res, rej) => {
    MapObject.geocoder.geocode({
      address
    }, (results, status) => {
      if (status == 'OK') {
        const {location: position} = results[0].geometry;

        setMarker(position);
        res(position); 
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  });
}

function setMarker (position) {
  const marker = new google.maps.Marker({ map: MapObject.map, position})
}

const logout = document.getElementById('logout')
if(logout) {
  logout.addEventListener('click', () => {
    localStorage.clear();
  })
}

function isLoggedIn() {
  const token = localStorage.getItem('token');
  if(!token) {
    window.location = '/UI';
  }
}
isLoggedIn();