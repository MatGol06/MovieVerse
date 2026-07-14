import { Card, CardContent } from "@/components/ui/card"
import { Plus, Check, Trash, Play } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addToWatchlist } from "../lib/api"
import { useUserStore } from "../store/userStore"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function MovieCard({ movie, isWatchlistMode = false, onRemove = null }) {
  const queryClient = useQueryClient();
  const userId = useUserStore((state) => state.userId);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const movieId = movie.id || movie.movie_id;
  
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  // Embed URL menggunakan third-party iframe (vidsrc) untuk stream movie percuma
  const embedUrl = `https://vidsrc.xyz/embed/movie/${movieId}`;

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
      movie_id: movieId,
      title: movie.title,
      poster_path: movie.poster_path
    });
  };

  return (
    <>
      <Card className="overflow-hidden bg-surface border-border-subtle hover:border-primary/50 transition-colors group h-full flex flex-col">
        <div className="relative aspect-[2/3] w-full">
          <img 
            src={imageUrl} 
            alt={movie.title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Hover Overlay with Action Buttons */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center p-4">
            
            {/* Butang Play Utama */}
            <button 
              onClick={() => setIsDialogOpen(true)}
              className="rounded-full bg-primary/90 text-white p-4 hover:bg-primary transition-transform hover:scale-110 shadow-[0_0_20px_rgba(239,68,68,0.5)]"
            >
              <Play className="w-8 h-8 ml-1" />
            </button>

            {/* Butang Watchlist di Bawah */}
            <div className="absolute bottom-4 left-4 right-4">
              {isWatchlistMode ? (
                 <button onClick={() => onRemove(movieId)} className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors bg-red-600/90 backdrop-blur-sm text-white hover:bg-red-700 h-10 px-4 py-2 w-full">
                   <Trash className="w-4 h-4" /> Remove
                 </button>
              ) : (
                <button 
                  onClick={handleAdd}
                  disabled={mutation.isPending || showSuccess}
                  className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors bg-surface/80 backdrop-blur-sm border border-border-subtle text-white hover:bg-surface h-10 px-4 py-2 w-full disabled:opacity-50"
                >
                  {showSuccess ? <><Check className="w-4 h-4 text-green-400" /> Added</> : <><Plus className="w-4 h-4" /> Watchlist</>}
                </button>
              )}
            </div>
          </div>
        </div>
        <CardContent className="p-4 flex-1">
          <h3 className="font-semibold text-lg line-clamp-1">{movie.title}</h3>
          {!isWatchlistMode && (
            <p className="text-sm text-gray-400 mt-1">
              {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'} • ⭐ {movie.vote_average?.toFixed(1) || '0'}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Video Player Modal (Dialog) */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-5xl w-[95vw] p-0 bg-black border-border-subtle overflow-hidden sm:rounded-xl">
          <DialogHeader className="p-4 bg-gradient-to-b from-black/80 to-transparent absolute top-0 w-full z-10 pointer-events-none">
            <DialogTitle className="text-white drop-shadow-md text-xl">{movie.title}</DialogTitle>
          </DialogHeader>
          <div className="w-full aspect-video bg-black relative">
            {isDialogOpen && (
              <iframe 
                src={embedUrl}
                className="w-full h-full absolute inset-0 border-0"
                allowFullScreen
                title={`Watch ${movie.title}`}
              ></iframe>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
