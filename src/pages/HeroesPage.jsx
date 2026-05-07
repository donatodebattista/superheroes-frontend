import { useState, useEffect, useMemo } from 'react'
import { getAllHeroes, getMarvelHeroes, getDCHeroes } from '../api/superheroApi'
import HeroCard from '../components/HeroCard'
import { FiSearch } from 'react-icons/fi'

const TITLES = {
  all:    { title: 'Todos los Superhéroes', sub: 'El universo completo de Marvel y DC' },
  marvel: { title: 'Universo Marvel',       sub: 'Los héroes de la Casa de las Ideas' },
  dc:     { title: 'Universo DC',           sub: 'Los guardianes del Multiverso DC' },
}

export default function HeroesPage({ filter }) {
  const [heroes, setHeroes]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)
  const [search, setSearch]   = useState('')

  useEffect(() => {
    setLoading(true)
    setError(null)
    setSearch('')
    const fetcher = filter === 'marvel' ? getMarvelHeroes
                  : filter === 'dc'     ? getDCHeroes
                  : getAllHeroes
    fetcher()
      .then(res => setHeroes(res.data))
      .catch(() => setError('No se pudo cargar la lista de superhéroes.'))
      .finally(() => setLoading(false))
  }, [filter])

  const filtered = useMemo(() =>
    heroes.filter(h => h.nombre.toLowerCase().includes(search.toLowerCase())),
    [heroes, search]
  )

  const { title, sub } = TITLES[filter]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-bebas text-5xl sm:text-6xl text-white">{title}</h1>
        <p className="text-slate-500 mt-1">{sub}</p>
      </div>

      {/* Buscador */}
      <div className="relative mb-8 max-w-md">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
        <input
          type="text"
          placeholder="Buscar por nombre…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input-dark"
          style={{ paddingLeft: '2.25rem' }}
        />
      </div>

      {/* Estados */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden">
              <div className="skeleton h-56 w-full" />
              <div className="p-5 space-y-3">
                <div className="skeleton h-5 w-3/4" />
                <div className="skeleton h-3 w-1/2" />
                <div className="skeleton h-3 w-full" />
                <div className="skeleton h-3 w-5/6" />
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="text-center py-20 text-red-400">{error}</div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          <p className="text-4xl mb-3">🦸</p>
          <p className="text-lg">No se encontraron superhéroes{search ? ` con "${search}"` : ''}.</p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <>
          <p className="text-xs text-slate-600 mb-4">{filtered.length} resultado{filtered.length !== 1 ? 's' : ''}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((hero, i) => (
              <HeroCard key={hero._id} hero={hero} delay={i} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
