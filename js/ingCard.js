const ingCard = {
  config: {
    name: 'ING Bank',
    frontImage: 'images/ing_visa_front.png',
    backImage: 'images/ing_visa_back.png',
    logo: 'images/ing_logo.png',
    logoAlt: 'ING Bank Logo'
  },
  renderCard(data) {
    const cardFront = document.getElementById('cardFront');
    const cardBack = document.getElementById('cardBack');
    const cardNumber = document.getElementById('cardNumber');
    const cardholderName = document.getElementById('cardholderName');
    const expiryDate = document.getElementById('expiryDate');
    const cvvBack = document.getElementById('cvvBack');

    cardFront.style.backgroundImage = `url(${this.config.frontImage})`;
    cardBack.style.backgroundImage = `url(${this.config.backImage})`;
    cardNumber.textContent = formatCardNumber(data.number);
    cardholderName.textContent = data.name;
    expiryDate.textContent = data.exp;
    cvvBack.textContent = data.cvv;
  }
};

// Utility function
function formatCardNumber(number) {
  return number.replace(/\s+/g, '').replace(/(.{4})/g, '$1 ').trim();
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  const cardForm = document.getElementById('cardForm');
  const formContainer = document.getElementById('formContainer');
  const fullscreen = document.getElementById('fullscreen');
  const cardInner = document.getElementById('cardInner');
  const flipButton = document.getElementById('flipButton');
  const closeButton = document.getElementById('closeButton');

  // Flip card
  flipButton.addEventListener('click', () => {
    cardInner.classList.toggle('flipped');
  });

  // Close fullscreen
  closeButton.addEventListener('click', () => {
    fullscreen.classList.remove('active');
    formContainer.classList.add('active');
  });

  // Form submit
  cardForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const number = document.getElementById('number').value.trim();
    const exp = document.getElementById('exp').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    if (name && number && exp && cvv) {
      ingCard.renderCard({ name, number, exp, cvv });
      formContainer.classList.remove('active');
      fullscreen.classList.add('active');
    }
  });
});
