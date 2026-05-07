import axios from 'axios'

// URL relativa → funciona tanto con el proxy de Vite (dev)
// como con nginx reverse proxy (Docker/producción)
const api = axios.create({
  baseURL: '/api/superheroes',
})

export const getAllHeroes   = ()        => api.get('/')
export const getMarvelHeroes = ()       => api.get('/marvel')
export const getDCHeroes   = ()        => api.get('/dc')
export const getHeroById   = (id)      => api.get(`/${id}`)
export const createHero    = (data)    => api.post('/', data)
export const updateHero    = (id, data)=> api.put(`/${id}`, data)
export const deleteHero    = (id)      => api.delete(`/${id}`)
