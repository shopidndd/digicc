
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
