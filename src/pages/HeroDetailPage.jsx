import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getHeroById, deleteHero } from '../api/superheroApi'
import HeroCarousel from '../components/HeroCarousel'
import HouseLogo from '../components/HouseLogo'
import ConfirmModal from '../components/ConfirmModal'
import { FiEdit2, FiTrash2, FiArrowLeft, FiCalendar, FiShield } from 'react-icons/fi'

export default function HeroDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [hero, setHero] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    getHeroById(id)
      .then(res => setHero(res.data))
      .catch(() => toast.error('No se pudo cargar el superhéroe.'))
      .finally(() => setLoading(false))
  }, [id])

  const handleDelete = async () => {
    try {
      await deleteHero(id)
      toast.success(`${hero.nombre} eliminado correctamente.`)
      navigate('/')
    } catch {
      toast.error('Error al eliminar el superhéroe.')
    }
  }

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="skeleton h-8 w-32 mb-8" />
        <div className="grid md:grid-cols-2 gap-10">
          <div className="skeleton rounded-2xl" style={{ aspectRatio: '4/3' }} />
          <div className="space-y-4">
            <div className="skeleton h-12 w-3/4" />
            <div className="skeleton h-4 w-1/2" />
            <div className="skeleton h-20 w-full" />
            <div className="skeleton h-4 w-2/3" />
          </div>
        </div>
      </div>
    )
  }

  if (!hero) {
    return (
      <div className="text-center py-20 text-slate-500">
        <p className="text-5xl mb-4">💥</p>
        <p>Superhéroe no encontrado.</p>
      </div>
    )
  }

  const isMarvel = hero.casa === 'Marvel'

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 animate-fade-in-up">

      {/* Back */}
      <button onClick={() => navigate(-1)}
        className="flex cursor-pointer items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors group">
        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        Volver
      </button>

      <div className="grid md:grid-cols-2 gap-10 items-start">

        {/* Carrusel / Imagen */}
        <HeroCarousel images={hero.imagenes} heroName={hero.nombre} />

        {/* Info */}
        <div>
          {/* Casa */}
          <div className="flex items-center justify-between mb-4">
            <HouseLogo casa={hero.casa} />
            <span className={`badge-${isMarvel ? 'marvel' : 'dc'}`}>{hero.casa}</span>
          </div>

          {/* Nombre */}
          <h1 className="font-bebas text-5xl text-white leading-tight mt-2">{hero.nombre}</h1>

          {hero.nombreReal && (
            <p className="text-slate-400 text-sm mt-1 mb-4">
              Nombre real: <span className="text-slate-300">{hero.nombreReal}</span>
            </p>
          )}

          {/* Metadata */}
          <div className="flex gap-4 my-4">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <FiCalendar className="text-slate-500" />
              <span>Primera aparición: <strong className="text-white">{hero.anioAparicion}</strong></span>
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-white/5 my-5" />

          {/* Biografía */}
          <div className="mb-5">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Biografía</h2>
            <p className="text-slate-300 leading-relaxed text-sm">{hero.biografia}</p>
          </div>

          {/* Equipamiento */}
          {hero.equipamiento && (
            <div className="mb-6">
              <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Equipamiento</h2>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <FiShield className="text-slate-500 shrink-0" />
                {hero.equipamiento}
              </div>
            </div>
          )}

          {/* Acciones */}
          <div className="flex gap-3 mt-6">
            <button onClick={() => navigate(`/edit/${hero._id}`)} className="btn-primary flex-1">
              <FiEdit2 /> Editar
            </button>
            <button onClick={() => setShowModal(true)} className="btn-danger flex-1">
              <FiTrash2 /> Eliminar
            </button>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showModal}
        heroName={hero.nombre}
        onConfirm={handleDelete}
        onCancel={() => setShowModal(false)}
      />
    </div>
  )
}
