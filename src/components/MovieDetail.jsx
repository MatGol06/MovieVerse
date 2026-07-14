import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchMovieDetails } from '../lib/tmdb';
import { Hero } from './Hero';
import { MovieRow } from './MovieRow';

export function MovieDetail({ onPlay }) {
  const { id } = useParams();
  
  const { data: movie, isLoading } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => fetchMovieDetails(id),
  });

  if (isLoading) return <div className="min-h-screen pt-32 text-center text-white">Loading...</div>;
  if (!movie) return <div className="min-h-screen pt-32 text-center text-white">Movie not found</div>;

  const director = movie.credits?.crew?.find(c => c.job === 'Director')?.name;
  const cast = movie.credits?.cast?.slice(0, 6);

  return (
    <div className="pb-20">
      <Hero movie={movie} onPlay={onPlay} />
      
      <div className="container mx-auto px-4 md:px-12 max-w-[1440px] mt-12 space-y-12">
        {/* Detail Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-3xl font-bold text-white">Overview</h2>
            <p className="text-gray-300 text-lg leading-relaxed">{movie.overview}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
              <div>
                <span className="text-gray-500 text-sm block">Director</span>
                <span className="text-white font-medium">{director || 'Unknown'}</span>
              </div>
              <div>
                <span className="text-gray-500 text-sm block">Runtime</span>
                <span className="text-white font-medium">{movie.runtime} min</span>
              </div>
              <div>
                <span className="text-gray-500 text-sm block">Release Date</span>
                <span className="text-white font-medium">{movie.release_date}</span>
              </div>
              <div>
                <span className="text-gray-500 text-sm block">Status</span>
                <span className="text-white font-medium">{movie.status}</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-border">
              <span className="text-gray-500 text-sm block mb-2">Production Companies</span>
              <div className="flex flex-wrap gap-4">
                {movie.production_companies?.map(company => (
                  <span key={company.id} className="bg-surface px-3 py-1 rounded-full text-sm text-white border border-border">
                    {company.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Top Cast</h2>
            <div className="flex flex-col gap-4">
              {cast?.map(person => (
                <div key={person.id} className="flex items-center gap-4">
                  {person.profile_path ? (
                    <img src={`https://image.tmdb.org/t/p/w200${person.profile_path}`} className="w-12 h-12 rounded-full object-cover" alt={person.name} />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-surface border border-border" />
                  )}
                  <div>
                    <p className="text-white font-medium text-sm">{person.name}</p>
                    <p className="text-gray-500 text-xs">{person.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Similar Movies */}
        {movie.similar?.results?.length > 0 && (
          <MovieRow title="Similar Movies" movies={movie.similar.results} onPlay={onPlay} />
        )}
      </div>
    </div>
  );
}
