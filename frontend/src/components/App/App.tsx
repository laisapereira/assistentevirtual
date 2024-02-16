import '../../../src/index.css';
import React from 'react';

import { Header }  from '../header.tsx';
import { Main } from '../main.tsx';

export default function App() {
  return (
    <div className='container mx-auto'>      
      <Header />
      <Main />
    </div>    
  );
}
