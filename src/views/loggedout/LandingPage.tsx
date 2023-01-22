/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { About } from './About';
import { Features } from './Features';
import { Home } from './Home';
import { Support } from './Support';

export function LandingPage() {
  return (
    <div className="dark:bg-dark text-align: center pb-32">
      <Home />
      <Features />
      <About />
      <Support />
    </div>
  );
}
