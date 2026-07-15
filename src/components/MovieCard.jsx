import { Plus, Check, Play } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { addToWatchlist } from "../lib/api"
import { useUserStore } from "../store/userStore"
import { useState } from "react"

export function MovieCard({ movie, isWatchlistMode = false, onRemove = null, onPlay }) {
  const queryClient = useQueryClient();
  const userId = useUserStore((state) => state.userId);
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const movieId = movie.id || movie.movie_id;
  const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster';

  const mutation = useMutation({
    mutationFn: addToWatchlist,
    onSuccess: () => {
      setShowSuccess(true);
      queryClient.invalidateQueries({ queryKey: ['watchlist', userId] });
      setTimeout(() => setShowSuccess(false), 2000);
    },
  });

  const handleAdd = (e) => {
    e.stopPropagation();
    if (!userId) return;
    mutation.mutate({ user_id: userId, movie_id: movieId, title: movie.title, poster_path: movie.poster_path });
  };

  const playMovie = (e) => {
    e.stopPropagation();
    if (onPlay) onPlay(movieId, movie.title);
  }

  return (
    <div 
      onClick={() => navigate(`/movie/${movieId}`)}
      className="relative flex flex-col gap-3 cursor-pointer group"
    >
      <div className="relative aspect-[2/3] w-full rounded-[16px] overflow-hidden bg-card border border-border transition-transform duration-300 ease-out group-hover:scale-[1.03] shadow-lg group-hover:shadow-2xl">
        <img 
          src={imageUrl} 
          alt={movie.title}
          loading="lazy"
          className="object-cover w-full h-full"
        />
        
        {/* Dark Overlay - Hidden on Mobile to prevent touch conflict, visible on desktop hover/focus */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center gap-4 backdrop-blur-[2px]">
          <button 
            onClick={playMovie} 
            aria-label={`Play trailer for ${movie.title}`}
            title="Watch Trailer"
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-xl focus:outline-none focus:ring-2 focus:ring-white"
          >
            <Play className="w-5 h-5 fill-white text-white ml-1" />
          </button>
          {!isWatchlistMode && (
            <button 
              onClick={handleAdd} 
              aria-label={`Add ${movie.title} to watchlist`}
              title="Add to Watchlist"
              className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-xl focus:outline-none focus:ring-2 focus:ring-white"
            >
              {showSuccess ? <Check className="w-5 h-5 text-success" /> : <Plus className="w-5 h-5 text-white" />}
            </button>
          )}
        </div>
      </div>
      
      {/* Title & Metadata cleanly separated below the card */}
      <div className="px-1">
        <h3 className="font-semibold text-[16px] text-white line-clamp-2 leading-snug">{movie.title}</h3>
        {!isWatchlistMode && (
          <div className="flex items-center justify-between mt-1">
            <p className="text-[14px] text-muted">
              {movie.release_date ? new Date(movie.release_date).getFullYear() : ''}
            </p>
            <p className="text-[14px] font-medium text-success">
              ★ {movie.vote_average?.toFixed(1)}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
