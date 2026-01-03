import BookCard from '../components/BookCard';
import { useAdmin } from '../context/AdminContext';
import { useState, useEffect, useRef } from 'react';

function HomePage() {
  const { heroData, authorData, books } = useAdmin();
const [showFullHero, setShowFullHero] = useState(false);
const textRef = useRef(null);
const [textHeight, setTextHeight] = useState(0);

useEffect(() => {
  if (textRef.current) {
    setTextHeight(textRef.current.scrollHeight);
  }
}, [heroData, showFullHero]);

  return (
<div className="min-h-screen bg-slate-100">

  {/* Auteur logo boven hero */}
  <div className="relative">
    
    {/* Subtiele achtergrond */}
    <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-transparent" />

    <div className="relative max-w-7xl mx-auto px-4 pt-14 pb-8 flex justify-center">
      <img
        src="/Herman_Ros_transparant.png"
        alt="Herman Ros"
        className="
          w-48 sm:w-56 md:w-64
          opacity-95
        "
      />
    </div>

    {/* Fijne scheidingslijn */}
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300/50 to-transparent" />
  </div>


{/* Hero Sectie - Modern & Licht met dynamische hoogte */}
<section 
  className="relative bg-white overflow-hidden"
>
  {/* Subtiele gradient achtergrond */}
  <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-amber-50/30"></div>
  
  <div 
    className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-in-out"
    style={{
      paddingTop: showFullHero ? '5rem' : '3rem',
      paddingBottom: showFullHero ? '5rem' : '2rem'
    }}
  >
    <div 
      className="grid grid-cols-1 md:grid-cols-2 items-start transition-all duration-700 ease-in-out"
      style={{
        gap: showFullHero ? '4rem' : '2rem'
      }}
    >
      
{/* Linker Kolom - Afbeelding */}
<div className="order-2 md:order-1 transition-all duration-700 ease-in-out">
  <div className="relative">
    <div 
      className="relative rounded-2xl shadow-2xl overflow-hidden transition-all duration-700 ease-in-out hover:shadow-3xl"
      style={{
        width: showFullHero ? '100%' : '50%',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}
    >
      <img 
        src="/Rik De Visscher.png" 
        alt="Mystery Scene"
        className="w-full h-auto object-contain"
      />
    </div>
    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-400/20 rounded-full blur-3xl -z-10 transition-all duration-700"></div>
  </div>
</div>

      {/* Rechter Kolom - Tekst */}
      <div className="order-1 md:order-2">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-6 text-slate-900 tracking-tight leading-tight">
          {heroData.title}
        </h1>

        {/* Moderne accent lijn */}
        <div className="w-16 h-1 bg-amber-500 mb-8 rounded-full"></div>
        
        <div className="text-lg text-slate-700 leading-relaxed font-body" ref={textRef}>
          {/* Eerste paragraaf - altijd zichtbaar */}
          <p className="mb-4">{heroData.paragraph1}</p>
          
          {/* Overige paragrafen - smooth expand/collapse */}
          <div 
            className="grid transition-all duration-700 ease-in-out"
            style={{
              gridTemplateRows: showFullHero ? '1fr' : '0fr',
              opacity: showFullHero ? 1 : 0
            }}
          >
            <div className="overflow-hidden">
              <div className="space-y-4 pb-4">
                <p>{heroData.paragraph2}</p>
                <p>{heroData.paragraph3}</p>
              </div>
            </div>
          </div>
          
          {/* Lees meer / Lees minder knop */}
          <button
            onClick={() => setShowFullHero(!showFullHero)}
            className="text-slate-900 hover:text-amber-600 font-semibold transition-colors flex items-center gap-2 group mt-4"
          >
            {showFullHero ? 'Lees minder' : 'Lees meer'}
            <svg 
              className={`w-4 h-4 transition-transform duration-300 ${
                showFullHero ? 'rotate-180' : 'rotate-0'
              }`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* CTA button */}
        <div className="mt-8">
          <a 
            href="/books" 
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
              
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

{/* Over de Auteur */}
<section className="relative bg-slate-900 text-gray-200">
  
  {/* Subtiele achtergrondtextuur */}
  <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800" />

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

      {/* Afbeelding */}
      <div className="order-2 md:order-1 flex justify-center">
        <div className="relative">
          
          {/* Fijne kaderlijn i.p.v. glow */}
          <div className="absolute inset-0 -translate-x-3 -translate-y-3 border border-amber-500/30 rounded-md" />

          <img
            src="/images/Herman Ros4.jpg"
            alt={authorData.name}
            className="
              relative z-10
              w-full max-w-sm
              rounded-md
              shadow-xl
            "
          />
        </div>
      </div>

      {/* Tekst */}
      <div className="order-1 md:order-2 max-w-xl">
        <h2 className="text-4xl font-display font-semibold text-amber-400 mb-6 tracking-tight">
          Over de auteur
        </h2>

        {/* Subtiele divider */}
        <div className="w-12 h-px bg-amber-400/40 mb-8" />

        <div className="space-y-6 text-gray-300 text-base leading-relaxed font-body">
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