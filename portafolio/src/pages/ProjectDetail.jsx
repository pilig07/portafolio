import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { projects } from '../constants';
import { arrow } from '../assets/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import CTA from '../components/CTA';


const ProjectDetail = () => {
  const location = useLocation();
  const currentPath = location.pathname; // ejemplo: /project/alfasoft-app

  // Busca el proyecto cuyo internalLink coincida con la ruta actual
  const project = projects.find(
    (p) => p.internalLink === currentPath
  );

  if (!project) return <div className='max-container mt-20 text-center'>Project not found</div>;

  const projectLink = project.link || project.internalLink;
  const isExternal = !!project.link;

  return (
    <section className='max-container '>
      {/* Nombre del proyecto */}
      <h1 className='text-3xl font-poppins blue-gradient_text mb-4 font-semibold drop-shadow'>{project.name}</h1>

      {/* Carrusel de imágenes */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        loop
        className='mb-6 relative'
      >
        {project.images?.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={img}
              alt={`${project.name} screenshot ${idx + 1}`}
              className='w-full h-[60vh] object-contain rounded-xl'
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Descripción */}
      <p className='text-slate-500 mb-6'>{project.description}</p>

      {/* More Details */}
      {project.moreDetails && (
        <section className="mt-6 bg-gray-50 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">More Details</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            {project.moreDetails.map((detail, idx) => (
              <li key={idx}>{detail}</li>
            ))}
          </ul>
        </section>
      )}

<br />
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech?.map((tech, idx) => (
          <span key={idx} className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">
            {tech}
          </span>
        ))}
      </div>



      <div className='flex items-center gap-4'>
        <p className="mt-8 italic text-gray-400 text-center text-sm max-w-2xl mx-auto">
          These projects are confidential. The code cannot be shared, and all sensitive information has been censored for demonstration purposes to protect privacy.
        </p>


      </div>
      <hr className='border-slate-200'></hr>
      <CTA></CTA>
    </section>
  );
};

export default ProjectDetail;