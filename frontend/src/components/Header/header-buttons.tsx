import React from 'react';

export function HeaderButtons () {
  return (    
    <div className='flex items-center justify-center gap-3'>
      <button className='px-7 py-2 border-2 border-black rounded-full font-sourceSansPro font-normal text-sm'>
        Login
      </button>
      <button className='px-7 py-2 bg-black border-2 border-black rounded-full font-sourceSansPro font-normal text-white text-sm '>
        Cadastro
      </button>
    </div>
  );
}