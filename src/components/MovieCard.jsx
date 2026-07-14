import { Card } from "@/components/ui/card"
import { Plus, Check, Trash, Play } from "lucide-react"
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
  
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : 'https://via.placeholder.com/500x750?text=No+Poster';

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
    mutation.mutate({
      user_id: userId,
      movie_id: movieId,
      title: movie.title,
      poster_path: movie.poster_path
    });
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    if (onRemove) onRemove(movieId);
  };

  const playMovie = (e) => {
    e.stopPropagation();
    if (onPlay) onPlay(movieId, movie.title);
  }

  const navigateToDetail = () => {
    navigate(`/movie/${movieId}`);
  }

  return (
    <Card 
      onClick={navigateToDetail}
      className="overflow-hidden bg-surface border-0 rounded-xl cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all duration-300 group h-full flex flex-col shadow-lg"
    >
      <div className="relative aspect-[2/3] w-full bg-surface">
        <img 
          src={imageUrl} 
          alt={movie.title}
          loading="lazy"
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Dark gradient from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Hover Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="font-bold text-white text-sm md:text-base line-clamp-2 mb-1">{movie.title}</h3>
            
            {/* Show rating and year on hover */}
            {!isWatchlistMode && (
              <p className="text-xs text-green-400 font-medium mb-2">
                {movie.release_date ? new Date(movie.release_date).getFullYear() : ''} 
                <span className="text-gray-300 ml-2">⭐ {movie.vote_average?.toFixed(1) || '0'}</span>
              </p>
            )}

            <p className="text-xs text-gray-300 line-clamp-3 mb-4">{movie.overview}</p>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={playMovie}
                className="flex-1 bg-white text-black hover:bg-gray-200 rounded-md py-2 flex items-center justify-center transition-colors font-medium text-sm gap-1"
              >
                <Play className="w-4 h-4 fill-current" /> Trailer
              </button>
              
              {isWatchlistMode ? (
                <button 
                  onClick={handleRemove}
                  title="Remove from Watchlist"
                  className="p-2 rounded-md bg-white/20 hover:bg-red-500/80 text-white backdrop-blur-sm transition-colors"
                >
                  <Trash className="w-4 h-4" />
                </button>
              ) : (
                <button 
                  onClick={handleAdd}
                  disabled={mutation.isPending || showSuccess}
                  title="Add to Watchlist"
                  className="p-2 rounded-md bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-colors"
                >
                  {showSuccess ? <Check className="w-4 h-4 text-green-400" /> : <Plus className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
