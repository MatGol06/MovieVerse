import { Play, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToWatchlist } from '../lib/api';
import { useUserStore } from '../store/userStore';

export function Hero({ movie, onPlay }) {
  const userId = useUserStore(state => state.userId);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addToWatchlist,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['watchlist', userId] })
  });

  if (!movie) return <div className="w-full h-[70vh] bg-surface animate-pulse" />;

  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  const handleAdd = () => {
    if (!userId) return;
    mutation.mutate({
      user_id: userId,
      movie_id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path
    });
  };

  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] flex items-center">
      {/* Background Image with Gradient Overlays */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={backdropUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-12 max-w-[1440px]">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg leading-tight">
            {movie.title}
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-medium text-gray-300">
            <span className="text-green-400 font-bold">{Math.round(movie.vote_average * 10)}% Match</span>
            <span>{new Date(movie.release_date).getFullYear()}</span>
            <span className="border border-gray-600 px-2 py-0.5 rounded text-xs">HD</span>
          </div>

          <p className="text-lg text-gray-200 line-clamp-3 md:line-clamp-4 leading-relaxed drop-shadow-md">
            {movie.overview}
          </p>

          <div className="flex items-center gap-4 pt-4">
            <Button size="lg" onClick={() => onPlay(movie.id, movie.title)} className="gap-2 text-lg px-8 py-6 rounded-md shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
              <Play className="w-6 h-6 fill-current" /> Play Now
            </Button>
            <Button size="lg" variant="secondary" onClick={handleAdd} className="gap-2 text-lg px-8 py-6 rounded-md bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm transition-all hover:scale-105">
              <Plus className="w-6 h-6" /> Watchlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
