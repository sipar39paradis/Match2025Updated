import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../images/logo/impots-match-logo.svg';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center flex-col">
      <Logo
        className="w-64 h-64 cursor-pointer"
        onClick={() => navigate('/')}
      ></Logo>
      <h2 className="text-2xl">
        La page que vous cherchez ne semble pas exister
      </h2>
      <h3 className="text-xl font-semibold">Code d&apos;erreur 404</h3>
    </div>
  );
}
