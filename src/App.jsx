import { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTrendingMovies, searchMovies } from './lib/tmdb';
import { getWatchlist, removeFromWatchlist } from './lib/api';
import { useUserStore } from './store/userStore';
import { MovieCard } from './components/MovieCard';
import { Film } from 'lucide-react';

function App() {
  const initializeUser = useUserStore((state) => state.initializeUser);

  useEffect(() => {
    initializeUser(); // Automatically register anonymous user on app load
  }, [initializeUser]);

  return (
    <div className="min-h-screen bg-background text-white flex flex-col font-sans">
      {/* Navbar */}
      <header className="border-b border-border-subtle bg-surface/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-primary flex items-center gap-2">
            <Film className="w-6 h-6" /> MovieVerse
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <Link to="/watchlist" className="hover:text-primary transition-colors">Watchlist</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/watchlist" element={<WatchlistView />} />
        </Routes>
      </main>
    </div>
  );
}

function HomeView() {
  const [searchQuery, setSearchQuery] = useState('');

  // React Query will automatically fetch Search Results if there is a query, else Trending
  const { data: movies, isLoading, isError } = useQuery({
    queryKey: ['movies', searchQuery],
    queryFn: () => searchQuery ? searchMovies(searchQuery) : fetchTrendingMovies(),
  });

  return (
    <div className="flex flex-col items-center w-full space-y-8 mt-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Discover Your Next <span className="text-primary">Favorite Movie</span>
        </h1>
        <p className="text-gray-400 max-w-2xl text-lg mx-auto">
          Explore trending blockbusters, search for hidden gems, and build your cinematic watchlist.
        </p>
      </div>
      
      {/* Search Input */}
      <div className="flex w-full max-w-md items-center space-x-2">
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for movies..." 
          className="flex h-12 w-full rounded-md border border-border-subtle bg-surface px-4 py-2 text-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
        />
      </div>

      {/* Movie Grid */}
      <div className="w-full">
        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8 w-full">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="animate-pulse bg-surface aspect-[2/3] rounded-xl border border-border-subtle"></div>
            ))}
          </div>
        )}
        
        {isError && (
          <p className="text-center text-red-500 mt-10 bg-red-500/10 p-4 rounded-md inline-block">
            Ralat ketika memanggil API TMDB. Pastikan API Key di fail .env betul.
          </p>
        )}
        
        {!isLoading && !isError && movies && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8 w-full">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        {!isLoading && movies?.length === 0 && (
          <p className="text-center text-gray-500 mt-10">Tiada filem dijumpai untuk carian: {searchQuery}</p>
        )}
      </div>
    </div>
  );
}

function WatchlistView() {
  const userId = useUserStore((state) => state.userId);
  const queryClient = useQueryClient();

  const { data: watchlist, isLoading } = useQuery({
    queryKey: ['watchlist', userId],
    queryFn: () => getWatchlist(userId),
    enabled: !!userId,
  });

  const removeMutation = useMutation({
    mutationFn: removeFromWatchlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlist', userId] });
    }
  });

  const handleRemove = (movieId) => {
    removeMutation.mutate({ userId, movieId });
  };

  return (
    <div className="flex flex-col items-center w-full mt-6">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Your <span className="text-primary">Watchlist</span>
        </h1>
        <p className="text-gray-400">Movies you want to watch later, safely stored in the cloud.</p>
      </div>

      {isLoading && <p className="text-center text-gray-500">Loading watchlist...</p>}
      
      {!isLoading && watchlist?.length === 0 && (
        <div className="text-center mt-10 bg-surface border border-border-subtle rounded-xl p-10 w-full max-w-2xl mx-auto">
          <p className="text-xl text-gray-400 mb-4">Senarai tontonan anda masih kosong.</p>
          <Link to="/" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-white hover:bg-primary/90 h-10 px-4 py-2">
            Cari Filem Sekarang
          </Link>
        </div>
      )}

      {!isLoading && watchlist && watchlist.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full">
          {watchlist.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              isWatchlistMode={true} 
              onRemove={handleRemove} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
