import React from "react";

import miniPic from '../assets/miniPic.svg';
import miniPic2 from '../assets/miniPic2.svg';
import miniPic3 from '../assets/miniPic3.svg';

export function NumberOfRegistered () {
  return (
    <div className='relative w-60 mr-3'>
      
      <img className='absolute left-2 top-1/2 -translate-y-1/2' src={miniPic} />
      <img className='absolute left-6 top-1/2 -translate-y-1/2' src={miniPic2} />
      <img className='absolute left-10 top-1/2 -translate-y-1/2' src={miniPic3} />

      <div className='w-60 rounded-full border-none bg-secondary font-sourceSansPro-black py-2 pl-20'>
        +1.2k Cadastradas
      </div>
    </div>
  );
}