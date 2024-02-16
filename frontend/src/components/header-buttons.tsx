import React from "react";

export function HeaderButtons () {
  return (    
    <div className='w-64 flex items-center justify-center gap-3'>
      <button className='w-28 py-2 border-2 border-black rounded-full font-sourceSansPro font-normal'>
        Login
      </button>
      <button className='w-36 py-2 bg-black border-2 border-black rounded-full font-sourceSansPro font-normal text-white b'>
        Cadastro
      </button>
    </div>
  );
}