import { Movie } from "../interfaces/movie.interface"
import { ApiResponse } from "../interfaces/result.interface"

const API_KEY = "1987367e"

export const searchMovies = async (search: string): Promise<Movie[] | null> => {

  if (search === '') return null

  try {

    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)

    const json: ApiResponse = await response.json()

    const movies = json?.Search

    const mappedMovies: Movie[] = movies?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster
    }))

    return mappedMovies

  } catch (error) {
    throw new Error("Error searching movies");
  }
}