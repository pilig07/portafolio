import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home, About, Projects, Contact } from './pages';
import ProjectDetail from './pages/ProjectDetail';

const Apps = () => {
    return (
          <main className='bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 min-h-screen'>
            <Router>
                <Navbar></Navbar>
                <Routes>
                    <Route path='/' element={<Home></Home>}></Route>
                    <Route path='/about' element={<About></About>}></Route>
                    <Route path='/projects' element={<Projects></Projects>}></Route>
                    <Route path='/contact' element={<Contact></Contact>}></Route>

                    <Route path='/project/:projectId' element={<ProjectDetail />} />
                </Routes>
            </Router>

        </main>
    )
}

export default Apps