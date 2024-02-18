import React from "react";

import miniPic from '../../assets/miniPic.svg';
import miniPic2 from '../../assets/miniPic2.svg';
import miniPic3 from '../../assets/miniPic3.svg';

export function NumberOfRegistered () {
  return (
    <div className='py-1 pl-2 pr-4 flex items-center justify-between gap-3 bg-secondary rounded-full border-none  '>
      
      <div className="flex">
        <img className='w-7' src={miniPic} />
        <img className='w-7 -ml-4' src={miniPic2} />
        <img className='w-7 -ml-4' src={miniPic3} />
      </div>      

      <div className='font-sourceSansPro-black text-sm'>
        +1.2k Cadastradas
      </div>
    </div>
  );
}