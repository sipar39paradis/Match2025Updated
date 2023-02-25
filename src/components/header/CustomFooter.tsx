/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';

import { Footer } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

export function CustomFooter() {
  const navigate = useNavigate();
  return (
    <Footer container={true}>
      <Footer.Copyright by="Impôts Match" year={new Date().getFullYear()} />
      <Footer.LinkGroup>
        <a
          className="cursor-pointer pr-4"
          onClick={() => {
            navigate('/userConditions');
          }}
        >
          {"Conditions D'utilisation"}
        </a>
        <a
          className="cursor-pointer"
          onClick={() => {
            navigate('/privacyPolicy');
          }}
        >
          {'Politique de Confidentialité'}
        </a>
      </Footer.LinkGroup>
    </Footer>
  );
}
