import React from 'react';
import { Header } from '../Header/header.tsx';
import { Hero } from '../Hero/hero.tsx';
import mainImg from '../../assets/Vector 641.jpg'

export default function App() {
  return (
    <div className="body-page">

      <div className='main shadow-2xl relative'>        
        <Header /> 

        
       
          
        <Hero /> 
        <img className='w-1/2 absolute -bottom-2 z-0' src={mainImg} /> 
          
      </div>

    </div>
  );
}
