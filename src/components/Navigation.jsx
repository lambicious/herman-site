import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="bg-slate-900 text-gray-100 shadow-2xl sticky top-0 z-50 border-b border-amber-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Auteur Naam - Elegante serif font */}
          <Link to="/" className="text-3xl font-display font-bold hover:text-amber-500 transition-colors tracking-wide">
           Herman Ros
          </Link>
          
          {/* Menu Items */}
          <div className="flex space-x-10">
            <Link 
              to="/" 
              className="hover:text-amber-500 transition-colors font-display text-lg tracking-wide"
            >
              Home
            </Link>
            <Link 
              to="/books" 
              className="hover:text-amber-500 transition-colors font-display text-lg tracking-wide"
            >
              Boeken
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;