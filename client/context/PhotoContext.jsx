import { createContext, useContext, useReducer, useState, useRef, useEffect } from "react"

export const PhotoContext = createContext()

export const photosReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PHOTOS': {
      if (action.payload.page === 0) {
        return {
          photos: action.payload.data
        }
      }
      else {
        return {
          photos: [...state.photos, ...action.payload.data]
        }
      }
    }
    case 'ADD_PHOTO': {
      return {
        photos: [action.payload, ...state.photos]
      }
    }
    case 'DELETE_PHOTO': {
      return {
        photos: state.photos.filter(photo => photo._id !== action.payload._id)
      }
    }
    default: return state
  }
}

export const PhotoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(photosReducer, { photos: [] })
  const [page, setPage] = useState(0)
  const [query, setQuery] = useState("")
  const [newImages, setNewImages] = useState(false)
  const [loading, setLoading] = useState(false)
  const mounted = useRef(false)

  const fetchPhotos = async (signal) => {
    setLoading(true)
    let url
    if (query) {
      url = `/photos/${query}/${page}`
    }
    else {
      url = `/photos/${page}`
    }

    try {
      let res
      if (signal) {
        res = await fetch(url, { signal })
      }
      else {
        res = await fetch(url)
      }
      const data = await res.json()

      if (res.ok) {
        dispatch({ type: 'SET_PHOTOS', payload: { query, data , page } })
      }
      setNewImages(false)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setNewImages(false)
      setLoading(false)
    }
  }

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    fetchPhotos(signal)

    return () => {
      controller.abort()
    }
  }, [page])

    // increase page on scroll
    useEffect(() => {
      if (!mounted.current) {
        mounted.current = true
        return
      }
      if (!newImages) return
      if (loading) return
      setPage((oldPage) => oldPage + 1);
    }, [newImages])
  
    const event = () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 500) {
        setNewImages(true)
      }
    }
  
    useEffect(() => {
      window.addEventListener('scroll', event);
      return () => window.removeEventListener('scroll', event)
    }, [])

  return (
    <PhotoContext.Provider value={{
      ...state,
      dispatch,
      page,
      setPage,
      query,
      setQuery,
      fetchPhotos,
      loading
    }}>
      {children}
    </PhotoContext.Provider>
  )
}

export const usePhotoContext = () => {
  return useContext(PhotoContext)
}