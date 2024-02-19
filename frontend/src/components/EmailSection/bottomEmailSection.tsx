import React from 'react';

import joLogoBranca from '../../assets/jo-logo-branca.svg'

export function BottomEmailSection () {
  return (

    <div className='mt-8 flex items-center container mx-auto'>
      
      <div>
        <img src={joLogoBranca} alt="" />
      </div>

      <div className='ml-28 w-96 py-4 flex items-center justify-around xl:w-[500px] xl:ml-48 2xl:w-[550px] 2xl:ml-72'>

        <input className='w-full py-3 pl-8 rounded-full outline-none xl:text-lg xl:py-4 ' type='text' placeholder='Seu Email' />
        <button className='w-20 py-3 bg-black rounded-full font-sourceSansPro-black text-white text-xs -ml-24 xl:text-base xl:w-24 xl:-ml-28 '>Iniciar</button>
        
      </div>


    </div>


  );
}