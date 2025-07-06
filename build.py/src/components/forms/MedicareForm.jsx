
import React from 'react';
export default function MedicareForm({ data, setData }) {
  return (<div dangerouslySetInnerHTML={{__html: require('../../forms/medicare_form.html')}} />);
}
