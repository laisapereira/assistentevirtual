import React from 'react';


export function MainLeft () {
  return (
    <div className='w-2/5 pr-2 pl-6'>
      <h1 className='text-5xl font-montSerrat-bold'>Bem-Vindo(a)</h1>
      <p className='mt-4 font-montSerrat  text-pretty'>A Jô, assistente virtual, simplifica localização de processos e pessoas na fundação. <span className='text-d-secondary'> Focada em otimizar tarefas</span>, ela facilita buscas e fornece informações sobre trabalho e estrutura organizacional.</p>
      <button className='w-40 py-4 border border-[#C4C4C4] text-center font-ubuntuBold mt-10'>vamos lá</button>
    </div>
  );
}