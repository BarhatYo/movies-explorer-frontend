import React from 'react';
import './InfoPopup.css';

export default function InfoPopup({ title, buttonText, onClick }) {
  return (
    <div className='info-popup'>
      <h2 className='info-popup__title'>{title}</h2>
      <button className='info-popup__button' onClick={onClick}>{buttonText}</button>
    </div>
  )
}
