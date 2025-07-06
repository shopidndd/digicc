
import React from 'react';
export default function CCPreview({ data }) {
  return (<div dangerouslySetInnerHTML={{__html: require('../../cards/bank_cards/cc.html')}} />);
}
