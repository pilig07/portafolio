import React, { Suspense, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { Canvas } from '@react-three/fiber';
import Fox from '../models/Fox';
import Loader from '../components/Loader';
import useAlert from '../hooks/useAlert';
import Alert from '../components/Alert';

export const Contact = () => {

  const formRef = useRef(null);
  const [form, setform] = useState({ name: '', email: '', message: '' });
  const [currentAnimation, setcurrentAnimation] = useState('idle');

  const [isLoading, setIsLoading] = useState(false);

  const { alert, showAlert, hideAlert } = useAlert();

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  };


  const handleFocus = () => {
    setcurrentAnimation('walk');
  };

  const handleBlur = () => {
    setcurrentAnimation('idle');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setcurrentAnimation('hit');
    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID, import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID, {
      name: form.name,
      to_name: "Pilar",
      from_email: form.email,
      to_email: import.meta.env.VITE_APP_EMAIL,
      message: form.message
    },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setIsLoading(false);
      showAlert({ show: true, text: "Message sent successfully! I'll be in contact soon", type: 'success' });
      setTimeout(() => {
        hideAlert();
        setcurrentAnimation('idle')
        setform({ name: '', email: '', message: '' });
      }, [3000])


    }).catch((error) => {
      setIsLoading(false);
      showAlert({ show: true, text: "I didn't receive your message", type: 'danger' })
      setcurrentAnimation('idle');
      console.log(error);
    })
  };

  return (
    <section className='relative flex lg:flex-row flex-col max-container min-h-screen'>

      {alert.show && <Alert {...alert} />}

      {/* Formulario */}
      <div className="flex-1 min-w-[50%] flex flex-col px-4">
        <h1 className="head-text">Get in Touch!</h1>
        <form className="w-full flex flex-col gap-7 mt-10" onSubmit={handleSubmit}>
          <label className="text-black-500 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            required
            className="input"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <label className="text-black-500 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            required
            className="input"
            placeholder="john@gmail.com"
            value={form.email}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <label className="text-black-500 font-semibold">Your Message</label>
          <textarea
            required
            name="message"
            className="textarea"
            rows={4}
            placeholder="Let me know how I can help you!"
            onChange={handleChange}
            value={form.message}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <button type="submit" className="btn" onFocus={handleFocus} onBlur={handleBlur}>
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      {/* Canvas */}
      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px] overflow-hidden">
        <Canvas className="w-full h-full" camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}>
          <directionalLight intensity={2.5} position={[0, 0, 1]} />
          <ambientLight intensity={0.5} />
          <Suspense fallback={<Loader />}>
            <Fox
              currentAnimation={currentAnimation}
              position={[0.5, 0.35, 0]}
              rotation={[12.6, -0.6, 0]}
              scale={[0.5, 0.5, 0.5]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>

  )
}

export default Contact;