import { MovieCard } from './MovieCard';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function MovieRow({ title, movies, onPlay }) {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="space-y-4 py-4 relative group">
      <h2 className="text-2xl md:text-3xl font-bold px-4 md:px-12 text-white">{title}</h2>
      
      <div className="relative">
        {/* Left Scroll Button */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 w-12 bg-black/50 hover:bg-black/80 text-white z-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        {/* Scrollable Container */}
        <div 
          ref={rowRef} 
          className="flex overflow-x-auto gap-4 px-4 md:px-12 pb-4 hide-scrollbar snap-x snap-mandatory"
        >
          {movies.map(movie => (
            <div key={movie.id} className="flex-none w-[160px] md:w-[220px] snap-start">
              <MovieCard movie={movie} onPlay={() => onPlay(movie.id, movie.title)} />
            </div>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 w-12 bg-black/50 hover:bg-black/80 text-white z-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
