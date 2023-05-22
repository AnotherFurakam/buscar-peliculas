import type { FC } from 'react';
import { Movie } from '../interfaces/movie.interface';

interface ListOfMoviesProps {
  movies: Movie[] | null
}


const ListOfMovies: FC<ListOfMoviesProps> = ({ movies }) => {
  return (
    <ul className='movies'>
      {
        movies && movies.map((movie) => (
          <li key={movie.id} className='movie'>
            <img src={movie.poster} alt={movie.title} />
            <div className='title-container'>
              <h3>{movie.title} ({movie.year})</h3>
            </div>
          </li>
        ))
      }
    </ul>
  );
}
export default ListOfMovies;

function NoMoviesResults() {
  return (
    <p>No se encontraron películas para esta búsqueda</p>
  )
}

export function Movies({ movies }: ListOfMoviesProps) {
  const hasMovies = movies !== undefined 

  return (
    hasMovies
      ? <ListOfMovies movies={movies} />
      : <NoMoviesResults />
  )
}