import React from 'react';

export function MainCenter() {
  return (

    <div className='flex flex-col'>

      <div className='justify-start'>
        <div className='w-3/4 py-4 px-6 rounded-3xl rounded-tl-md bg-[#5252F1] text-xs text-white font-inter '>
          Olá eu sou a Jô! 👋 Como posso te ajudar hoje?
        </div>
      </div>
        
      <div className='flex justify-end'>
        <div className='w-2/4 py-3 px-7 mt-6 rounded-b-2xl rounded-t-sm shadow-sombraBalao bg-white text-xs text-black font-inter justify-end'>
          Estou querendo saber o ramal do RH
        </div>    
      </div>

      <div className='justify-start'>
        <div className='w-2/3 py-4 text-center mt-5 rounded-2xl rounded-tl-md bg-[#5252F1] text-xs text-white font-inter '>
          Aqui está! o número é 91435 😊
        </div>
      </div>

      <div className='flex justify-end'>
        <div className='min-w-36 text-center py-3 mt-5 rounded-b-xl rounded-t-sm shadow-sombraBalao bg-white text-xs text-black font-inter justify-end'>
          Obrigada Jô! 😍
        </div>    
      </div>
    </div>


  );
}