const citiCard = {
    config: {
      name: 'Citibank',
      frontImage: 'images/citibank_visa_front.png',
      backImage: 'images/citibank_visa_back.png',
      logo: 'images/citi_logo.png',
      logoAlt: 'Citibank Logo'
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

function formatCardNumber(number) {
  return number.replace(/\s+/g, '').replace(/(.{4})/g, '$1 ').trim();
}

document.addEventListener('DOMContentLoaded', function() {
  const cardForm = document.getElementById('cardForm');
  const formContainer = document.getElementById('formContainer');
  const fullscreen = document.getElementById('fullscreen');
  const cardInner = document.getElementById('cardInner');
  const flipButton = document.getElementById('flipButton');
  const closeButton = document.getElementById('closeButton');

  // Flip functionality
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

  // Only attach the event handler if the form exists
  if (cardForm) {
    cardForm.addEventListener('submit', function(e) {
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
        citiCard.renderCard({
          name, 
          number: numberInput, 
          exp, 
          cvv 
        });
        formContainer.classList.remove('active');
        fullscreen.classList.add('active');
      }
    });
  }
});
