import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  // Hero sectie data
  const [heroData, setHeroData] = useState({
    title: 'Mag ik je het hoofdpersonage van mijn boekenreeks voorstellen?',
    paragraph1: '',
    paragraph2: 'Zijn naam is Rik De Visscher. Hij is een Oostendse visserszoon die na zijn studies criminologie aan de UGent in de Arteveldestad is blijven hangen. Dat hij daar in zijn studententijd zijn toekomstige vrouw, Ria, heeft leren kennen, is niet vreemd aan die keuze. Samen krijgen ze twee kinderen: Femke en Arno. Rik klimt op in de hiërarchie van de Gentse flikken en schopt het tot hoofdinspecteur van de lokale recherche. In elk boek krijgt hij een zaak voorgeschoteld die hij tot een goed einde moet brengen. Hij doet dat samen met een team van toegewijde rechercheurs. Eén ervan is Aicha, een knappe Marokkaanse, waarvoor Rik meer dan een boontje heeft.',
    paragraph3: 'Alle verhalen spelen zich af in Gent en ademen de couleur locale van de stad van licht en liefde. De thema’s die aan bod komen, zijn onder meer: misbruik in de kerk, intrafamiliaal geweld, drugscriminaliteit, pedocriminaliteit, wraak en verraad.  Wil je Rik De Visscher leren kennen? Lees dan onderstaande boeken. Ze zijn als e-books verkrijgbaar op kobo.com en bol.com. Je kan ze in volgorde of afzonderlijk lezen. Veel leesplezier! Als je klikt op de covers, kom je meer te weten over de inhoud. ',
  });

  // Auteur sectie data
  const [authorData, setAuthorData] = useState({
    name: 'Herman Ros',
    bio1: 'Hij is een topper!',
    bio2: 'Hij woont samen met het Conneke in Kruishoutem.',
    bio3: 'Naast schrijven houdt hij zich bezig met het zorgen voor zijn kippen en jaagt hij op mollen, ratten en muizen!',
    photo: '/public/Herman Ros4.jpg',
  });

  // Boeken data
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Luistervinck",
      author: "Herman Ros",
      coverImage: "/public/Cover_Luistervinck_small.jpg",
      shortDescription: "Korte beschrijving",
      fullDescription: "Volledige beschrijving",
      publishYear: 2024,
      pages: 350,
      isbn: "978-1234567890"
    },
        {
      id: 2,
      title: "Vermissing",
      author: "Herman Ros",
      coverImage: "/public/vermissing.jpg",
      shortDescription: "Korte beschrijving",
      fullDescription: "Volledige beschrijving",
      publishYear: 2024,
      pages: 350,
      isbn: "978-1234567890"
    },
  ]);

  // Laad data uit storage bij opstarten
  useEffect(() => {
    const loadData = async () => {
      try {
        const heroResult = await window.storage.get('hero-data');
        const authorResult = await window.storage.get('author-data');
        const booksResult = await window.storage.get('books-data');

        if (heroResult) setHeroData(JSON.parse(heroResult.value));
        if (authorResult) setAuthorData(JSON.parse(authorResult.value));
        if (booksResult) setBooks(JSON.parse(booksResult.value));
      } catch (error) {
        console.log('Geen opgeslagen data gevonden, gebruik defaults');
      }
    };
    loadData();
  }, []);

  // Save functies
  const saveHeroData = async (data) => {
    setHeroData(data);
    try {
      await window.storage.set('hero-data', JSON.stringify(data));
    } catch (error) {
      console.error('Fout bij opslaan:', error);
    }
  };

  const saveAuthorData = async (data) => {
    setAuthorData(data);
    try {
      await window.storage.set('author-data', JSON.stringify(data));
    } catch (error) {
      console.error('Fout bij opslaan:', error);
    }
  };

  const saveBooks = async (data) => {
    setBooks(data);
    try {
      await window.storage.set('books-data', JSON.stringify(data));
    } catch (error) {
      console.error('Fout bij opslaan:', error);
    }
  };

  const addBook = async (book) => {
    const newBook = { ...book, id: Date.now() };
    const updatedBooks = [...books, newBook];
    await saveBooks(updatedBooks);
  };

  const updateBook = async (id, updatedBook) => {
    const updatedBooks = books.map(b => b.id === id ? { ...b, ...updatedBook } : b);
    await saveBooks(updatedBooks);
  };

  const deleteBook = async (id) => {
    const updatedBooks = books.filter(b => b.id !== id);
    await saveBooks(updatedBooks);
  };

  return (
    <AdminContext.Provider value={{
      heroData,
      authorData,
      books,
      saveHeroData,
      saveAuthorData,
      addBook,
      updateBook,
      deleteBook,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}