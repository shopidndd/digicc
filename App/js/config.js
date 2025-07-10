const appConfig = {
    defaultExampleAddress: '12 Main Rd<br>MELBOURNE VIC 3000',
    defaultSignatureImage: 'sig.png',
    defaultLicensePhoto: 'https://via.placeholder.com/120x160',
    availableStates: [
      'New South Wales', 'Victoria', 'Queensland', 'South Australia',
      'Western Australia', 'Tasmania', 'Australian Capital Territory', 'Northern Territory'
    ],
    bankCards: ['cc', 'citibank', 'commbank', 'ing']
  };
  
  function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString + 'T00:00:00');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  
  function validateInput(id, message, pattern = null, dateCheck = null) {
    const input = document.getElementById(id);
    const error = document.getElementById(`${id}Error`) || input.nextElementSibling;
    if (!input.value) {
      if (error) error.textContent = message;
      return false;
    }
    if (pattern && !new RegExp(`^${pattern}$`).test(input.value)) {
      if (error) error.textContent = `Invalid format for ${id.replace(/([A-Z])/g, ' $1').trim()}`;
      return false;
    }
    if (dateCheck) {
      const date = new Date(input.value);
      const today = new Date('2025-06-27T23:44:00+10:00'); // Current date and time
      if (dateCheck === 'past' && date >= today) {
        if (error) error.textContent = `${id.replace(/([A-Z])/g, ' $1').trim()} must be in the past`;
        return false;
      }
      if (dateCheck === 'future' && date <= today) {
        if (error) error.textContent = `${id.replace(/([A-Z])/g, ' $1').trim()} must be in the future`;
        return false;
      }
    }
    if (error) error.textContent = '';
    return true;
  }
  
  window.appConfig = appConfig;
  window.formatDate = formatDate;
  window.validateInput = validateInput;