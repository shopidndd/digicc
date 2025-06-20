const medicareCard = {
  config: {
    name: 'Medicare',
    frontImage: 'images/medicare_front.png',
    backImage: 'images/medicare_back.png',
    logo: 'images/medicare_logo.png',
    logoAlt: 'Medicare Logo'
  },
  renderCard(data) {
    const cardFront = document.getElementById('cardFront');
    const cardBack = document.getElementById('cardBack');
    const cardNumber = document.getElementById('cardNumber');
    const cardholderName = document.getElementById('fullNameDisplay');
    const expiryDate = document.getElementById('expiryDate');
    const refNumberBack = document.getElementById('refNumberBack');

    cardFront.style.backgroundImage = `url(${this.config.frontImage})`;
    cardBack.style.backgroundImage = `url(${this.config.backImage})`;
    cardNumber.textContent = formatMedicareNumber(data.medicareNumber);
    cardholderName.textContent = data.fullName;
    expiryDate.textContent = data.expiry;
    refNumberBack.textContent = `Ref: ${data.refNumber}`;
  }
};

document.addEventListener('DOMContentLoaded', function () {
  const cardForm = document.getElementById('cardForm');
  const formContainer = document.getElementById('formContainer');
  const fullscreen = document.getElementById('fullscreen');
  const cardInner = document.getElementById('cardInner');
  const flipButton = document.getElementById('flipButton');
  const closeButton = document.getElementById('closeButton');

  // Flip functionality
  flipButton.addEventListener('click', () => {
    cardInner.classList.toggle('flipped');
  });

  // Close fullscreen
  closeButton.addEventListener('click', () => {
    fullscreen.classList.remove('active');
    formContainer.classList.add('active');
  });

  // Handle form submission
  cardForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const medicareNumber = document.getElementById('medicareNumber').value.trim();
    const expiry = document.getElementById('expiry').value.trim();
    const refNumber = document.getElementById('refNumber').value.trim();

    if (fullName && medicareNumber && expiry && refNumber) {
      medicareCard.renderCard({ fullName, medicareNumber, expiry, refNumber });
      formContainer.classList.remove('active');
      fullscreen.classList.add('active');
    }
  });

  // Format Medicare number as XXXX XXXX XXXX
  function formatMedicareNumber(number) {
    return number.replace(/\s+/g, '').replace(/(.{4})/g, '$1 ').trim();
  }
});
