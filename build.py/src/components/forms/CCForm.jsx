
import React from 'react';
export default function CCForm({ data, setData }) {
  return (<div dangerouslySetInnerHTML={{__html: require('../../forms/cc_form.html')}} />);
}
