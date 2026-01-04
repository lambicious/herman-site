import { createContext, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

const AdminContext = createContext();

// Fetch functies
const fetchHeroData = async () => {
  const { data, error } = await supabase
    .from('hero_data')
    .select('*')
    .eq('id', 1)
    .single();
  
  if (error) throw error;
  
  return {
    title: data.title,
    paragraph1: data.paragraph1,
    paragraph2: data.paragraph2,
    paragraph3: data.paragraph3,
  };
};

const fetchAuthorData = async () => {
  const { data, error } = await supabase
    .from('author_data')
    .select('*')
    .eq('id', 1)
    .single();
  
  if (error) throw error;
  
  return {
    name: data.name,
    bio1: data.bio1,
    bio2: data.bio2,
    bio3: data.bio3,
    photo: data.photo,
  };
};

const fetchBooks = async () => {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export function AdminProvider({ children }) {
  const queryClient = useQueryClient();

  // Use React Query met caching
  const { data: heroData = {
    title: '',
    paragraph1: '',
    paragraph2: '',
    paragraph3: '',
  }, isLoading: heroLoading } = useQuery({
    queryKey: ['heroData'],
    queryFn: fetchHeroData,
    staleTime: 1000 * 60 * 5, // 5 minuten
  });

  const { data: authorData = {
    name: 'Auteur Naam',
    bio1: 'Eerste bio alinea...',
    bio2: 'Tweede bio alinea...',
    bio3: 'Derde bio alinea...',
    photo: '/images/author.jpg',
  }, isLoading: authorLoading } = useQuery({
    queryKey: ['authorData'],
    queryFn: fetchAuthorData,
    staleTime: 1000 * 60 * 5,
  });

  const { data: books = [], isLoading: booksLoading } = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
    staleTime: 1000 * 60 * 5,
  });

  const loading = heroLoading || authorLoading || booksLoading;

  // Mutations
  const saveHeroMutation = useMutation({
    mutationFn: async (data) => {
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
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['heroData'], data);
    }
  });

  const saveAuthorMutation = useMutation({
    mutationFn: async (data) => {
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
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['authorData'], data);
    }
  });

  const addBookMutation = useMutation({
    mutationFn: async (book) => {
      const { data, error } = await supabase
        .from('books')
        .insert([{
          title: book.title,
          author: book.author,
          cover_image: book.cover_image,
          short_description: book.short_description,
          full_description: book.full_description,
          publish_year: book.publish_year,
          pages: book.pages,
          isbn: book.isbn,
          order_url: book.order_url
        }])
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
    }
  });

  const updateBookMutation = useMutation({
    mutationFn: async ({ id, updatedBook }) => {
      const { error } = await supabase
        .from('books')
        .update({
          title: updatedBook.title,
          author: updatedBook.author,
          cover_image: updatedBook.cover_image,
          short_description: updatedBook.short_description,
          full_description: updatedBook.full_description,
          publish_year: updatedBook.publish_year,
          pages: updatedBook.pages,
          isbn: updatedBook.isbn,
          order_url: updatedBook.order_url,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
    }
  });

  const deleteBookMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
    }
  });

  // Wrapper functies (zelfde API als voorheen)
  const saveHeroData = async (data) => {
    await saveHeroMutation.mutateAsync(data);
  };

  const saveAuthorData = async (data) => {
    await saveAuthorMutation.mutateAsync(data);
  };

  const addBook = async (book) => {
    await addBookMutation.mutateAsync(book);
  };

  const updateBook = async (id, updatedBook) => {
    await updateBookMutation.mutateAsync({ id, updatedBook });
  };

  const deleteBook = async (id) => {
    await deleteBookMutation.mutateAsync(id);
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