import { useEffect, useRef, useState } from "react";

function useSearch() {
  const [search, updateSearch] = useState('') 

  const [error, setError] = useState<string | null>(null)

  // Detecta si es la primera vez que se ingresa un dato en el input
  const isFirstInput = useRef(true)

  useEffect(() => {

    //Si la referencia es true y el texo es === '' no realiza las validaciones
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una película vacía')
      return
    } 

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número')
      return
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return {
    search,
    updateSearch,
    error
  }
}

export default useSearch