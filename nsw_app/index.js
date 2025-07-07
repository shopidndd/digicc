document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Handle Android back button
    document.addEventListener('backbutton', function() {
        if (document.querySelector('.container.active') !== document.getElementById('home')) {
            navigate('home');
        } else {
            navigator.app.exitApp();
        }
    }, false);

    // Initialize random placeholder images
    initializeRandomImages();

    // Initial navigation
    navigate('home');
}

function navigate(sectionId) {
    document.querySelectorAll('.container').forEach(container => {
        container.classList.remove('active');
    });
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    document.querySelector(`[onclick="navigate('${sectionId}')"]`).classList.add('active');
}

document.getElementById('cardForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = {
        fullName: document.getElementById('fullName').value,
        cardNumber: document.getElementById('cardNumber').value,
        expiryDate: document.getElementById('expiryDate').value
    };
    const newCard = document.getElementById('newCard');
    newCard.style.display = 'block';
    newCard.innerHTML = `
        <div class="card-content">
            <h2>Driver Licence</h2>
            <p>Name: ${formData.fullName}</p>
            <p>Licence Number: ${formData.cardNumber}</p>
            <p>Expiry Date: ${formData.expiryDate}</p>
        </div>
        <img src="assets/nsw_cardmenulogo.png" alt="NSW Logo" class="card-image" />
    `;
    document.getElementById('cardForm').reset();
});

function initializeRandomImages() {
    const items = document.querySelectorAll('.featured-item');
    const placeholderSizes = [
        '200x100', '200x120', '200x110', '200x115'
    ];

    items.forEach(item => {
        const imageId = item.getAttribute('data-image-id');
        const randomSize = placeholderSizes[Math.floor(Math.random() * placeholderSizes.length)];
        const placeholderUrl = `https://via.placeholder.com/${randomSize}?text=${imageId.charAt(0).toUpperCase() + imageId.slice(1)}`;
        item.querySelector('.placeholder-image').src = placeholderUrl;
    });
}