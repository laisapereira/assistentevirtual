import React from 'react';

import { NumberOfRegistered } from './number-of-registered.tsx';
import { HeaderButtons } from './header-buttons.tsx';

import joLogo from '../../assets/jo-logo.png';


export function Header () {
  return (
    <header className='h-32 flex items-center justify-between container mx-auto'>      
      <img className='w-44 xl:w-52 2xl:w-60' src={joLogo} alt="Logo da Assistente Virtual Jô" />
      <div className='flex items-center justify-center gap-4'>
        <NumberOfRegistered />
        <HeaderButtons />
      </div>
    </header>
  );
}
