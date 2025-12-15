import { Link } from 'react-router-dom';

// Deze component toont één boek als een kaart
function BookCard({ book }) {
  return (
    <Link to={`/book/${book.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
        
        {/* Boek Cover Afbeelding */}
        <div className="aspect-[2/3] bg-gray-200 overflow-hidden">
          <img 
            src={book.cover_image} 
            alt={book.title}
            className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
          />
        </div>
        
        {/* Boek Info */}
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {book.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3">
            {book.short_description}
          </p>
          <p className="text-blue-600 font-semibold mt-3 group-hover:text-blue-800">
            Lees meer →
          </p>
        </div>
      </div>
    </Link>
  );
}

export default BookCard;