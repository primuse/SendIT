const $ = selector => document.querySelector(selector);

// Function to hide and show side menu
function resize() {
  const deviceWidth = window.innerWidth;
  const aside = $('aside');
  const asideClass = aside.classList;
  if (deviceWidth <= 767) {
    $('#main-content-page').addEventListener('click', () => {
      asideClass.remove('fade-in');
      asideClass.remove('toggled-nav');
    });

    $('#toggle').addEventListener('click', () => {
      asideClass.add('fade-in');
      asideClass.add('toggled-nav');
    });
  }
}

// Function to open and close modal
function toggleModal(modalElement) {
  const modalm = modalElement;
  modalm.style.display = 'block';
  modalm.show = () => {
    modalm.style.display = 'block';
  };
  modalm.hide = () => {
    modalm.style.display = 'none';
  };
  const buttons = modalm.querySelectorAll('button[type=submit]');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      modalm.hide();
    });
  });

  window.onclick = (event) => {
    if (event.target === modalm) {
      modalm.hide();
    }
  };
}


// Function to validate if element is on the DOM and call Modal function
function validate(btn, modal) {
  if (btn !== null) {
    btn.addEventListener('click', toggleModal(modal));
  }
}

// Funtion to get all Modal Buttons and their respective modals
function modalSetup() {
  const modalButtons = document.querySelectorAll('[data-modal]');
  modalButtons.forEach((modalButton) => {
    const targetModal = modalButton.getAttribute('data-target');
    validate(modalButton, $(targetModal));
  });
}

window.addEventListener('load', () => {
  resize();
  modalSetup();
});

window.addEventListener('resize', () => {
  resize();
});
