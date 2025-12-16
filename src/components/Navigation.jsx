import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navigation() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return;

    const onScroll = () => {
      setScrolled(window.scrollY > 120);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  // Reset scroll state when leaving home
  useEffect(() => {
    if (!isHome) setScrolled(true);
    else setScrolled(false);
  }, [isHome]);

  const linkClass = `
  font-display tracking-wide transition-colors duration-300
`;


  return (
    <nav
      className={`
        fixed top-0 w-full z-50 transition-all duration-300
        ${isHome
          ? scrolled
            ? 'bg-slate-900/90 backdrop-blur shadow-lg h-16'
            : 'bg-transparent h-20'
          : 'bg-slate-900 shadow-lg h-16'}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className={`
            transition-all duration-300
            ${isHome
              ? scrolled
                ? 'opacity-100 w-40'
                : 'opacity-0 w-0'
              : 'opacity-100 w-40'}
          `}
        >
          <img
            src="/Herman_Ros_transparant.png"
            alt="Herman Ros"
            className="h-8"
          />
        </Link>

        {/* Menu */}
 
        <div className="flex space-x-10">
          <Link
            to="/"
            className={`
              ${linkClass}
              ${
                isHome && !scrolled
                  ? 'text-slate-700 hover:text-slate-900'
                  : 'text-gray-100 hover:text-amber-400'
              }
            `}
          >
            Home
          </Link>

          <Link
            to="/books"
            className={`
              ${linkClass}
              ${
                isHome && !scrolled
                  ? 'text-slate-700 hover:text-slate-900'
                  : 'text-gray-100 hover:text-amber-400'
              }
            `}
          >
            Boeken
          </Link>
        </div>


      </div>
    </nav>
  );
}

export default Navigation;
