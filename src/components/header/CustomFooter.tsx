/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { Footer } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import logoCpa from '../../images/logo/logo-cpa.png';

export function CustomFooter() {
  const navigate = useNavigate();
  
  return (
    <Footer container={true} className="sticky bottom-0 w-full bg-white bg-opacity-70 backdrop-blur-md dark:bg-gray-800 dark:bg-opacity-70 py-4">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-7xl mx-auto px-4">
        
        {/* Copyright */}
        <Footer.Copyright by="Impôts Match" year={new Date().getFullYear()} className="mb-2 md:mb-0" />

        {/* Link Group */}
        <Footer.LinkGroup className="flex flex-wrap gap-4 text-sm md:text-base">
          <a
            className="cursor-pointer"
            onClick={() => navigate('/userConditions')}
          >
            {"Conditions D'utilisation"}
          </a>
          <a
            className="cursor-pointer"
            onClick={() => navigate('/privacyPolicy')}
          >
            {'Politique de Confidentialité'}
          </a>
        </Footer.LinkGroup>

        {/* Brand Logo */}
        <Footer.Brand href="https://flowbite.com" src={logoCpa} className="w-24 md:w-32" />
      
      </div>
    </Footer>
  );
}
