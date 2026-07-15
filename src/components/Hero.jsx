import { Play, Plus, Film } from 'lucide-react';
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

  if (!movie) return <div className="w-full h-[620px] bg-surface animate-pulse" />;

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
    <div className="relative w-full h-[620px] flex items-center">
      {/* Background with Dark Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={backdropUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-12 max-w-[1440px]">
        <div className="max-w-[800px] space-y-6">
          <h1 className="text-[36px] md:text-[64px] font-bold tracking-tight text-white leading-[1.1]">
            {movie.title}
          </h1>
          
          <div className="flex items-center gap-4 text-[14px] font-medium text-muted">
            <span className="text-success font-semibold tracking-wide">IMDb {movie.vote_average?.toFixed(1)}</span>
            <span>{new Date(movie.release_date).getFullYear()}</span>
            <span className="border border-border px-2 py-0.5 rounded text-[12px] uppercase text-white">HD</span>
          </div>

          <p className="text-[16px] text-muted line-clamp-3 leading-relaxed max-w-[600px]">
            {movie.overview}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button 
              onClick={() => onPlay(movie.id, movie.title)} 
              className="flex items-center justify-center gap-2 text-[16px] font-semibold px-6 py-3 rounded-[8px] bg-primary hover:bg-primary/90 text-white transition-all duration-300"
            >
              <Play className="w-5 h-5 fill-current" /> Watch Trailer
            </button>
            <button 
              onClick={handleAdd} 
              className="flex items-center justify-center gap-2 text-[16px] font-semibold px-6 py-3 rounded-[8px] bg-surface/50 hover:bg-surface text-white border border-border backdrop-blur-md transition-all duration-300"
            >
              <Plus className="w-5 h-5" /> Add to Watchlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
