import React from 'react';

import imagemMulher from '../../assets/mulherFundoAzul.svg'

export function MainRight() {
  return (

    <div className='flex relative'>
      <img className='w-72 mt-5 -ml-3' src={imagemMulher} alt="" />
      <span className='absolute -right-32 top-24 text-xs font-ABeeZe -rotate-90'>Todos os direitos reservados ao Acelera FJS</span>
    </div>
      
    
    

    



  );
}