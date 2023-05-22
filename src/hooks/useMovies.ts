
import { useRef, useState, useMemo, useCallback } from 'react'
import { Movie } from '../interfaces/movie.interface'
import { searchMovies } from '../services/movies.service'

//import withResults from '../mock/with-results.json'

interface MoviesProps {
  search: string
  sort: boolean
}

export function useMovies({ search, sort }: MoviesProps) {

  const [movies, setMovies] = useState<Movie[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const previousSearch = useRef<string>(search)

  //El usecallback es lo mismo que el usememo solo que se usa para las funciones, internamente funcionan igual pero use callback facilita la sintaxis
  //Al pasarse el search como parámentro evitamos que dependa de este y al momento de modificar ese estado, la función no se creará de nuevo
  const getMovies = useCallback(async (search: string) => {
    if (search === previousSearch.current) return
    try {
      setLoading(true)
      setMovies(await searchMovies(search))
    } catch (error) {
      setError("Error al buscar las películas")
    } finally {
      setLoading(false)
    }
  }, [])

  //UseMemo guarda la funcion en memoria y solo se rerenderiza o recrea cuando el valor de la dependencia cambia
  //Evita que se re-renderice o re-calcule un valor si la dependencia no cambia
  const sortedMovies = useMemo(() => {
    console.log("memosortedmovies")
    return sort ? movies && [...movies].sort((a, b) => a.title.localeCompare(b.title)) : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading, error, sortedMovies }
}