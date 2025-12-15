import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

function AdminDashboard() {
  const navigate = useNavigate();
  const { heroData, authorData, books, saveHeroData, saveAuthorData, addBook, updateBook, deleteBook } = useAdmin();
  
  const [activeTab, setActiveTab] = useState('hero');
  const [heroForm, setHeroForm] = useState(heroData);
  const [authorForm, setAuthorForm] = useState(authorData);
  const [saved, setSaved] = useState(false);
  const [showBookForm, setShowBookForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  

  // Check of ingelogd
  useEffect(() => {
    if (sessionStorage.getItem('adminLoggedIn') !== 'true') {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminLoggedIn');
    navigate('/admin');
  };

  const handleSaveHero = async () => {
    await saveHeroData(heroForm);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleSaveAuthor = async () => {
    await saveAuthorData(authorForm);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

return (
    <div className="min-h-screen bg-slate-50">
      {/* Header - Lichter */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-display font-bold text-slate-900">
              Admin Dashboard
            </h1>
            <div className="flex gap-4 items-center">
              <a 
                href="/" 
                target="_blank"
                className="text-slate-600 hover:text-slate-900 font-body transition-colors"
              >
                Bekijk Website →
              </a>
              <button
                onClick={handleLogout}
                className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-body transition-colors"
              >
                Uitloggen
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Success Message */}
        {saved && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl font-body shadow-sm">
            ✓ Wijzigingen opgeslagen!
          </div>
        )}

        {/* Tabs - Moderne styling */}
        <div className="flex gap-2 mb-8 bg-white rounded-xl p-2 shadow-sm">
          <button
            onClick={() => setActiveTab('hero')}
            className={`flex-1 px-6 py-3 font-body font-semibold rounded-lg transition-all ${
              activeTab === 'hero'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Hero Sectie
          </button>
          <button
            onClick={() => setActiveTab('books')}
            className={`flex-1 px-6 py-3 font-body font-semibold rounded-lg transition-all ${
              activeTab === 'books'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Boeken
          </button>
          <button
            onClick={() => setActiveTab('author')}
            className={`flex-1 px-6 py-3 font-body font-semibold rounded-lg transition-all ${
              activeTab === 'author'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Over de Auteur
          </button>
        </div>

        {/* Hero Tab */}
        {activeTab === 'hero' && (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-6">
              Hero Sectie Bewerken
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-slate-700 font-body font-semibold mb-2">
                  Titel
                </label>
                <input
                  type="text"
                  value={heroForm.title}
                  onChange={(e) => setHeroForm({...heroForm, title: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-body focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-body font-semibold mb-2">
                  Eerste Alinea
                </label>
                <textarea
                  value={heroForm.paragraph1}
                  onChange={(e) => setHeroForm({...heroForm, paragraph1: e.target.value})}
                  rows="4"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-body focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-body font-semibold mb-2">
                  Tweede Alinea
                </label>
                <textarea
                  value={heroForm.paragraph2}
                  onChange={(e) => setHeroForm({...heroForm, paragraph2: e.target.value})}
                  rows="4"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-body focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-body font-semibold mb-2">
                  Derde Alinea
                </label>
                <textarea
                  value={heroForm.paragraph3}
                  onChange={(e) => setHeroForm({...heroForm, paragraph3: e.target.value})}
                  rows="4"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-body focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                />
              </div>

              <button
                onClick={handleSaveHero}
                className="bg-slate-900 hover:bg-slate-800 text-white font-body font-bold py-3 px-8 rounded-lg transition-all hover:shadow-lg"
              >
                Opslaan
              </button>
            </div>
          </div>
        )}

        {/* Books Tab */}
        {activeTab === 'books' && (
          <div className="space-y-8">
            
            {/* Add New Book Button */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <button
                onClick={() => {
                  setEditingBook({
                    title: '',
                    author: authorData.name,
                    cover_image: '/images/book-placeholder.jpg',
                    short_description: '',
                    full_description: '',
                    publish_year: new Date().getFullYear(),
                    pages: 0,
                    isbn: '',
                    order_url: ''
                  });
                  setShowBookForm(true);
                }}
                className="bg-slate-900 hover:bg-slate-800 text-white font-body font-bold py-3 px-6 rounded-lg transition-all hover:shadow-lg"
              >
                + Nieuw Boek Toevoegen
              </button>
            </div>

            {/* Book Form (Add/Edit) */}
            {showBookForm && (
              <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-900">
                <h3 className="text-2xl font-display font-bold text-slate-900 mb-6">
                  {editingBook.id ? 'Boek Bewerken' : 'Nieuw Boek'}
                </h3>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-slate-700 font-body font-semibold mb-2">
                        Titel *
                      </label>
                      <input
                        type="text"
                        value={editingBook.title}
                        onChange={(e) => setEditingBook({...editingBook, title: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-body focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-body font-semibold mb-2">
                        Auteur
                      </label>
                      <input
                        type="text"
                        value={editingBook.author}
                        onChange={(e) => setEditingBook({...editingBook, author: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-body focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-body font-semibold mb-2">
                      Cover Afbeelding Pad
                    </label>
                    <input
                      type="text"
                      value={editingBook.cover_image}
                      onChange={(e) => setEditingBook({...editingBook, cover_image: e.target.value})}
                      placeholder="/images/book1.jpg"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-body focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                    />
                    <p className="text-slate-500 text-sm mt-1 font-body">
                      Plaats afbeelding in public/images/ en voer pad in zoals: /images/boek1.jpg
                    </p>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-body font-semibold mb-2">
                      Korte Beschrijving *
                    </label>
                    <textarea
                      value={editingBook.short_description}
                      onChange={(e) => setEditingBook({...editingBook, short_description: e.target.value})}
                      rows="3"
                      placeholder="Deze verschijnt op de homepage..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-body focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-body font-semibold mb-2">
                      Volledige Beschrijving *
                    </label>
                    <textarea
                      value={editingBook.full_description}
                      onChange={(e) => setEditingBook({...editingBook, full_description: e.target.value})}
                      rows="8"
                      placeholder="Gedetailleerde beschrijving voor de boekenpagina..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-body focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-slate-700 font-body font-semibold mb-2">
                        Publicatiejaar
                      </label>
                      <input
                        type="number"
                        value={editingBook.publish_year}
                        onChange={(e) => setEditingBook({...editingBook, publish_year: parseInt(e.target.value)})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-body focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-body font-semibold mb-2">
                        Aantal Pagina's
                      </label>
                      <input
                        type="number"
                        value={editingBook.pages}
                        onChange={(e) => setEditingBook({...editingBook, pages: parseInt(e.target.value)})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-body focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-body font-semibold mb-2">
                        ISBN
                      </label>
                      <input
                        type="text"
                        value={editingBook.isbn}
                        onChange={(e) => setEditingBook({...editingBook, isbn: e.target.value})}
                        placeholder="978-1234567890"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-body focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-body font-semibold mb-2">
                      Bestel URL (optioneel)
                    </label>
                    <input
                      type="url"
                      value={editingBook.order_url || ''}
                      onChange={(e) => setEditingBook({...editingBook, order_url: e.target.value})}
                      placeholder="https://www.bol.com/..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-body focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                    />
                    <p className="text-slate-500 text-sm mt-1 font-body">
                      Link naar Bol.com, Amazon, of andere webshop waar het boek gekocht kan worden
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={async () => {
                        if (editingBook.id) {
                          await updateBook(editingBook.id, editingBook);
                        } else {
                          await addBook(editingBook);
                        }
                        setShowBookForm(false);
                        setEditingBook(null);
                        setSaved(true);
                        setTimeout(() => setSaved(false), 3000);
                      }}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-body font-bold py-3 px-8 rounded-lg transition-all hover:shadow-lg"
                    >
                      {editingBook.id ? 'Bijwerken' : 'Toevoegen'}
                    </button>
                    <button
                      onClick={() => {
                        setShowBookForm(false);
                        setEditingBook(null);
                      }}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-900 font-body font-bold py-3 px-8 rounded-lg transition-all"
                    >
                      Annuleren
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Books List */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-2xl font-display font-bold text-slate-900 mb-6">
                Huidige Boeken ({books.length})
              </h3>

              {books.length === 0 ? (
                <p className="text-slate-500 font-body text-center py-8">
                  Nog geen boeken toegevoegd. Klik op "Nieuw Boek Toevoegen" om te beginnen.
                </p>
              ) : (
                <div className="space-y-4">
                  {books.map(book => (
                    <div key={book.id} className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all">
                      <div className="flex items-start gap-6">
                        {/* Book Cover Preview */}
                        <img 
                          src={book.cover_image} 
                          alt={book.title}
                          className="w-24 h-36 object-cover rounded-lg border-2 border-slate-200 shadow-sm"
                          onError={(e) => {
                            e.target.src = '/images/book-placeholder.jpg';
                          }}
                        />
                        
                        {/* Book Info */}
                        <div className="flex-1">
                          <h4 className="text-xl font-display font-bold text-slate-900 mb-2">
                            {book.title}
                          </h4>
                          <p className="text-slate-600 font-body text-sm mb-2">
                            {book.author} • {book.publish_year} • {book.pages} pagina's
                          </p>
                          <p className="text-slate-700 font-body line-clamp-2">
                            {book.short_description}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => {
                              setEditingBook(book);
                              setShowBookForm(true);
                            }}
                            className="bg-slate-900 hover:bg-slate-800 text-white font-body px-4 py-2 rounded-lg transition-all text-sm"
                          >
                            Bewerken
                          </button>
                          <button
                            onClick={async () => {
                              if (window.confirm(`Weet je zeker dat je "${book.title}" wilt verwijderen?`)) {
                                await deleteBook(book.id);
                                setSaved(true);
                                setTimeout(() => setSaved(false), 3000);
                              }
                            }}
                            className="bg-red-50 hover:bg-red-100 text-red-700 font-body px-4 py-2 rounded-lg transition-all text-sm border border-red-200"
                          >
                            Verwijderen
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Author Tab */}
        {activeTab === 'author' && (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-6">
              Over de Auteur Bewerken
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-slate-700 font-body font-semibold mb-2">
                  Naam
                </label>
                <input
                  type="text"
                  value={authorForm.name}
                  onChange={(e) => setAuthorForm({...authorForm, name: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-body focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-body font-semibold mb-2">
                  Eerste Alinea
                </label>
                <textarea
                  value={authorForm.bio1}
                  onChange={(e) => setAuthorForm({...authorForm, bio1: e.target.value})}
                  rows="4"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-body focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-body font-semibold mb-2">
                  Tweede Alinea
                </label>
                <textarea
                  value={authorForm.bio2}
                  onChange={(e) => setAuthorForm({...authorForm, bio2: e.target.value})}
                  rows="4"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-body focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-body font-semibold mb-2">
                  Derde Alinea
                </label>
                <textarea
                  value={authorForm.bio3}
                  onChange={(e) => setAuthorForm({...authorForm, bio3: e.target.value})}
                  rows="4"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-body focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                />
              </div>

              <button
                onClick={handleSaveAuthor}
                className="bg-slate-900 hover:bg-slate-800 text-white font-body font-bold py-3 px-8 rounded-lg transition-all hover:shadow-lg"
              >
                Opslaan
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminDashboard;