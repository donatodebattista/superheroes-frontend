import { NavLink, useNavigate } from 'react-router-dom'
import { FiZap, FiPlus } from 'react-icons/fi'

export default function Navbar() {
  const navigate = useNavigate()

  const base = 'px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200'
  const all = ({ isActive }) => `${base} ${isActive ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`
  const marvel = ({ isActive }) => `${base} font-semibold ${isActive ? 'text-red-400 bg-red-500/10' : 'text-slate-400 hover:text-red-400 hover:bg-red-500/5'}`
  const dc = ({ isActive }) => `${base} font-semibold ${isActive ? 'text-blue-400 bg-blue-500/10' : 'text-slate-400 hover:text-blue-400 hover:bg-blue-500/5'}`

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5"
      style={{ background: 'rgba(7,7,15,0.88)', backdropFilter: 'blur(20px)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <button onClick={() => navigate('/')}
          className="flex items-center gap-2 shrink-0 group">
          <FiZap className="text-yellow-400 text-lg group-hover:scale-110 transition-transform" />
          <span className="font-bebas text-2xl tracking-widest text-white">HeroVerse</span>
        </button>

        {/* Links */}
        <div className="flex items-center gap-1">
          <NavLink to="/" end className={all}>Todos</NavLink>
          <NavLink to="/marvel" className={marvel}>Marvel</NavLink>
          <NavLink to="/dc" className={dc}>DC</NavLink>
        </div>

        {/* CTA */}
        <button onClick={() => navigate('/new')} className="btn-primary shrink-0">
          <FiPlus /> Nuevo Héroe
        </button>
      </div>
    </nav>
  )
}
