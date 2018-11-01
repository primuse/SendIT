
let myDocument = $(document);

let deviceWidth = myDocument.width();


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

let parcelModal = document.getElementById('parcelmodal');
let destinationModal = document.getElementById('destination-modal');
let parcelBtn = document.getElementById('parcel-modal-open');
let destinationBtn = document.getElementById('change-destination');
let cancelBtn = document.getElementById('cancel-parcel')
parcelBtn.onclick = () => Modal(parcelmodal); 
destinationBtn.onclick = () => Modal(destinationModal);



function Modal(modalId) {
  modalId.style.display = 'block';
  window.onclick = function(event) {
  if (event.target == modalId) {
    modalId.style.display = "none";
  }
}
}

