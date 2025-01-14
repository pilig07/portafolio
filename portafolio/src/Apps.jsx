import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';

const Apps = () => {
    return (
        <main className='bg-slate-300/20'>
            <Router>
                <Navbar />
                <Routes>
                    <Route path='/' element-={'Home'}></Route>
                    <Route path='/about' element={'About'}></Route>
                    <Route path='/projects' element={'Projects'}></Route>
                    <Route path='/certificates' element={'Certificates'}></Route>
                    <Route path='/contact' element={'Contact'}></Route>
                </Routes>
            </Router>
        </main>
    )
}

export default Apps