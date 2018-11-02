window.addEventListener('load', () => {
    resize();
    modalSetup();
})

window.addEventListener('resize', function() {
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
    modalElement.show = function() {
        this.style.display = "block";
    }
    modalElement.hide = function() {
        this.style.display = "none";
    }
    const buttons = modalElement.querySelectorAll('button[type=submit]');
    for (let button of buttons) {
        button.addEventListener("click", () => {
            modalElement.hide();
        });
    }
    window.onclick = function(event) {
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