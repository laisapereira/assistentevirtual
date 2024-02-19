import React from 'react';

import imagemMulher from '../../assets/mulherFundoAzul.svg'

export function MainRight() {
  return (
    <div className='flex flex-row-reverse relative'>

      <div>
        <img className='w-72 mt-28 -ml-5 xl:w-96 xl:mt-20 2xl:mt-24 2xl:-ml-3' src={imagemMulher} alt="" />
        <span className='absolute -right-28 top-28 text-xs font-ABeeZe -rotate-90 xl:text-sm xl:-right-36 2xl:-right-40'>Todos os direitos reservados ao Acelera FJS</span>
      </div>

      <div className='flex flex-col pt-5'>
        <div className='justify-start'>
          <div className='w-3/4 py-4 px-6 rounded-3xl rounded-tl-md bg-[#5252F1] text-xs text-white font-inter xl:text-base 2xl:text-lg '>
            Olá eu sou a Jô! 👋 Como posso te ajudar hoje?
          </div>
        </div>

        <div className='flex justify-end'>
          <div className='w-2/4 py-3 px-5 mt-6 rounded-b-2xl rounded-t-sm shadow-sombraBalao bg-white text-xs text-black font-inter justify-end xl:text-base 2xl:text-lg'>
            Estou querendo saber o ramal do RH
          </div>    
        </div>

        <div className='justify-start'>
          <div className='w-2/3 py-4 text-center mt-5 rounded-2xl rounded-tl-md bg-[#5252F1] text-xs text-white font-inter xl:text-base 2xl:text-lg'>
            Aqui está! o número é 91435 😊
          </div>
        </div>

        <div className='flex justify-end'>
          <div className='min-w-36 text-center py-3 mt-5 rounded-b-xl rounded-t-sm shadow-sombraBalao bg-white text-xs text-black font-inter justify-end xl:text-base 2xl:text-lg'>
            Obrigada Jô! 😍
          </div>    
        </div>
      </div>

    </div>    
  );
}