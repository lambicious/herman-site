import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [heroData, setHeroData] = useState({
    title: 'Mysteries in de Schaduw',
    paragraph1: 'Eerste alinea placeholder...',
    paragraph2: 'Tweede alinea placeholder...',
    paragraph3: 'Derde alinea placeholder...',
  });

  const [authorData, setAuthorData] = useState({
    name: 'Auteur Naam',
    bio1: 'Eerste bio alinea...',
    bio2: 'Tweede bio alinea...',
    bio3: 'Derde bio alinea...',
    photo: '/images/author.jpg',
  });

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Laad data uit Supabase
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load hero data
        const { data: heroResult, error: heroError } = await supabase
          .from('hero_data')
          .select('*')
          .eq('id', 1)
          .single();
        
        if (!heroError && heroResult) {
          setHeroData({
            title: heroResult.title,
            paragraph1: heroResult.paragraph1,
            paragraph2: heroResult.paragraph2,
            paragraph3: heroResult.paragraph3,
          });
        }

        // Load author data
        const { data: authorResult, error: authorError } = await supabase
          .from('author_data')
          .select('*')
          .eq('id', 1)
          .single();
        
        if (!authorError && authorResult) {
          setAuthorData({
            name: authorResult.name,
            bio1: authorResult.bio1,
            bio2: authorResult.bio2,
            bio3: authorResult.bio3,
            photo: authorResult.photo,
          });
        }

        // Load books
        const { data: booksResult, error: booksError } = await supabase
          .from('books')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (!booksError && booksResult) {
          setBooks(booksResult);
        }

      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Save hero data
  const saveHeroData = async (data) => {
    setHeroData(data);
    try {
      const { error } = await supabase
        .from('hero_data')
        .update({
          title: data.title,
          paragraph1: data.paragraph1,
          paragraph2: data.paragraph2,
          paragraph3: data.paragraph3,
          updated_at: new Date().toISOString()
        })
        .eq('id', 1);
      
      if (error) throw error;
    } catch (error) {
      console.error('Error saving hero data:', error);
      throw error;
    }
  };

  // Save author data
  const saveAuthorData = async (data) => {
    setAuthorData(data);
    try {
      const { error } = await supabase
        .from('author_data')
        .update({
          name: data.name,
          bio1: data.bio1,
          bio2: data.bio2,
          bio3: data.bio3,
          photo: data.photo,
          updated_at: new Date().toISOString()
        })
        .eq('id', 1);
      
      if (error) throw error;
    } catch (error) {
      console.error('Error saving author data:', error);
      throw error;
    }
  };

  // Add book
  const addBook = async (book) => {
    try {
      const { data, error } = await supabase
        .from('books')
        .insert([{
          title: book.title,
          author: book.author,
          cover_image: book.coverImage,
          short_description: book.shortDescription,
          full_description: book.fullDescription,
          publish_year: book.publishYear,
          pages: book.pages,
          isbn: book.isbn,
          order_url: book.orderUrl
        }])
        .select();
      
      if (error) throw error;
      
      if (data && data[0]) {
        setBooks([...books, data[0]]);
      }
    } catch (error) {
      console.error('Error adding book:', error);
      throw error;
    }
  };

  // Update book
  const updateBook = async (id, updatedBook) => {
    try {
      const { error } = await supabase
        .from('books')
        .update({
          title: updatedBook.title,
          author: updatedBook.author,
          cover_image: updatedBook.coverImage,
          short_description: updatedBook.shortDescription,
          full_description: updatedBook.fullDescription,
          publish_year: updatedBook.publishYear,
          pages: updatedBook.pages,
          isbn: updatedBook.isbn,
          order_url: updatedBook.orderUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
      
      if (error) throw error;
      
      setBooks(books.map(b => b.id === id ? { ...b, ...updatedBook } : b));
    } catch (error) {
      console.error('Error updating book:', error);
      throw error;
    }
  };

  // Delete book
  const deleteBook = async (id) => {
    try {
      const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setBooks(books.filter(b => b.id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  };

  return (
    <AdminContext.Provider value={{
      heroData,
      authorData,
      books,
      loading,
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