import React from 'react';

import { NumberOfRegistered } from './number-of-registered.tsx';
import { HeaderButtons } from './header-buttons.tsx';

import joLogo from '../assets/jo-logo.svg';


export function Header () {
  return (
    <header className='flex items-center justify-between py-5'>      
      <img src={joLogo} alt="Logo da Assistente Virtual Jô" />
      <div className='flex items-center justify-center gap-3'>
        <NumberOfRegistered />
        <HeaderButtons />
      </div>
    </header>
  );
}
