
import React from 'react';
export default function NSWLicencePreview({ data }) {
  return (<div dangerouslySetInnerHTML={{__html: require('../../cards/licence_cards/nsw.html')}} />);
}
