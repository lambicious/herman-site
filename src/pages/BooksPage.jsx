import BookCard from '../components/BookCard';
import { useAdmin } from '../context/AdminContext';

function BooksPage() {
const { books } = useAdmin();
  return (
    <div className="min-h-screen bg-gray-50 py-12 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Alle Boeken
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ontdek mijn volledige collectie verhalen.
          </p>
        </div>

        {/* Boeken Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {/* Optioneel: Melding als er geen boeken zijn */}
        {books.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Er zijn momenteel geen boeken beschikbaar.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default BooksPage;