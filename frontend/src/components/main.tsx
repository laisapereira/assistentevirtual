import React from "react";

import Ellipse142 from '../assets/Ellipse 142.svg';
import Ellipse143 from '../assets/Ellipse 143.svg';
import Ellipse144 from '../assets/Ellipse 144.svg';
import MulherFundoAzul from '../assets/mulherFundoAzul.svg';
import bolinha133 from '../assets/bolinha133.svg';
import bolinha134 from '../assets/bolinha134.svg';
import bolinha135 from '../assets/bolinha135.svg';
import bolinha136 from '../assets/bolinha136.svg';
import bolinha137 from '../assets/bolinha137.svg';
import bolinha138 from '../assets/bolinha138.svg';
import bolinha139 from '../assets/bolinha139.svg';
import bolinha140 from '../assets/bolinha140.svg';
import bolinha141 from '../assets/bolinha141.svg';
import bolinha142 from '../assets/bolinha142.svg';
import bolinha143 from '../assets/bolinha143.svg';
import bolinha144 from '../assets/bolinha144.svg';

export function Main () {
  return (
<main className="pt-16 pl-24 flex">
    <div className="w-1/3 pt-14 relative ">
      <h1 className="font-montSerrat-bold text-title">Bem-Vindo(a)</h1>
      <p className="mt-1 font-montSerrat text-xl text-left">A Jô, assistente virtual, simplifica localização de processos e pessoas na fundação. <span className='text-d-secondary'> Focada em otimizar tarefas </span>, ela facilita buscas e fornece informações sobre trabalho e estrutura organizacional.</p>
      <button className="mt-9 w-48 py-5 font-ubuntuBold text-lg border border-[#C4C4C4]">vamos lá</button>

      <img className="absolute left-72 bottom-56" src={bolinha137} alt="" />
      <img className="absolute left-[305px] bottom-64" src={bolinha138} alt="" />
      <img className="absolute left-[300px] bottom-72" src={bolinha139} alt="" />
      <img className="absolute right-20 bottom-36" src={bolinha140} alt="" />

      <img className="absolute top-9 right-8" src={bolinha142} alt="" />
      <img className="absolute top-5 right-5" src={bolinha143} alt="" />
      <img className="absolute top-4 right-12 " src={bolinha144} alt="" />
    </div>

    <div className="w-2/3 flex flex-row-reverse justify-end relative ">      

      <div className="w-5/12 flex  "> 
        <img className="mt-44 -ml-10 w-full" src={MulherFundoAzul} alt="" />        
      </div>

      <div className="flex flex-col w-6/12 ml-14 pt-16 ">
        <div className="flex justify-start">
          <div className="w-[356px] px-10 py-4 rounded-3xl rounded-tl-md bg-[#5252F1] text-lg text-white font-inter">
            Olá eu sou a Jô! 👋 Como posso te ajudar hoje?
          </div>
        </div>

        <div className="flex justify-end">
          <div className="w-[266px] px-12 py-4 my-9 rounded-b-3xl rounded-t-md shadow-sombraBalao bg-white text-lg text-black font-inter ">
            Estou querendo saber o ramal do RH
          </div>            
        </div>          

        <div className="flex justify-start">
          <div className="w-[340px] px-9 py-5 rounded-2xl rounded-tl-md bg-[#5252F1] text-lg text-white font-inter  ">
            Aqui está! o número é 91435 😊
          </div>
        </div>
        
        <div className="flex justify-end">
          <div className="w-[206px] text-center py-4 mt-8 rounded-b-2xl rounded-t-md shadow-sombraBalao bg-white text-lg text-black font-inter">
            Obrigada Jô! 😍
          </div>
        </div>


      </div>

      <img className="absolute left-20 top-60" src={bolinha141} alt="" />



    </div>
</main>    
  );
}