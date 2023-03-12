/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { Advantages } from './Advantages';
import { Contact } from './Contact';
import { Features } from './Features';
import { Home } from './Home';
import { Support } from './Support';

export function LandingPage() {
  return (
    <div className="dark:bg-dark text-align: center pb-32">
      <Home />
      <Advantages />
      <Features />
      <Contact />
      <Support />
    </div>
  );
}
