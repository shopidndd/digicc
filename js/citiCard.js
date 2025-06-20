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
  const flipButton = document.getElementById('flipButton');
  flipButton.addEventListener('click', () => {
    document.getElementById('cardInner').classList.toggle('flipped');
  });
  
  document.getElementById('closeButton').addEventListener('click', () => {
    document.getElementById('fullscreen').classList.remove('active');
    document.getElementById('formContainer').classList.add('active');
  });
  document.getElementById('cardForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value.trim();
    const number = document.getElementById('number').value.trim();
    const exp = document.getElementById('exp').value.trim();
    const cvv = document.getElementById('cvv').value.trim();
  
    if (name && number && exp && cvv) {
      ingCard.renderCard({ name, number, exp, cvv });
      document.getElementById('formContainer').classList.remove('active');
      document.getElementById('fullscreen').classList.add('active');
    }
  });
  