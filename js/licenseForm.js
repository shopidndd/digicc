let uploadedImage = localStorage.getElementById('uploadedImage') || null;

function initializeForm(page) {
  if (page === 'license-section') {
    initializeLicenseForm();
  } else if (page === 'credit-card-form') {
    const fields = ['ccFullName', 'ccNumber', 'ccExpiry'];
    fields.forEach(id => {
      const input = document.getElementById(id);
      if (input) input.value = ccDetails[id] || '';
    });
    document.querySelector('.submit-button').onclick = saveCcDetails;
    document.querySelector('.back-button').onclick = () => loadPage('credit-card-menu');
  } else if (page === 'medicare-form') {
    const fields = ['medicareFullName', 'medicareNumber'];
    fields.forEach(id => {
      const input = document.getElementById(id);
      if (input) input.value = medicareDetails[id] || '';
    });
    document.querySelector('.submit-button').onclick = saveMedicareDetails;
    document.querySelector('.back-button').onclick = () => loadPage('medicare-menu');
  }
}

function initializeLicenseForm() {
  const form = document.getElementById('licenseForm');
  if (!form) return;

  const savedDetails = JSON.parse(localStorage.getItem('licenseDetails')) || {};
  
  // Define form fields and their validation rules
  const fields = [
    {
      id: 'lastName',
      label: 'Last Name',
      type: 'text',
      required: true,
      validation: /^[A-Za-z\s-']{2,50}$/
    },
    {
      id: 'firstName',
      label: 'First Name',
      type: 'text',
      required: true,
      validation: /^[A-Za-z\s-']{2,50}$/
    },
    {
      id: 'middleName',
      label: 'Middle Name (Optional)',
      type: 'text',
      required: false,
      validation: /^[A-Za-z\s-']{0,50}$/
    },
    {
      id: 'licenseNumber',
      label: 'License Number',
      type: 'text',
      required: true,
      validation: /^[A-Z0-9]{5,10}$/,
      transform: value => value.toUpperCase()
    },
    {
      id: 'cardNumber',
      label: 'Card Number',
      type: 'text',
      required: true,
      validation: /^\d{8,9}$/
    },
    {
      id: 'dob',
      label: 'Date of Birth',
      type: 'date',
      required: true,
      validation: date => {
        const now = new Date();
        const input = new Date(date);
        return input < now && input > new Date(now - 120 * 365 * 24 * 60 * 60 * 1000);
      }
    },
    {
      id: 'expiryDate',
      label: 'Expiry Date',
      type: 'date',
      required: true,
      validation: date => {
        const now = new Date();
        const input = new Date(date);
        return input > now;
      }
    }
  ];

  // Create and attach input listeners
  fields.forEach(field => {
    const input = document.getElementById(field.id);
    if (!input) return;

    // Set initial value if exists
    if (savedDetails[field.id]) {
      input.value = savedDetails[field.id];
    }

    // Add input validation
    input.addEventListener('input', (e) => {
      let value = e.target.value;
      if (field.transform) {
        value = field.transform(value);
        e.target.value = value;
      }

      const isValid = field.type === 'date' 
        ? field.validation(value)
        : field.validation.test(value);

      const errorElement = input.parentElement.querySelector('.error-message');
      if (errorElement) {
        errorElement.textContent = isValid ? '' : `Please enter a valid ${field.label.toLowerCase()}`;
        errorElement.classList.toggle('hidden', isValid);
      }

      // Update preview if available
      updateLicensePreview();
    });
  });

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    saveLicenseDetails();
  });
}

function updateLicensePreview() {
  const previewElements = document.querySelectorAll('[data-preview]');
  if (!previewElements.length) return;

  previewElements.forEach(element => {
    const fieldId = element.dataset.preview;
    const input = document.getElementById(fieldId);
    if (input) {
      element.textContent = input.value || '[Not Set]';
    }
  });
}

function initializeUpload() {
  const dropArea = document.getElementById('dropArea');
  const imageUploadInput = document.getElementById('imageUpload');
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, e => {
      e.preventDefault();
      dropArea.classList.toggle('dragover', eventName === 'dragenter' || eventName === 'dragover');
      document.getElementById('dragFeedback').classList.toggle('hidden', eventName !== 'dragenter' && eventName !== 'dragover');
    });
  });
  dropArea.addEventListener('drop', function(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImage(file);
    dropArea.classList.remove('dragover');
  });
  imageUploadInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    handleImage(file);
  });
  document.getElementById('removeImage').addEventListener('click', removeImage);
}

function handleImage(file) {
  if (file && file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024) {
    const reader = new FileReader();
    reader.onload = function(e) {
      uploadedImage = e.target.result;
      localStorage.setItem('uploadedImage', uploadedImage);
      const img = document.getElementById('imagePreview') || document.createElement('img');
      img.src = uploadedImage;
      img.classList.add('image-preview', 'max-w-full', 'max-h-48', 'rounded-lg', 'border-2', 'border-gray-400', 'mb-4');
      if (!document.getElementById('imagePreview')) document.querySelector('.image-upload-container').appendChild(img);
      img.classList.remove('hidden');
      document.getElementById('removeImage').classList.remove('hidden');
      updateProgress();
    };
    reader.readAsDataURL(file);
  } else {
    alert('Please upload a valid image file (max 5MB).');
  }
}

