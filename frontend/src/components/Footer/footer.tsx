import React from 'react';

import aceleraLogo from '../../assets/acelera-logo.svg';

import behanceIcon from '../../assets/behance-icon.svg';
import twitterIcon from '../../assets/twitter-icon.svg';
import vimeoIcon from '../../assets/vimeo-icon.svg';
import dribbbleIcon from '../../assets/dribbble-icon.svg';
import linkedinIcon from '../../assets/linkedin-icon.svg';


export function Footer () {
  return (

    <footer className='h-16'>

      <div className='container mx-auto flex justify-between items-center py-4'>

        <p className='font-montSerrat-bold'>Entre em contato com a gente</p>
        <img src={aceleraLogo} />

        <div className='flex items-center gap-4'>
          <img className='w-4' src={twitterIcon} />
          <img className='w-4' src={dribbbleIcon} />
          <img className='w-6 mt-2' src={behanceIcon} />
          <img className='w-4' src={vimeoIcon} />
          <img className='w-4' src={linkedinIcon} />
        </div>

      </div>
      
    </footer>

  );
}