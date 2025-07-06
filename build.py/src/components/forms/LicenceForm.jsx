
import React from 'react';
export default function LicenceForm({ data, setData }) {
  return (<div dangerouslySetInnerHTML={{__html: require('../../forms/licence_form.html')}} />);
}