function removeImage() {
  uploadedImage = null;
  localStorage.removeItem('uploadedImage');
  document.getElementById('imagePreview').classList.add('hidden');
  document.getElementById('imageUpload').value = '';
  document.getElementById('removeImage').classList.add('hidden');
  updateProgress();
}

function saveImage() {
  if (!uploadedImage) {
    alert("Please upload an image.");
    return;
  }
  alert("Image saved!");
  loadPage('license-menu');
}

function initializeStateSelection() {
  const stateButtonsContainer = document.getElementById('stateButtonsContainer');
  appConfig.availableStates.forEach(stateName => {
    const button = document.createElement('button');
    button.className = 'menu-button w-full py-4 rounded-full text-white bg-blue-700 hover:bg-blue-600 font-semibold transition-all active:scale-95';
    button.textContent = stateName;
    button.setAttribute('aria-label', `Select ${stateName}`);
    button.onclick = () => selectState(stateName);
    stateButtonsContainer.appendChild(button);
  });
}

function selectState(state) {
  selectedState = state;
  localStorage.setItem('selectedState', selectedState);
  alert(`${state} selected!`);
  updateProgress();
  loadPage('license-menu');
}

function saveCcDetails() {
  const fields = [
    { id: 'ccFullName', message: 'Cardholder name is required' },
    { id: 'ccNumber', message: 'Card number is required', pattern: '\\d{16}' },
    { id: 'ccExpiry', message: 'Expiry date is required', dateCheck: 'future' }
  ];
  let isValid = true;
  fields.forEach(field => {
    if (!validateInput(field.id, field.message, field.pattern, field.dateCheck)) isValid = false;
  });
  if (isValid) {
    ccDetails = {
      ccFullName: document.getElementById('ccFullName').value,
      ccNumber: document.getElementById('ccNumber').value,
      ccExpiry: document.getElementById('ccExpiry').value
    };
    localStorage.setItem('ccDetails', JSON.stringify(ccDetails));
    alert("Credit Card details saved!");
    loadPage('credit-card-menu');
    updateProgress();
  }
}

function saveMedicareDetails() {
  const fields = [
    { id: 'medicareFullName', message: 'Full name is required' },
    { id: 'medicareNumber', message: 'Medicare number is required', pattern: '\\d{10}' }
  ];
  let isValid = true;
  fields.forEach(field => {
    if (!validateInput(field.id, field.message, field.pattern)) isValid = false;
  });
  if (isValid) {
    medicareDetails = {
      medicareFullName: document.getElementById('medicareFullName').value,
      medicareNumber: document.getElementById('medicareNumber').value
    };
    localStorage.setItem('medicareDetails', JSON.stringify(medicareDetails));
    alert("Medicare details saved!");
    loadPage('medicare-menu');
    updateProgress();
  }
}

function loadCreditCardDisplay() {
  fetch('bank_cards/cc.html')
    .then(response => response.text())
    .then(html => {
      let template = html.replace('5534 2205 6001 4977', ccDetails.ccNumber || '1234 5678 9012 3456')
                        .replace('05/28', ccDetails.ccExpiry || '08/28')
                        .replace('MR JARROD MUNDAY', (ccDetails.ccFullName || 'J. DOE').toUpperCase());
      document.getElementById('ccSection').innerHTML = template;
      document.querySelector('.back-button').onclick = () => loadPage('credit-card-menu');
    });
}

function updateSummary() {
  if (Object.keys(licenseDetails).length && selectedState && uploadedImage) {
    document.getElementById('summaryContent').innerHTML = `
      <p>Full Name: ${licenseDetails.fullName || 'N/A'}</p>
      <p>License Number: ${licenseDetails.licenseNumber || 'N/A'}</p>
      <p>Card Number: ${licenseDetails.cardNumber || 'N/A'}</p>
      <p>Date of Birth: ${formatDate(licenseDetails.dob) || 'N/A'}</p>
      <p>Expiry Date: ${formatDate(licenseDetails.expiryDate) || 'N/A'}</p>
      <p>Address: ${licenseDetails.address || 'N/A'}</p>
      <p>State/Territory: ${selectedState || 'N/A'}</p>
    `;
  }
}

function openImagePreview() {
  if (document.getElementById('imagePreview').src) {
    const win = window.open();
    win.document.write(`<img src="${document.getElementById('imagePreview').src}" style="max-width:100%;">`);
  }
}

window.initializeForm = initializeForm;
window.initializeLicenseForm = initializeLicenseForm;
window.updateLicensePreview = updateLicensePreview;
window.initializeUpload = initializeUpload;
window.handleImage = handleImage;
window.removeImage = removeImage;
window.saveImage = saveImage;
window.initializeStateSelection = initializeStateSelection;
window.selectState = selectState;
window.saveCcDetails = saveCcDetails;
window.saveMedicareDetails = saveMedicareDetails;
window.loadCreditCardDisplay = loadCreditCardDisplay;
window.updateSummary = updateSummary;
window.openImagePreview = openImagePreview;