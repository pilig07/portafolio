import React from 'react'
import { skills, experiences } from '../constants';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import CTA from '../components/CTA';

export const About = () => {
  return (
    <section className='max-container'>
      <h1 className='head-text'>Hello, I'm <span className='blue-gradient_text font-semibold drop-shadow'>Pilar</span></h1>
      <div className='mt-5 flex flex-col gap-3 text-slate-500'>
        <p>
          Software Engineer based in Mexico, developing web and mobile applications with a focus on seamless user experiences.
        </p>
      </div>
      <div className='py-10 flex flex-col'>
        <h3 className='subhead-text'>My Skills</h3>

        <div className='mt-16 flex flex-wrap gap-12'>
          {skills.map((skill) => (
            <div key={skill.name}
              className='block-container w-20 h-20'
              title={skill.name}>
              <div className='btn-back rounded-xl' />
              <div className='flex btn-front rounded-xl justify-center items-center'>
                <img src={skill.imageUrl} alt={skills.name} className='w-1/2 h-1/2 object-contain'></img>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='py-16'>
        <h3 className='subhead-text'>Work Experience</h3>
        <div className='mt-5 flex flex-col gap-3 text-slate-500'>
          <p>
            I've been fortunate to contribute to projects across different industries, growing my expertise and teaming up with inspiring professionals. Here's an overview:
          </p>
        </div>

        <div className='mt-12 flex'>
          <VerticalTimeline>
            {experiences.map((experience) => (
              <VerticalTimelineElement
                key={experience.company_name} date={experience.date} iconStyle={{ background: experience.iconBg }} contentStyle={{ borderBottom: '8px', borderStyle: 'solid', borderBottomColor: experience.iconBg, boxShadow: 'none' }} icon={<div className='flex justify-center items-center w-full h-full'> <img src={experience.icon} alt={experience.company_name} className='w-70 h-[50%] object-contain'></img></div>}>
                <div>
                  <h3 className='text-black text-xl font-poppins font-semibold'>{experience.title}</h3>
                  <p style={{ margin: 0 }} className='text-black-500 font-medium font-base'>{experience.company_name}</p>
                </div>
                <ul className='my-5 list-disc ml-5 space-y-2'>
                  {experience.points.map((point, index) => (
                    <li key={`experience-point-${index}`} className='text-black-500/50 font-normal pl-1 text-sm'>
                      {point}
                    </li>
                  ))}
                </ul>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div>

      <hr className='border-slate-200'></hr>

      <CTA></CTA>


    </section>
  )
}

export default About;