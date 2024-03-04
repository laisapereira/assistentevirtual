import React from 'react';

import mainImg from '../../assets/Vector 641.jpg'

export function Hero () {
  return (

    <main className='w-3/5 mt-8 mx-auto z-10'>    
      

      <form className='w-full'>
        <h1 className='font-sourceSansProBold text-3xl xl:text-4xl text-center text-black'>Cadastre-se</h1>

        <div className='pt-16 pl-8 text-xs text-black flex justify-between gap-12'>
          <div className='flex-1 z-50'>
            <div className='z-50 flex flex-col'>
              <label htmlFor=''>Nome completo</label>
              <input className='mt-2 text-base border-b-2 border-secondaryColor outline-none' type="text" />
            </div>

            <div className='flex flex-col my-10'>
              <label htmlFor=''>Setor</label>
              <input className='mt-2 text-base border-b-2 border-secondaryColor outline-none' type="text" />
            </div>

            <div className='flex flex-col'>
              <label htmlFor=''>Data de nascimento</label>
              <input className='mt-2 text-base border-b-2 border-secondaryColor outline-none' type="text" />
            </div>
          </div>

          <div className='flex-1 z-50'>
            <div className='flex flex-col'>
              <label htmlFor=''>Endereço de email</label>
              <input className='mt-2 text-base border-b-2 border-secondaryColor outline-none' type="email" />
            </div>

            <div className='flex flex-col my-10'>
              <label htmlFor=''>Senha</label>
              <input className='mt-2 text-base border-b-2 border-secondaryColor outline-none' type="password" />
            </div>

            <div className='flex flex-col items-center justify-center'>
              <button className='w-4/5 py-2 rounded-lg bg-black font-sourceSansPro text-base text-white mt-5' type="submit">Cadastro</button>
              <p className='font-sourceSansProSemiBold text-black text-sm mt-6'>Voltar para <a className='font-sourceSansProBold text-secondaryColor' href="">login</a></p>
            </div>            
          </div>



          

          
        </div>
      </form>

      <div className='flex justify-end'>
        
      </div>



    </main>

  );
}