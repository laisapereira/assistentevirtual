import React from 'react';

import { NumberOfRegistered } from "./NumberOfRegisteres.tsx"
import { HeaderButtons } from "./HeaderOfButtons.tsx"

import joLogo from "../../public/logo.svg"
import joBlackLogo from "../../public/logo-black.svg"

import { Link } from 'react-router-dom';


export function Header () {

  const isPrivatePage = window.location.pathname.includes('/private');

  const logoSrc = isPrivatePage ? joLogo : joBlackLogo;
  return (
    <header className='h-32 flex items-center justify-evenly gap-[10rem] container mx-auto'>      
      <Link to="/"><img className='w-44 xl:w-52 2xl:w-60' src={logoSrc} alt="Logo da Assistente Virtual Jô" /></Link>
      <div className='flex items-center justify-center gap-4'>
        <NumberOfRegistered backgroundColor='red'/>
        <HeaderButtons />
      </div>
    </header>
  );
}