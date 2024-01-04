import React from 'react';
import './ErrorPopup.css';

export default function InfoPopup({ title, buttonText, onClick }) {
  return (
    <div className='error-popup'>
      <h2 className='error-popup__title'>{title}</h2>
      <button className='error-popup__button' onClick={onClick}>{buttonText}</button>
    </div>
  )
}
