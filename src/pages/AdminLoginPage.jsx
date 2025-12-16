import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Simpel wachtwoord (later kan je dit complexer maken)
 const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_KEY;
 if (!ADMIN_PASSWORD) {
  throw new Error('VITE_ADMIN_PASSWORD not configured');
}

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (password === ADMIN_PASSWORD) {
      // Sla login status op
      sessionStorage.setItem('adminLoggedIn', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Onjuist wachtwoord');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-slate-800 rounded-lg shadow-2xl p-8 border border-amber-700/30">
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-display font-bold text-amber-500 mb-2">
              Admin Login
            </h1>
            <p className="text-gray-400 font-body">
              Voer je wachtwoord in om door te gaan
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-body font-semibold text-gray-300 mb-2"
              >
                Wachtwoord
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white font-body focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Voer wachtwoord in"
                required
              />
            </div>

            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg font-body">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-body font-bold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              Inloggen
            </button>
          </form>

          <div className="mt-6 text-center">
            <a 
              href="/" 
              className="text-amber-500 hover:text-amber-400 font-body text-sm transition-colors"
            >
              ← Terug naar website
            </a>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-gray-500 text-sm font-body">
            Standaard wachtwoord: <span className="text-amber-500">admin123</span>
          </p>
          <p className="text-gray-600 text-xs mt-1 font-body">
            (Dit kan je later aanpassen)
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;