import React from 'react'
import { Link } from 'react-router-dom';
import { socialLinks } from '../constants';
const CTA = () => {
  return (
    <section className='cta'><p className='cta-text'>Have a project in mind? <br className='sm:block hidden'></br> Let's build something together!</p>
      <div className='py-10 flex flex-col'>
        <Link to="/contact" className='btn'>Contact</Link>
        <div className='mt-8 flex flex-wrap gap-12'>
          {socialLinks.map((socialLink) => (
            <div className='block-container w-50 h-50'>
              <div className='flex rounded-xl justify-center items-center'>
                <a target='_black' rel='noopener noreferrer' href={socialLink.link}>  <img
                  src={socialLink.iconUrl}
                  alt={socialLink.name}
                  className={`object-contain ${socialLink.name === "LinkedIn" ? "w-100 h-100" : "w-1/2 h-1/2"
                    }`}
                /></a>
              </div>

            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

export default CTA