
let myDocument = $(document),
    deviceWidth = myDocument.width();

// To hide and dsiplay side menu
if (deviceWidth <= 767) {
  $(document).click(function(){
    $('aside').fadeOut(500);
  })
  $(document).on('click', '#toggle', (event) => {
    $('aside').fadeIn(500).addClass('toggled-nav');
    event.stopPropagation();
  })
  $(document).on('click', 'aside', (event) => {
    event.stopPropagation();
  })
}

// Modals
let parcelModal = document.getElementById('parcelmodal'),
    cancelModal = document.getElementById('cancel-modal'),
    destinationModal = document.getElementById('destination-modal'),
    profileModal = document.getElementById('profile-modal'),
    locationModal = document.getElementById('location-modal'),
    updateModal = document.getElementById('update-modal');

// Buttons
let parcelBtn = document.getElementById('parcel-modal-open'),
    parcelBtn2 = document.getElementById('parcel-modal'),
    cancelBtn = document.getElementById('cancel-parcel'),
    profileBtn = document.getElementById('profile-btn')
    destinationBtn = document.getElementById('change-destination'),
    locationBtn = document.getElementById('change-location'),
    updateBtn = document.getElementById('update-status');


Validate(parcelBtn, parcelModal);
Validate(parcelBtn2, parcelModal);
Validate(cancelBtn, cancelModal);
Validate(profileBtn, profileModal);
Validate(destinationBtn, destinationModal);
Validate(locationBtn, locationModal);
Validate(updateBtn, updateModal);

// Function to validate if element is on the DOM and call Modal function
function Validate(btn, modal) {
  if (btn !== null) {
    btn.onclick = () => Modal(modal);
  }
}


// Function to open and close modal
function Modal(modalId) {
  modalId.style.display = 'block';
  window.onclick = function(event) {
    if (event.target == modalId) {
      modalId.style.display = "none";
    }
  }
}

