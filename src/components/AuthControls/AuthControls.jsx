import React from 'react';
import { useNavigate } from "react-router-dom";
import './AuthControls.css'

export default function AuthControls() {
  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate('/signup', { replace: true });
  }

  const goToSignIn = () => {
    navigate('/signin', { replace: true });
  }

  return (
    <nav className='auth-controls'>
      <button className='auth-controls__sign-up' onClick={goToSignUp} type="button">Регистрация</button>
      <button className='auth-controls__sign-in'onClick={goToSignIn} type="button">Войти</button>
    </nav>
  )
}
