import { useNavigate } from 'react-router-dom'

export default function HeroCard({ hero, delay = 0 }) {
  const navigate = useNavigate()
  const isMarvel = hero.casa === 'Marvel'

  const bio = hero.biografia?.length > 115
    ? hero.biografia.slice(0, 115) + '…'
    : hero.biografia

  return (
    <article
      className="glass-card animate-fade-in-up rounded-2xl overflow-hidden cursor-pointer group"
      style={{ animationDelay: `${delay * 0.04}s` }}
      onClick={() => navigate(`/hero/${hero._id}`)}
    >
      {/* Imagen */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={hero.imagenes?.[0]}
          alt={hero.nombre}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={e => { e.target.src = 'https://placehold.co/400x280/13131f/94a3b8?text=Sin+imagen' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070f] via-[#07070f]/40 to-transparent" />

        {/* Badge casa */}
        <span className={`absolute top-3 right-3 ${isMarvel ? 'badge-marvel' : 'badge-dc'}`}>
          {hero.casa}
        </span>
      </div>

      {/* Info */}
      <div className="p-5">
        <h2 className="font-bebas text-2xl text-white leading-tight">{hero.nombre}</h2>
        {hero.nombreReal && (
          <p className="text-xs text-slate-500 mt-0.5 mb-3">{hero.nombreReal}</p>
        )}
        <p className="text-sm text-slate-400 leading-relaxed mt-2">{bio}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-slate-600">{hero.anioAparicion}</span>
          <span className="text-xs text-slate-500 group-hover:text-purple-400 transition-colors">
            Ver detalle →
          </span>
        </div>
      </div>
    </article>
  )
}
