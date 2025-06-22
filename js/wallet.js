const cardRenderers = {
  comm: commCard,
  citi: citiCard,
  ing: ingCard,
  medicare: medicareCard
};

// Function to display a card in a new window
function displayCard(cardType, data) {
  const params = new URLSearchParams();
  
  if (cardType === 'medicare') {
    if (data.fullName) params.append('fullName', data.fullName);
    if (data.medicareNumber) params.append('medicareNumber', data.medicareNumber);
    if (data.refNumber) params.append('refNumber', data.refNumber);
    if (data.expiry) params.append('expiry', data.expiry);
  } else {
    if (data.name) params.append('name', data.name);
    if (data.number) params.append('number', formatCardNumber(data.number));
    if (data.exp) params.append('exp', data.exp);
    if (data.cvv) params.append('cvv', data.cvv);
  }
  
  // Open card in a new window
  const cardWindow = window.open(`cards/${cardType}_card.html?${params.toString()}`, '_blank', 
    'width=400,height=300,resizable=yes,scrollbars=no,status=no');
  
  if (!cardWindow) {
    alert('Please allow pop-ups to view your digital card.');
  }
}

function formatCardNumber(number) {
  return number.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
}

function validateForm(inputs, cardType) {
  let isValid = true;
  document.querySelectorAll('.error').forEach(error => error.style.display = 'none');

  if (cardType === 'medicare') {
    if (!/^[A-Za-z\s]{2,50}$/.test(inputs.fullName)) {
      document.getElementById('fullNameError').style.display = 'block';
      isValid = false;
    }
    // Remove any spaces before validating Medicare number
    const medicareRaw = inputs.medicareNumber.replace(/\D/g, '');
    if (medicareRaw.length !== 10) {
      document.getElementById('medicareNumberError').style.display = 'block';
      isValid = false;
    }
    if (!/^\d{1,2}$/.test(inputs.refNumber)) {
      document.getElementById('refNumberError').style.display = 'block';
      isValid = false;
    }
    if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(inputs.expiry)) {
      document.getElementById('expiryError').style.display = 'block';
      isValid = false;
    }
  } else {
    if (!/^[A-Za-z\s]{2,50}$/.test(inputs.name)) {
      document.getElementById('nameError').style.display = 'block';
      isValid = false;
    }
    // Remove any spaces before validating card number
    const cardRaw = inputs.number.replace(/\D/g, '');
    if (cardRaw.length !== 16) {
      document.getElementById('numberError').style.display = 'block';
      isValid = false;
    }
    if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(inputs.exp)) {
      document.getElementById('expError').style.display = 'block';
      isValid = false;
    }
    if (!/^\d{3,4}$/.test(inputs.cvv)) {
      document.getElementById('cvvError').style.display = 'block';
      isValid = false;
    }
  }
  return isValid;
}

document.addEventListener('DOMContentLoaded', () => {
  const pathParts = window.location.pathname.split('/');
  const htmlFileName = pathParts[pathParts.length - 1];
  const cardType = htmlFileName.replace('.html', '').replace('_form', '');
  
  // Set up form submission
  const cardForm = document.getElementById('cardForm');
  if (cardForm) {
    cardForm.addEventListener('submit', e => {
      e.preventDefault();
      
      const formData = {};
      
      if (cardType === 'medicare') {
        formData.fullName = document.getElementById('fullName').value;
        formData.medicareNumber = document.getElementById('medicareNumber').value;
        formData.refNumber = document.getElementById('refNumber').value;
        formData.expiry = document.getElementById('expiry').value;
      } else {
        formData.name = document.getElementById('name').value;
        formData.number = document.getElementById('number').value;
        formData.exp = document.getElementById('exp').value;
        formData.cvv = document.getElementById('cvv').value;
      }
      
      if (validateForm(formData, cardType)) {
        displayCard(cardType, formData);
      }
    });
  }

  // Format expiry date inputs automatically as MM/YY
  const expiryInputs = document.querySelectorAll('input[id="exp"], input[id="expiry"]');
  expiryInputs.forEach(input => {
    if (input) {
      input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) {
          value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
      });
    }
  });
  // Function to display a card in a new window with proper paths
