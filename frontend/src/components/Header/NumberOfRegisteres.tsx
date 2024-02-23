import React from "react";

import miniPic from "../../public/miniPic.svg"
import miniPic2 from '../../public/miniPic2.svg';
import miniPic3 from '../../public/miniPic3.svg';

type ColorType = {
  backgroundColor: string;
}

export function NumberOfRegistered ({backgroundColor}: ColorType) {
  return (
    <div className='py-1 pl-2 pr-4 flex items-center justify-between gap-3 bg-{backgroundColor} rounded-full border-none  '>
      
      <div className="flex">
        <img className='w-7 xl:w-9 ' src={miniPic} />
        <img className='w-7 xl:w-9 -ml-4' src={miniPic2} />
        <img className='w-7 xl:w-9 -ml-4' src={miniPic3} />
      </div>      

      <div className='font-source-sans-3 font-bold text-sm xl:text-base 2xl:text-lg'>
        +1.2k Cadastradas
      </div>
    </div>
  );

}