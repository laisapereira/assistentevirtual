import React from 'react';

import twitterIcon from '../../assets/043-twitter.svg';
import dribbbleIcon from '../../assets/022-dribbble.svg';
import behanceIcon from '../../assets/048-behance.svg';
import vimeoIcon from '../../assets/027-vimeo.svg';
import linkedinIcon from '../../assets/045-linkedin.svg';


export function Footer () {
  return (
    <footer className='text-black mt-10'>
      <div className='my-container py-5 flex justify-between items-center'>
        <span className='font-montSerratBold'>Entre em contato com a gente</span>
        <div className='flex gap-5'>
          
          <a href=""><img src={twitterIcon} alt="" /></a>
          <a href=""><img src={dribbbleIcon} alt="" /></a>
          <a href=""><img src={behanceIcon} alt="" /></a>
          <a href=""><img src={vimeoIcon} alt="" /></a>
          <a href=""><img src={linkedinIcon} alt="" /></a>
          
         



        </div>

      </div>
    </footer>
  );
}