function displayCard(cardType, data) {
  const params = new URLSearchParams();
  
  if (cardType === 'medicare') {
    if (data.fullName) params.append('fullName', data.fullName);
    if (data.medicareNumber) params.append('medicareNumber', data.medicareNumber);
    if (data.refNumber) params.append('refNumber', data.refNumber);
    if (data.expiry) params.append('expiry', data.expiry);
  } else {
    if (data.name) params.append('name', data.name);
    if (data.number) params.append('number', formatCardNumber(data.number));
    if (data.exp) params.append('exp', data.exp);
    if (data.cvv) params.append('cvv', data.cvv);
  }
  
  // Open card in a new window with the proper path resolution
  const cardWindow = window.open(`../cards/${cardType}_card.html?${params.toString()}`, '_blank', 
    'width=400,height=300,resizable=yes,scrollbars=no,status=no');
  
  if (!cardWindow) {
    alert('Please allow pop-ups to view your digital card.');
  }
}
  
  // Format card number inputs with spaces
  const cardNumberInputs = document.querySelectorAll('input[id="number"], input[id="medicareNumber"]');
  cardNumberInputs.forEach(input => {
    if (input) {
      input.addEventListener('input', function(e) {
        // Remove non-digits
        let value = e.target.value.replace(/\D/g, '');
        
        // Apply specific formatting based on the input type
        if (input.id === 'medicareNumber') {
          // Medicare numbers get formatted as XXXX XXXXX X
          if (value.length > 9) {
            value = value.substring(0, 4) + ' ' + value.substring(4, 9) + ' ' + value.substring(9, 10);
            // Limit to 10 digits total
            if (value.length > 12) { // 10 digits + 2 spaces
              value = value.substring(0, 12);
            }
          } else if (value.length > 4) {
            value = value.substring(0, 4) + ' ' + value.substring(4);
          }
          e.target.value = value;
        } else {
          // Credit card numbers get 4-digit grouping
          e.target.value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
          // Limit to 16 digits (19 with spaces)
          if (value.length > 16) {
            e.target.value = e.target.value.substring(0, 19);
          }
        }
      });
      
      // Add blur handler for input validation
      input.addEventListener('blur', function() {
        const rawValue = input.value.replace(/\s/g, '');
        let errorElementId;
        let expectedLength;
        
        if (input.id === 'medicareNumber') {
          errorElementId = 'medicareNumberError';
          expectedLength = 10;
        } else {
          errorElementId = 'numberError';
          expectedLength = 16;
        }
        
        const errorElement = document.getElementById(errorElementId);
        if (errorElement) {
          if (rawValue.length !== expectedLength) {
            errorElement.style.display = 'block';
          } else {
            errorElement.style.display = 'none';
          }
        }
      });
    }
  });

  // Function to update card display based on card type
  function updateCardDisplay(cardType, params) {
    if (cardType === 'medicare') {
      const cardNumber = document.querySelector('.card-number');
      const name = document.querySelector('.name');
      const expiry = document.querySelector('.expiry');
      
      if (cardNumber) {
        const number = params.get('number') || '1234 5 67890';
        // Format Medicare number properly if it's just digits
        const formattedNumber = formatMedicareNumber(number);
        cardNumber.textContent = formattedNumber;
      }
      if (name) name.textContent = params.get('name') || 'ALEX TAYLOR';
      if (expiry) expiry.textContent = params.get('expiry') || '06/30';
    } else {
      // ...existing code for credit cards...
    }
  }
  
  // Helper function to format Medicare number
  function formatMedicareNumber(number) {
    const digitsOnly = number.replace(/\D/g, '');
    if (digitsOnly.length === 10) {
      return digitsOnly.substring(0, 4) + ' ' + 
             digitsOnly.substring(4, 9) + ' ' + 
             digitsOnly.substring(9, 10);
    }
    return number;
  }
});

// Function to validate Medicare card data
function validateMedicareNumber(medicareNumber) {
  const digitsOnly = medicareNumber.replace(/\D/g, '');
  return digitsOnly.length === 10;
}