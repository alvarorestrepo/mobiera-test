import React from 'react';

import './Overlay.css';

function Overlay({ overlay, onClick }) {
  if (overlay) {
    return (
      <div className="overlay notification" onClick={onClick}></div>
    );
  }
  return null;
}
export default Overlay;