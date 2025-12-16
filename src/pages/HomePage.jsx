import BookCard from '../components/BookCard';
import { useAdmin } from '../context/AdminContext';

function HomePage() {
  const { heroData, authorData, books } = useAdmin();

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Auteur logo boven hero */}
      <div className="relative overflow-hidden">
        {/* Zachte achtergrond */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 pt-10 pb-12 flex justify-center">
          <img
            src="/Herman_Ros_transparant.png"
            alt="Herman Ros"
            className="w-64 sm:w-72 md:w-96"
          />
        </div>
      </div>

      
{/* Hero Sectie - Modern & Licht */}
      <section className="relative bg-white py-20 overflow-hidden">
        {/* Subtiele gradient achtergrond */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-amber-50/30"></div>


        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            {/* Linker Kolom - Afbeelding */}
            <div className="order-2 md:order-1">
              <div className="relative">
                {/* Subtiele shadow in plaats van heavy border */}
                <img 
                  src="/public/Rik De Visscher.png" 
                  alt="Mystery Scene"
                  className="rounded-2xl shadow-2xl w-full hover:shadow-3xl transition-shadow duration-300"
                />
                {/* Optionele accent */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-400/20 rounded-full blur-3xl -z-10"></div>
              </div>
            </div>

            {/* Rechter Kolom - Tekst */}
            <div className="order-1 md:order-2">
              {/* Auteur naam als grafisch element */}

              <h1 className="text-3xl md:text-4xl font-display font-bold mb-6 text-slate-900 tracking-tight leading-tight">
                {heroData.title}
              </h1>

              {/* Moderne accent lijn */}
              <div className="w-16 h-1 bg-amber-500 mb-8 rounded-full"></div>
              
              <div className="text-lg text-slate-700 leading-relaxed font-body space-y-4">
                <p>{heroData.paragraph1}</p>
                <p>{heroData.paragraph2}</p>
                <p>{heroData.paragraph3}</p>
              </div>

              {/* Optionele CTA button */}
              <div className="mt-8">
                <a 
                  href="books" 
                  className="inline-block bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-body font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Ontdek mijn boeken →
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Boeken Sectie - Nu met admin data */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-display font-bold text-slate-900 mb-4">
              Gepubliceerde Werken
            </h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 font-body italic">
              Een collectie van verhalen die u tot het einde zullen boeien
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Over de Auteur Sectie - Nu met admin data */}
      <section className="bg-slate-800 py-20 text-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            <div className="order-2 md:order-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-amber-600/20 rounded-lg"></div>
                <img 
                  src={"images/Herman Ros4.jpg"}
                  alt={authorData.name}
                  className="relative rounded-lg shadow-2xl w-full max-w-md mx-auto border-4 border-amber-700/30"
                />
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <h2 className="text-5xl font-display font-bold text-amber-500 mb-8">
                Over de Auteur
              </h2>
              <div className="text-gray-300 space-y-6 text-lg leading-relaxed font-body">
                <p>{authorData.bio1}</p>
                <p>{authorData.bio2}</p>
                <p>{authorData.bio3}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default HomePage;