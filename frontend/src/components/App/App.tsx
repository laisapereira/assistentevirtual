import '../../../src/index.css';
import React from 'react';

import { Header }  from '../Header/header.tsx';
import { Main } from '../Main/main.tsx';
import { EmailSection } from '../EmailSection/emailSection.tsx';

export default function App() {
  return (
    <div className='h-screen'>      
      <Header />
      <Main />
      <EmailSection />
      
    </div>    
  );
}
