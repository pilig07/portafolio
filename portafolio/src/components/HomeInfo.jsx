import React from 'react'
import { Link } from 'react-router-dom';
import { arrow } from '../assets/icons'

const InfoBox = ({ text, link, btnText }) => (
    <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'> {text}</p>
        <Link to={link} className='neo-brutalism-white neo-btn'>
            {btnText}
            <img src={arrow} className='w-4 h-4 object-contain' />
        </Link>

    </div>
)

const renderContent = {
    1: (
        <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>Hi, I am <span className='font-semibold'>Pilar</span>👩‍💻 <br /> A Software Developer from Mexico 🌮 </h1>
    ),
    2: (
        <InfoBox text="💻 Worked with multiple companies delivering real-world software solutions." link="/about" btnText="Learn more"></InfoBox>
    ),
    3: (
        <InfoBox text="🧩 Led multiple coding projects to success — always with a touch of UX. Curious about the impact?" link="/projects" btnText="Explore my work"></InfoBox>
    ),
    4: (
        <InfoBox text="🚀 Searching for a dev who turns ideas into working products?" link="/contact" btnText="Let’s talk"></InfoBox>
    )
}



export const HomeInfo = ({ currentStage }) => {
    return renderContent[currentStage] || null;
}

export default HomeInfo;