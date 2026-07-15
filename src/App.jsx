import { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTrendingMovies, fetchPopularMovies, fetchTopRatedMovies, searchMovies, fetchFeaturedMovie, fetchMovieVideos } from './lib/tmdb';
import { getWatchlist, removeFromWatchlist } from './lib/api';
import { useUserStore } from './store/userStore';
import { MovieCard } from './components/MovieCard';
import { MovieRow } from './components/MovieRow';
import { Hero } from './components/Hero';
import { MovieDetail } from './components/MovieDetail';
import { Film, Search, Bell, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Dedicated Trailer Player Component inside the Dialog
function TrailerPlayer({ movieId, title }) {
  const { data: videos, isLoading } = useQuery({
    queryKey: ['videos', movieId],
    queryFn: () => fetchMovieVideos(movieId),
    enabled: !!movieId
  });

  if (isLoading) return <div className="w-full h-full absolute inset-0 flex items-center justify-center bg-black text-white text-lg">Loading Official Trailer...</div>;

  const trailer = videos?.find(vid => vid.type === 'Trailer' && vid.site === 'YouTube') || videos?.find(vid => vid.site === 'YouTube');

  if (!trailer) {
    return (
      <div className="w-full h-full absolute inset-0 flex flex-col items-center justify-center bg-black text-white space-y-4">
        <Film className="w-16 h-16 opacity-50" />
        <p className="text-xl">No official trailer is available.</p>
        <Link to={`/movie/${movieId}`} className="mt-4 bg-primary px-6 py-2 rounded font-medium hover:bg-primary/80 transition-colors">
          Browse Similar Movies
        </Link>
      </div>
    );
  }

  return (
    <iframe 
      src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
      className="w-full h-full absolute inset-0 border-0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title={`Trailer: ${title}`}
    ></iframe>
  );
}

function App() {
  const initializeUser = useUserStore((state) => state.initializeUser);
  const [isScrolled, setIsScrolled] = useState(false);
  const [playerConfig, setPlayerConfig] = useState({ isOpen: false, movieId: null, title: '' });
  const location = useLocation();

  useEffect(() => {
    initializeUser(); 
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [initializeUser]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const openPlayer = (movieId, title) => setPlayerConfig({ isOpen: true, movieId, title });
  const closePlayer = () => setPlayerConfig({ isOpen: false, movieId: null, title: '' });

  return (
    <div className="min-h-screen bg-background text-white font-sans overflow-x-hidden selection:bg-primary/30">
      {/* Premium Sticky Navbar */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-md shadow-md py-4' : 'bg-gradient-to-b from-black/80 to-transparent py-6'}`}>
        <div className="container mx-auto px-4 md:px-12 max-w-[1440px] flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-3xl font-black tracking-tighter text-primary flex items-center gap-2 hover:scale-105 transition-transform">
              <Film className="w-8 h-8 fill-current" /> MovieVerse
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
              <Link to="/" className={`hover:text-white transition-colors ${location.pathname === '/' ? 'text-white font-semibold' : ''}`}>Home</Link>
              <Link to="/search" className={`hover:text-white transition-colors ${location.pathname === '/search' ? 'text-white font-semibold' : ''}`}>Discover</Link>
              <Link to="/watchlist" className={`hover:text-white transition-colors ${location.pathname === '/watchlist' ? 'text-white font-semibold' : ''}`}>My List</Link>
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/search" className="text-gray-300 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </Link>
            <button className="text-gray-300 hover:text-white transition-colors hidden md:block">
              <Bell className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-md bg-primary/20 flex items-center justify-center border border-primary/50 cursor-pointer hover:bg-primary/40 transition-colors">
              <User className="w-4 h-4 text-primary" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full pb-20">
        <Routes>
          <Route path="/" element={<HomeView onPlay={openPlayer} />} />
          <Route path="/search" element={<SearchView onPlay={openPlayer} />} />
          <Route path="/watchlist" element={<WatchlistView onPlay={openPlayer} />} />
          <Route path="/movie/:id" element={<MovieDetail onPlay={openPlayer} />} />
          <Route path="*" element={<HomeView onPlay={openPlayer} />} />
        </Routes>
      </main>

      {/* Global Video Player Modal (Official Trailers Only) */}
      <Dialog open={playerConfig.isOpen} onOpenChange={(open) => !open && closePlayer()}>
        <DialogContent className="max-w-6xl w-[95vw] p-0 bg-black border-border overflow-hidden rounded-xl shadow-2xl">
          <DialogHeader className="p-4 bg-gradient-to-b from-black/80 to-transparent absolute top-0 w-full z-10 pointer-events-none">
            <DialogTitle className="text-white drop-shadow-md text-xl">{playerConfig.title}</DialogTitle>
          </DialogHeader>
          <div className="w-full aspect-video bg-black relative">
            {playerConfig.isOpen && (
               <TrailerPlayer movieId={playerConfig.movieId} title={playerConfig.title} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function HomeView({ onPlay }) {
  const { data: featured } = useQuery({ queryKey: ['featured'], queryFn: fetchFeaturedMovie });
  const { data: trending } = useQuery({ queryKey: ['trending'], queryFn: fetchTrendingMovies });
  const { data: popular } = useQuery({ queryKey: ['popular'], queryFn: fetchPopularMovies });
  const { data: topRated } = useQuery({ queryKey: ['topRated'], queryFn: fetchTopRatedMovies });

  return (
    <div className="w-full flex flex-col gap-8 md:gap-12 pb-10">
      <Hero movie={featured} onPlay={onPlay} />
      <div className="space-y-8 md:space-y-12 -mt-20 md:-mt-32 relative z-20">
        <MovieRow title="Trending Now" movies={trending} onPlay={onPlay} />
        <MovieRow title="Popular on MovieVerse" movies={popular} onPlay={onPlay} />
        <MovieRow title="Critically Acclaimed" movies={topRated} onPlay={onPlay} />
      </div>
    </div>
  );
}

function SearchView({ onPlay }) {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: movies, isLoading } = useQuery({
    queryKey: ['search', searchQuery],
    queryFn: () => searchMovies(searchQuery),
    enabled: searchQuery.length > 0
  });

  return (
    <div className="pt-32 container mx-auto px-4 md:px-12 max-w-[1440px] min-h-screen">
      <div className="max-w-3xl mx-auto mb-12 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
        <input 
          autoFocus
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search movies, genres, or people..." 
          className="w-full bg-surface/50 border border-border text-white text-lg rounded-xl pl-14 pr-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface transition-all shadow-lg"
        />
      </div>

      {isLoading && <div className="text-center text-muted-foreground mt-20">Searching...</div>}
      
      {!isLoading && movies && movies.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {movies.map(movie => <MovieCard key={movie.id} movie={movie} onPlay={onPlay} />)}
        </div>
      )}
      
      {!isLoading && movies?.length === 0 && searchQuery && (
        <div className="text-center text-muted-foreground mt-20 text-lg">
          No results found for "{searchQuery}". Try a different keyword.
        </div>
      )}

      {!searchQuery && (
        <div className="text-center text-muted-foreground mt-20 text-lg">
          Type a movie name above to start discovering.
        </div>
      )}
    </div>
  );
}

function WatchlistView({ onPlay }) {
  const userId = useUserStore((state) => state.userId);
  const queryClient = useQueryClient();

  const { data: watchlist, isLoading } = useQuery({
    queryKey: ['watchlist', userId],
    queryFn: () => getWatchlist(userId),
    enabled: !!userId,
  });

  const removeMutation = useMutation({
    mutationFn: removeFromWatchlist,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['watchlist', userId] })
  });

  return (
    <div className="pt-32 container mx-auto px-4 md:px-12 max-w-[1440px] min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white">My Watchlist</h1>
      
      {isLoading && <div className="text-muted-foreground">Loading your movies...</div>}
      
      {!isLoading && watchlist?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 text-center bg-surface/30 rounded-2xl border border-border border-dashed">
          <Film className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
          <h2 className="text-2xl font-semibold mb-2">Your watchlist is empty</h2>
          <p className="text-muted-foreground mb-6 max-w-md">Add movies to your list to easily find them later and keep track of what you want to watch.</p>
          <Link to="/search" className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">
            Explore Movies
          </Link>
        </div>
      )}

      {!isLoading && watchlist && watchlist.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {watchlist.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              isWatchlistMode={true} 
              onRemove={(movieId) => removeMutation.mutate({ userId, movieId })} 
              onPlay={onPlay}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
