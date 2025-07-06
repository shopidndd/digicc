
import React from 'react';
export default function MedicarePreview({ data }) {
  return (<div dangerouslySetInnerHTML={{__html: require('../../cards/medicare_card/medicare2.html')}} />);
}
