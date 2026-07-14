import { Card, CardContent } from "@/components/ui/card"
import { Plus, Check, Trash } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addToWatchlist } from "../lib/api"
import { useUserStore } from "../store/userStore"
import { useState } from "react"

export function MovieCard({ movie, isWatchlistMode = false, onRemove = null }) {
  const queryClient = useQueryClient();
  const userId = useUserStore((state) => state.userId);
  const [showSuccess, setShowSuccess] = useState(false);

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
    onError: (error) => {
      alert(error.response?.data?.message || "Gagal menambah filem.");
    }
  });

  const handleAdd = () => {
    if (!userId) return alert("Sistem pengguna sedang dimuatkan...");
    mutation.mutate({
      user_id: userId,
      movie_id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path
    });
  };

  return (
    <Card className="overflow-hidden bg-surface border-border-subtle hover:border-primary/50 transition-colors group">
      <div className="relative aspect-[2/3]">
        <img 
          src={imageUrl} 
          alt={movie.title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Hover Overlay with Action Button */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
          {isWatchlistMode ? (
             <button onClick={() => onRemove(movie.movie_id)} className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors bg-red-600 text-white hover:bg-red-700 h-10 px-4 py-2 w-full">
               <Trash className="w-4 h-4" /> Remove
             </button>
          ) : (
            <button 
              onClick={handleAdd}
              disabled={mutation.isPending || showSuccess}
              className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors bg-primary text-white hover:bg-primary/90 h-10 px-4 py-2 w-full disabled:opacity-50"
            >
              {showSuccess ? <><Check className="w-4 h-4" /> Added</> : <><Plus className="w-4 h-4" /> Add to Watchlist</>}
            </button>
          )}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg line-clamp-1">{movie.title}</h3>
        {!isWatchlistMode && (
          <p className="text-sm text-gray-400 mt-1">
            {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'} • ⭐ {movie.vote_average?.toFixed(1) || '0'}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
