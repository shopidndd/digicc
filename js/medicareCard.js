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

// Function to format Medicare number in XXXX XXXXX X format (correct Medicare format)
function formatMedicareNumber(medicareNumber) {
  const digitsOnly = medicareNumber.replace(/\D/g, '');
  if (digitsOnly.length === 10) {
    return digitsOnly.substring(0, 4) + ' ' + 
           digitsOnly.substring(4, 9) + ' ' + 
           digitsOnly.substring(9, 10);
  }
  return medicareNumber; // Return as is if not exactly 10 digits
}

document.addEventListener('DOMContentLoaded', function () {
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

  // Only process form if we're on the Medicare form page
  if (cardForm && document.title.includes('Medicare')) {
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
    
    // Form validation and submission
    cardForm.addEventListener('submit', function (e) {
      e.preventDefault();
      
      // Get and validate form values
      const fullName = document.getElementById('fullName').value.trim();
      const medicareInput = document.getElementById('medicareNumber');
      const medicareRaw = medicareInput.value.replace(/\D/g, '');
      const expiry = document.getElementById('expiry').value.trim();
      const refNumber = document.getElementById('refNumber').value.trim();
      
      // Reset error messages
      document.querySelectorAll('.error').forEach(err => err.style.display = 'none');
      
      // Validate each field
      let isValid = true;
      
      // Validate name
      if (!/^[A-Za-z\s]{2,50}$/.test(fullName)) {
        document.getElementById('fullNameError').style.display = 'block';
        isValid = false;
      }
      
      // Validate Medicare number - must be exactly 10 digits
      if (medicareRaw.length !== 10) {
        document.getElementById('medicareNumberError').style.display = 'block';
        isValid = false;
      }
      
      // Validate reference number
      if (!/^\d{1,2}$/.test(refNumber)) {
        document.getElementById('refNumberError').style.display = 'block';
        isValid = false;
      }
      
      // Validate expiry date
      if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(expiry)) {
        document.getElementById('expiryError').style.display = 'block';
        isValid = false;
      }
      
      // If all valid, render card
      if (isValid) {
        medicareCard.renderCard({
          fullName,
          medicareNumber: medicareRaw,
          expiry,
          refNumber
        });
        
        formContainer.classList.remove('active');
        fullscreen.classList.add('active');
      }
    });
  }
});