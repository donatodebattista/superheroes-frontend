import { FiAlertTriangle } from 'react-icons/fi'

export default function ConfirmModal({ isOpen, onConfirm, onCancel, heroName }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
         style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}>
      <div className="glass-card rounded-2xl p-8 max-w-sm w-full text-center animate-fade-in-up"
           style={{ border: '1px solid rgba(220,38,38,0.25)' }}>

        <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-5">
          <FiAlertTriangle className="text-red-400 text-2xl" />
        </div>

        <h3 className="font-bebas text-2xl text-white mb-2">¿Eliminar superhéroe?</h3>
        <p className="text-slate-400 text-sm mb-6">
          Estás por eliminar a <span className="text-white font-semibold">{heroName}</span>. Esta acción no se puede deshacer.
        </p>

        <div className="flex gap-3 justify-center">
          <button onClick={onCancel} className="btn-ghost flex-1">Cancelar</button>
          <button onClick={onConfirm} className="btn-danger flex-1">Eliminar</button>
        </div>
      </div>
    </div>
  )
}
