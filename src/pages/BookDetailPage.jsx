import { useParams, Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

function BookDetailPage() {
  // Haal het book ID uit de URL (bijvoorbeeld /book/1)
  const { id } = useParams();
  const { books } = useAdmin();  
  // Zoek het juiste boek in onze data
  const book = books.find(b => b.id === parseInt(id));

  // Als het boek niet bestaat, toon een foutmelding
  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Boek niet gevonden
          </h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-semibold">
            ← Terug naar home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Terug knop */}
        <Link 
          to="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-8 transition-colors"
        >
          ← Terug naar home
        </Link>

        {/* Boek Details Grid */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            
            {/* Linker Kolom - Boek Cover */}
            <div className="flex justify-center">
              <img 
                src={book.cover_image} 
                alt={book.title}
                className="rounded-lg shadow-lg max-w-md w-full object-cover"
              />
            </div>

            {/* Rechter Kolom - Boek Informatie */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {book.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-6">
                door {book.author}
              </p>

              {/* Boek Details */}
              <div className="space-y-3 mb-8 text-gray-700">
                <div className="flex items-center">
                  <span className="font-semibold w-32">Publicatiejaar:</span>
                  <span>{book.publish_year}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-32">Pagina's:</span>
                  <span>{book.pages}</span>
                </div>
               {/* <div className="flex items-center">
                  <span className="font-semibold w-32">ISBN:</span>
                  <span>{book.isbn}</span>
                </div> */}
              </div>

              {/* Volledige Beschrijving */}
              <div className="prose prose-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Over dit boek
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {book.full_description}
                </p>
              </div>

              {/* Optioneel: Koop knoppen (kan je later toevoegen) */}
              <div className="mt-8 flex gap-4">
              <button
                onClick={() => window.open(book.order_url, "_blank", "noopener,noreferrer")}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Bestel nu
              </button>

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default BookDetailPage;