import React from 'react'
import { Link } from 'react-router-dom';
import { arrow } from '../assets/icons'

const InfoBox = ({ text, link, btnText }) => (
    <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'> {text}</p>
        <Link to={link} className='neo-brutalism-white neo-btn'>
            {btnText}
            <img src={arrow} className='w-4 h-4 object-contain -[#915EFF]' />
        </Link>

    </div>
)

const renderContent = {
    1: (
        <div className='sm:text-xl sm:leading-snug text-center py-4 px-8 text-white mx-5 info-box'>
            <span className='font-semibold'>Welcome to my portfolio!</span> 👩‍💻<br />
            Dive in, explore my projects, and see ideas come to life!
        </div>

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