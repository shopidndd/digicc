
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CCForm from './forms/CCForm';
import LicenceForm from './forms/LicenceForm';
import MedicareForm from './forms/MedicareForm';
import CCPreview from './previews/CCPreview';
import NSWLicencePreview from './previews/NSWLicencePreview';
import MedicarePreview from './previews/MedicarePreview';

export default function CardGenerator() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const initialType = params.get('type') || 'driver_license';

  const [step, setStep] = useState(1);
  const [cardType, setCardType] = useState(initialType);
  const [formData, setFormData] = useState({});

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handleBack = () => step === 1 ? navigate('/') : setStep((s) => Math.max(s - 1, 1));

  const renderForm = () => {
    switch (cardType) {
      case 'bank_card': return <CCForm data={formData} setData={setFormData} />;
      case 'driver_license': return <LicenceForm data={formData} setData={setFormData} />;
      case 'medicare': return <MedicareForm data={formData} setData={setFormData} />;
      default: return null;
    }
  };

  const renderPreview = () => {
    switch (cardType) {
      case 'bank_card': return <CCPreview data={formData} />;
      case 'driver_license': return <NSWLicencePreview data={formData} />;
      case 'medicare': return <MedicarePreview data={formData} />;
      default: return null;
    }
  };

  return (
    <div className='p-8 max-w-2xl mx-auto'>
      {step === 1 && (
        <div>
          <h2>Select Card Type</h2>
          <select value={cardType} onChange={(e) => setCardType(e.target.value)}>
            <option value='driver_license'>Driver's License</option>
            <option value='bank_card'>Bank Card</option>
            <option value='medicare'>Medicare Card</option>
          </select>
        </div>
      )}
      {step === 2 && renderForm()}
      {step === 3 && renderPreview()}
      <div className='flex justify-between mt-4'>
        <button onClick={handleBack}>Back</button>
        <button onClick={handleNext}>{step === 3 ? 'Finish' : 'Next'}</button>
      </div>
    </div>
  );
}
