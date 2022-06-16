const mobileMenubtnElement = document.getElementById('mobile-menu-btn');
const mobileMenuElement = document.getElementById('mobile-menu');

function toggleMenuVisibility() {
    mobileMenuElement.classList.toggle('d-flex');
}

if (mobileMenubtnElement && mobileMenuElement) {
    mobileMenubtnElement.addEventListener('click', toggleMenuVisibility)
}