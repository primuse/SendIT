window.addEventListener('load', () => {
  resize();
})

window.addEventListener('resize', function() {
  resize();
})

const $ = (selector) => {
  return document.querySelector(selector)
};

var viewportwidth;
var viewportheight;

function resize() {
  let
    deviceWidth = window.innerWidth;
    console.log(deviceWidth);
    console.log(typeof window.innerWidth);
  if (typeof window.innerWidth == 'number') {
    viewportwidth = window.innerWidth,
    viewportheight = window.innerHeight
    console.log(viewportwidth)
    if(viewportwidth <= 700) {
      window.reload;
      }
  }

  let aside = $('aside');
  let asideClass = aside.classList;
  
  // To hide and dsiplay side menu
  if (deviceWidth <= 767) {
    
    $('#main-content-page').addEventListener('click', () => {
      // asideClass.add('fade-out');
      asideClass.remove('fade-in');
    });
     
    $('#toggle').addEventListener('click', (event) => {
      console.log('am clicking on toggle');
      
      asideClass.add('fade-in')
      asideClass.toggle('toggled-nav');
      
      event.stopPropagation();
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
  modalElement.show = function() {    
    this.style.display = "block";
  }
  modalElement.hide = function() {
    this.style.display = "none";
  }
  
  const buttons = modalElement.querySelectorAll('button[type=submit]');
  for(let button of buttons) {
    button.addEventListener("click", () => {
      modalElement.hide();
    });
  }
  window.onclick = function(event) {
    if (event.target == modalId) {
      modalElement.show();
    }
  }
}

const buttons = document.querySelectorAll('[data-modal]');

for(let button of buttons) {
  let targetModal = button.getAttribute('data-target');
  
  validate(button, $(targetModal));
}