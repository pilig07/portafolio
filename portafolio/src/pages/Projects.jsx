import React from 'react'
import { projects } from '../constants';
import { Link } from 'react-router-dom';
import { arrow } from '../assets/icons';
import CTA from '../components/CTA';

export const Projects = () => {
  return (
    <section className='max-container'>
      <h1 className='head-text'>My <span className='blue-gradient_text font-semibold drop-shadow'>Projects</span></h1>
      <div className='mt-5 flex flex-col gap-3 text-slate-500'>
        <p>
          Here’s a selection of projects I’ve been part of — a catalog that reflects my skills, creativity, and the kind of work I enjoy building.
        </p>
        <div className='flex flex-wrap my-20 gap-16'>
          {projects.map((project) => {
            const projectLink = project.link || project.internalLink;
            const isExternal = !!project.link;

            return (
              <div key={project.name} className='lg:w-[400px] w-full'>
                <div className='block-container w-12 h-12'>
                  <div className={`btn-back rounded-xl ${project.theme}`}></div>
                  <div className='btn-front rounded-xl flex justify-center items-center'>
                    <img src={project.iconUrl} alt="project icon" className='w-1/2 h-1/2 object-contain' />
                  </div>
                </div>

                <div className='mt-5 flex flex-col'>
                  <h4 className='text-2xl font-poppins font-semibold'>{project.name}</h4>
                  <p className='mt-2 text-slate-500'>{project.description}</p>
                  {(project.link || project.internalLink) && (
                    <div className='mt-5 flex items-center gap-2 font-poppins'>

                      {/* Live Link o More Info */}
                      <Link
                        to={project.link || project.internalLink}
                        target={project.link ? "_blank" : "_self"}
                        rel={project.link ? "noopener noreferrer" : ""}
                        className='font-semibold text-blue-600'
                      >
                        {project.link ? "Live Link" : "More Info"}
                      </Link>

                      {/* Icono flecha */}
                      <Link
                        to={project.link || project.internalLink}
                        target={project.link ? "_blank" : "_self"}
                        rel={project.link ? "noopener noreferrer" : ""}
                        className='font-semibold text-violet-600'
                      >
                        <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
                      </Link>

                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>
      </div>
      <hr className='border-slate-200'></hr>
      <CTA></CTA>
    </section>
  )
}

export default Projects;