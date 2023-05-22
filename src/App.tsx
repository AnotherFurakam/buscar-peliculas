import { FormEvent, useCallback, useState } from 'react'
import './App.css'

import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import useSearch from './hooks/useSearch'
import debounce from "just-debounce-it"

function App() {

  const [sort, setSort] = useState(false)

  const { search, updateSearch, error } = useSearch()

  const { movies, getMovies, loading } = useMovies({ search, sort })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetMovies = useCallback(
    debounce((search: string) => {
      getMovies(search)
    }, 300)
    , []
  )

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    getMovies(search)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event: FormEvent<EventTarget>) => {
    const newSearch: string = (event.target as HTMLInputElement).value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  return (
    <div className="page">
      <header>
        <h1>Buscador de películas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className='input-container'>
            <input value={search} onChange={handleChange} name='query' type="text" placeholder="Avenger, Star Wars, Matrix..." autoComplete='off' />
            {
              error && <p className='error-popup'>{error}</p>
            }
            <input type="checkbox" checked={sort} onChange={handleSort} />
          </div>
          <button type="submit">Buscar</button>
        </form>
      </header>
      <main>
        {
          loading ? <p>cargando...</p>
            : <Movies movies={movies} />
        }
      </main>
    </div>
  )
}

export default App
