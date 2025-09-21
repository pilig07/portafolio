import { NavLink, useLocation } from 'react-router-dom';

export const Navbar = () => {
    const location = useLocation();
    const isHome = location.pathname === "/"; // Saber si estamos en home

    return (
        <header className='header'>
            <NavLink to="/" className="w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md">
                <p className='blue-gradient_text '>PGD</p>
            </NavLink>
            <nav className='flex text-lg gap-7 font-medium'>
                {["/about", "/projects", "/contact"].map((path) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            isActive
                                ? "text-violet-500"
                                : isHome
                                ? "text-white"
                                : "text-black"
                        }
                    >
                        {path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)}
                    </NavLink>
                ))}
            </nav>
        </header>
    )
}

export default Navbar;
