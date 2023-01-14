/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react'
import { About } from './About'
import { Contact } from './Contact'
import { Features } from './Features'
import { Footer } from './Footer'
import { Home } from './Home'
import { Pricing } from './Pricing'
import { Support } from './Support'

export function LandingPage() {
  return (
    <div className='dark:bg-dark'>
      <Home />
      <Features />
      <About />
      <Pricing />
      <Support />
      <Contact />
      <Footer />
    </div>
  )
}
