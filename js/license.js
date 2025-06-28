let licenseDetails = JSON.parse(localStorage.getItem('licenseDetails')) || {};
let selectedState = localStorage.getItem('selectedState') || '';
let uploadedImage = localStorage.getItem('uploadedImage') || null;

function saveLicenseDetails() {
  const fields = [
    { id: 'fullName', message: 'Full name is required' },
    { id: 'licenseNumber', message: 'License number is required', pattern: '[A-Za-z0-9]{1,16}' },
    { id: 'cardNumber', message: 'Card number is required', pattern: '[A-Za-z0-9]{1,16}' },
    { id: 'dob', message: 'Date of birth is required', dateCheck: 'past' },
    { id: 'expiryDate', message: 'Expiry date is required', dateCheck: 'future' },
    { id: 'address', message: 'Address is required' }
  ];
  let isValid = true;
  fields.forEach(field => {
    if (!validateInput(field.id, field.message, field.pattern, field.dateCheck)) isValid = false;
  });
  if (isValid) {
    licenseDetails = {
      fullName: document.getElementById('fullName').value,
      licenseNumber: document.getElementById('licenseNumber').value,
      cardNumber: document.getElementById('cardNumber').value,
      dob: document.getElementById('dob').value,
      expiryDate: document.getElementById('expiryDate').value,
      address: document.getElementById('address').value
    };
    localStorage.setItem('licenseDetails', JSON.stringify(licenseDetails));
    alert("License details saved!");
    loadPage('license-menu');
    updateProgress();
  }
}

async function generateLicense() {
  if (!Object.keys(licenseDetails).length || !selectedState || !uploadedImage) {
    alert("Please complete all steps: enter license details, upload an image, and select a state.");
    return;
  }
  const spinner = document.getElementById('loadingSpinner');
  spinner.classList.remove('hidden');
  try {
    let templateUrl = selectedState === 'New South Wales' ? 'licence/nsw_driver_licence.html' : 'licence/vic_driver_licence.html';
    const response = await fetch(templateUrl);
    if (!response.ok) throw new Error(`Failed to fetch ${templateUrl}: ${response.statusText}`);
    let templateHtml = await response.text();
    templateHtml = templateHtml.replace('{{fullName}}', licenseDetails.fullName || 'N/A')
                              .replace('{{licenseNumber}}', licenseDetails.licenseNumber || 'N/A')
                              .replace('{{cardNumber}}', licenseDetails.cardNumber || 'N/A')
                              .replace('{{dob}}', formatDate(licenseDetails.dob) || 'N/A')
                              .replace('{{expiryDate}}', formatDate(licenseDetails.expiryDate) || 'N/A')
                              .replace('{{address}}', (licenseDetails.address || '').replace(/\n/g, '<br>') || appConfig.defaultExampleAddress)
                              .replace('{{image}}', uploadedImage || appConfig.defaultLicensePhoto);
    document.getElementById('licenseDisplaySection').innerHTML = templateHtml;
    loadPage('license-display');
  } catch (error) {
    console.error('Error generating license:', error);
    alert(`Error generating license: ${error.message}. Please try again.`);
    loadPage('license-menu');
  } finally {
    spinner.classList.add('hidden');
  }
}

function downloadSummary() {
  if (!Object.keys(licenseDetails).length || !selectedState || !uploadedImage) {
    alert("No summary to download. Please generate first.");
    return;
  }
  const summaryText = `
    Digital Drivers Generator Summary
    -------------------------------
    Full Name: ${licenseDetails.fullName || 'N/A'}
    License Number: ${licenseDetails.licenseNumber || 'N/A'}
    Card Number: ${licenseDetails.cardNumber || 'N/A'}
    Date of Birth: ${formatDate(licenseDetails.dob) || 'N/A'}
    Expiry Date: ${formatDate(licenseDetails.expiryDate) || 'N/A'}
    Address: ${licenseDetails.address || 'N/A'}
    State/Territory: ${selectedState || 'N/A'}
    Image: [Image Uploaded]
  `;
  const blob = new Blob([summaryText], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'license_summary.txt';
  a.click();
  URL.revokeObjectURL(url);
}

function clearData() {
  if (confirm("Are you sure you want to clear all data?")) {
    licenseDetails = {};
    ccDetails = {};
    medicareDetails = {};
    selectedState = '';
    uploadedImage = null;
    localStorage.clear();
    document.querySelectorAll('.image-preview, .remove-image').forEach(el => el.classList.add('hidden'));
    updateProgress();
    alert("All data cleared!");
    loadPage('initial-menu');
  }
}

window.saveLicenseDetails = saveLicenseDetails;
window.generateLicense = generateLicense;
window.downloadSummary = downloadSummary;
window.clearData = clearData;

window.populateLicenseDetails = () => {
  const licenseDetails = JSON.parse(localStorage.getItem('licenseDetails')) || {};
  // Example: Populate elements with corresponding details
  document.querySelectorAll('[data-license-field]').forEach(element => {
    const field = element.getAttribute('data-license-field');
    element.textContent = licenseDetails[field] || '';
  });

  const uploadedImage = localStorage.getItem('uploadedImage');
    if (uploadedImage) {
        const img = document.createElement('img');
        img.src = uploadedImage;
         img.style.width = '190px';
         img.style.height = '220px';
         img.style.objectFit = 'cover';
        const photoBlock = document.querySelector('.license-photo');
        photoBlock.src = uploadedImage;
    }
};