import axios from 'axios'

// URL relativa → funciona tanto con el proxy de Vite (dev)
// como con nginx reverse proxy (Docker/producción).
// Se agrega soporte para VITE_API_URL por si se despliega sin proxy.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/superheroes',
})

export const getAllHeroes   = ()        => api.get('/')
export const getMarvelHeroes = ()       => api.get('/marvel')
export const getDCHeroes   = ()        => api.get('/dc')
export const getHeroById   = (id)      => api.get(`/${id}`)
export const createHero    = (data)    => api.post('/', data)
export const updateHero    = (id, data)=> api.put(`/${id}`, data)
export const deleteHero    = (id)      => api.delete(`/${id}`)
