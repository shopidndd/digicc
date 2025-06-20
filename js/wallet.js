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
    if (!/^\d{10}$/.test(inputs.medicareNumber)) {
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
    if (!/^\d{16}$/.test(inputs.number)) {
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
  
  // Format card number inputs with spaces
  const cardNumberInputs = document.querySelectorAll('input[id="number"], input[id="medicareNumber"]');
  cardNumberInputs.forEach(input => {
    if (input) {
      input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (input.id === 'number') {
          // Credit card: Groups of 4
          value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        } else if (input.id === 'medicareNumber') {
          // Medicare: Groups of 3-3-4
          if (value.length > 9) {
            value = value.substring(0, 10);
          }
          if (value.length > 6) {
            value = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
          } else if (value.length > 3) {
            value = value.substring(0, 3) + ' ' + value.substring(3);
          }
        }
        e.target.value = value;
      });
    }
  });
});