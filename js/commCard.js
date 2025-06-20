const commCard = {
  config: {
    name: 'Commonwealth Bank',
    frontImage: '/Users/adminadmin/cc/images/comm_master_front.png',
    backImage: '/Users/adminadmin/cc/images/comm_master_back.png',
    logo: 'images/comm_logo.png',
    logoAlt: 'Commonwealth Bank Logo'
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

document.addEventListener('DOMContentLoaded', function() {
  const cardForm = document.getElementById('cardForm');
  const formContainer = document.getElementById('formContainer');
  const cardInner = document.getElementById('cardInner');
  const fullscreen = document.getElementById('fullscreen');

  const flipButton = document.getElementById('flipButton');
  const closeButton = document.getElementById('closeButton');

  flipButton.addEventListener('click', () => {
    cardInner.classList.toggle('flipped');
  });

  closeButton.addEventListener('click', () => {
    fullscreen.classList.remove('active');
    formContainer.classList.add('active');
  });

  cardForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const number = document.getElementById('number').value.trim();
    const exp = document.getElementById('exp').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    if (name && number && exp && cvv) {
      commCard.renderCard({ name, number, exp, cvv });
      formContainer.classList.remove('active');
      fullscreen.classList.add('active');
    }
  });

  function formatCardNumber(number) {
    return number.replace(/\s+/g, '').replace(/(.{4})/g, '$1 ').trim();
  }
});
