import os

def ensure_dir(path):
    os.makedirs(path, exist_ok=True)

# Define the file structure and corresponding file contents
file_structure = {
    'src': ['index.jsx', 'App.jsx'],
    'src/components': [
        'SelectPage.jsx', 'CardGenerator.jsx', 'NeonGridBackground.jsx',
        'HeaderSection.jsx', 'CTASection.jsx', 'ThemeToggle.jsx'
    ],
    'src/components/forms': ['CCForm.jsx', 'LicenceForm.jsx', 'MedicareForm.jsx'],
    'src/components/previews': ['CCPreview.jsx', 'NSWLicencePreview.jsx', 'MedicarePreview.jsx'],
}

file_contents = {
    'src/index.jsx': """
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
""",

    'src/App.jsx': """
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SelectPage from './components/SelectPage';
import CardGenerator from './components/CardGenerator';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SelectPage />} />
        <Route path='/generator' element={<CardGenerator />} />
      </Routes>
    </Router>
  );
}
""",

    'src/components/SelectPage.jsx': """
import React from 'react';

export default function SelectPage() {
  const go = (path) => () => window.location.href = path;
  return (
    <div className='min-h-screen flex flex-col justify-center items-center gap-4'>
      <button onClick={go('/generator')} className='btn'>Create a Card</button>
      <button onClick={go('/generator?type=bank_card')} className='btn'>Bank Card</button>
      <button onClick={go('/generator?type=driver_license')} className='btn'>Licence</button>
      <button onClick={go('/generator?type=medicare')} className='btn'>Medicare</button>
    </div>
  );
}
""",

    'src/components/CardGenerator.jsx': """
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
""",

    'src/components/forms/CCForm.jsx': """
import React from 'react';
export default function CCForm({ data, setData }) {
  return (<div dangerouslySetInnerHTML={{__html: require('../../forms/cc_form.html')}} />);
}
""",

    'src/components/forms/LicenceForm.jsx': """
import React from 'react';
export default function LicenceForm({ data, setData }) {
  return (<div dangerouslySetInnerHTML={{__html: require('../../forms/licence_form.html')}} />);
}
""",

    'src/components/forms/MedicareForm.jsx': """
import React from 'react';
export default function MedicareForm({ data, setData }) {
  return (<div dangerouslySetInnerHTML={{__html: require('../../forms/medicare_form.html')}} />);
}
""",

    'src/components/previews/CCPreview.jsx': """
import React from 'react';
export default function CCPreview({ data }) {
  return (<div dangerouslySetInnerHTML={{__html: require('../../cards/bank_cards/cc.html')}} />);
}
""",

    'src/components/previews/NSWLicencePreview.jsx': """
import React from 'react';
export default function NSWLicencePreview({ data }) {
  return (<div dangerouslySetInnerHTML={{__html: require('../../cards/licence_cards/nsw.html')}} />);
}
""",

    'src/components/previews/MedicarePreview.jsx': """
import React from 'react';
export default function MedicarePreview({ data }) {
  return (<div dangerouslySetInnerHTML={{__html: require('../../cards/medicare_card/medicare2.html')}} />);
}
""",
}

if __name__ == '__main__':
    for folder, files in file_structure.items():
        ensure_dir(folder)
        for fname in files:
            path = os.path.join(folder, fname)
            content = file_contents.get(path, '')
            with open(path, 'w') as f:
                f.write(content)
    print('Project structure generated.')


