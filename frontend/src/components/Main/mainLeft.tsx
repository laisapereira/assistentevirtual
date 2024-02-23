import React from 'react';


export function MainLeft () {
  return (
    <div className='w-2/5 pr-2 pl-6 2xl:pl-10 2xl:w-1/3'>
      <h1 className='text-4xl font-montSerrat-bold md:text-3xl lg:text-4xl xl:text-title 2xl:text-[54px]'>Bem-Vindo(a)</h1>
      <p className='mt-4 font-montSerrat sm:text-sm xl:text-lg 2xl:text-xl'>A Jô, assistente virtual, simplifica localização de processos e pessoas na fundação. <span className='text-d-secondary'> Focada em otimizar tarefas</span>, ela facilita buscas e fornece informações sobre trabalho e estrutura organizacional.</p>
      <button className='w-40 py-4 border border-[#C4C4C4] text-center font-ubuntuBold mt-10 xl:text-lg 2xl:text-xl'>vamos lá</button>
    </div>
  );
}