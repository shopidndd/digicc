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
  if (flipButton) {
    flipButton.addEventListener('click', () => {
      cardInner.classList.toggle('flipped');
    });
  }

  // Close fullscreen
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      fullscreen.classList.remove('active');
      formContainer.classList.add('active');
    });
  }

  // Reset error messages when user starts typing
  document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', function() {
      const errorId = input.id + 'Error';
      const errorElement = document.getElementById(errorId);
      if (errorElement) {
        errorElement.style.display = 'none';
      }
    });
  });

  // Form submit
  if (cardForm) {
    cardForm.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const name = document.getElementById('name').value.trim();
      const numberInput = document.getElementById('number').value.trim();
      const number = numberInput.replace(/\D/g, ''); // Remove spaces for validation
      const exp = document.getElementById('exp').value.trim();
      const cvv = document.getElementById('cvv').value.trim();
  
      // Reset error messages
      document.querySelectorAll('.error').forEach(err => err.style.display = 'none');
      
      // Validate each field
      let isValid = true;
      
      if (!/^[A-Za-z\s]{2,50}$/.test(name)) {
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
      }
      
      if (number.length !== 16) {
        document.getElementById('numberError').style.display = 'block';
        isValid = false;
      }
      
      if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(exp)) {
        document.getElementById('expError').style.display = 'block';
        isValid = false;
      }
      
      if (!/^\d{3,4}$/.test(cvv)) {
        document.getElementById('cvvError').style.display = 'block';
        isValid = false;
      }
  
      if (isValid) {
        ingCard.renderCard({ 
          name, 
          number: numberInput, // Use the formatted number for display
          exp, 
          cvv 
        });
        formContainer.classList.remove('active');
        fullscreen.classList.add('active');
      }
    });
  }
});
