import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data blijft 5 minuten "fresh"
      cacheTime: 1000 * 60 * 30, // Cache blijft 30 minuten in memory
      refetchOnWindowFocus: false, // Niet refetch bij window focus
      refetchOnMount: false, // Niet refetch bij component mount als data cached is
      retry: 1, // 1x retry bij error
    },
  },
});