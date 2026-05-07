import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getHeroById, createHero, updateHero } from '../api/superheroApi'
import { FiArrowLeft, FiSave } from 'react-icons/fi'

const EMPTY = {
  nombre: '', nombreReal: '', anioAparicion: '', casa: 'Marvel',
  biografia: '', equipamiento: '', imagenes: '',
}

// ⚠️ Field debe estar FUERA del componente padre para que React no lo
// desmonte/remonte en cada re-render (lo que causaba la pérdida de focus).
function Field({ label, name, type = 'text', as = 'input', required = false, form, onChange, ...rest }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {as === 'textarea' ? (
        <textarea name={name} value={form[name]} onChange={onChange}
                  className="input-dark resize-none" rows={rest.rows ?? 3} {...rest} />
      ) : as === 'select' ? (
        <select name={name} value={form[name]} onChange={onChange} className="input-dark">
          {rest.options?.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} name={name} value={form[name]} onChange={onChange}
               className="input-dark" required={required} {...rest} />
      )}
    </div>
  )
}

export default function EditHeroPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [form, setForm]       = useState(EMPTY)
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving]   = useState(false)

  useEffect(() => {
    if (!isEdit) return
    getHeroById(id)
      .then(res => {
        const h = res.data
        setForm({
          nombre:        h.nombre        ?? '',
          nombreReal:    h.nombreReal    ?? '',
          anioAparicion: h.anioAparicion ?? '',
          casa:          h.casa          ?? 'Marvel',
          biografia:     h.biografia     ?? '',
          equipamiento:  h.equipamiento  ?? '',
          imagenes:      (h.imagenes ?? []).join('\n'),
        })
      })
      .catch(() => toast.error('No se pudo cargar el superhéroe.'))
      .finally(() => setLoading(false))
  }, [id, isEdit])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const imagenesArr = form.imagenes
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean)

    if (imagenesArr.length === 0) {
      toast.error('Debe ingresar al menos una imagen.')
      return
    }

    const payload = {
      ...form,
      anioAparicion: Number(form.anioAparicion),
      imagenes: imagenesArr,
      cantidadImagenes: imagenesArr.length,
    }

    setSaving(true)
    try {
      if (isEdit) {
        await updateHero(id, payload)
        toast.success('¡Superhéroe actualizado correctamente!')
        navigate(`/hero/${id}`)
      } else {
        const res = await createHero(payload)
        toast.success('¡Superhéroe creado correctamente!')
        navigate(`/hero/${res.data._id}`)
      }
    } catch (err) {
      const msg = err?.response?.data?.message || 'Ocurrió un error al guardar.'
      toast.error(msg)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 space-y-4">
        <div className="skeleton h-8 w-40 mb-6" />
        {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-12 w-full" />)}
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 animate-fade-in-up">

      {/* Back */}
      <button onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors group">
        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        Volver
      </button>

      {/* Title */}
      <h1 className="font-bebas text-5xl text-white mb-8">
        {isEdit ? 'Editar Superhéroe' : 'Nuevo Superhéroe'}
      </h1>

      <form onSubmit={handleSubmit}
            className="glass-card rounded-2xl p-8 space-y-5">

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Nombre" name="nombre" required placeholder="Ej: Spider-Man"
                 form={form} onChange={handleChange} />
          <Field label="Nombre Real" name="nombreReal" placeholder="Ej: Peter Parker"
                 form={form} onChange={handleChange} />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Año de aparición" name="anioAparicion" type="number"
                 required placeholder="Ej: 1962" min={1900} max={2099}
                 form={form} onChange={handleChange} />
          <Field label="Casa" name="casa" as="select" options={['Marvel', 'DC']}
                 form={form} onChange={handleChange} />
        </div>

        <Field label="Biografía" name="biografia" as="textarea" required
               rows={4} placeholder="Breve descripción del personaje…"
               form={form} onChange={handleChange} />

        <Field label="Equipamiento" name="equipamiento"
               placeholder="Ej: Lanza-telarañas, traje tecnológico"
               form={form} onChange={handleChange} />

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
            URLs de imágenes <span className="text-red-500">*</span>
            <span className="text-slate-600 normal-case font-normal ml-2">(una por línea)</span>
          </label>
          <textarea
            name="imagenes"
            value={form.imagenes}
            onChange={handleChange}
            className="input-dark resize-none"
            rows={4}
            placeholder={"https://ejemplo.com/imagen1.jpg\nhttps://ejemplo.com/imagen2.jpg"}
          />
          {form.imagenes && (
            <p className="text-xs text-slate-600 mt-1">
              {form.imagenes.split('\n').filter(s => s.trim()).length} imagen(es) cargada(s)
            </p>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={() => navigate(-1)} className="btn-ghost flex-1">
            Cancelar
          </button>
          <button type="submit" disabled={saving} className="btn-primary flex-1">
            <FiSave />
            {saving ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Crear superhéroe'}
          </button>
        </div>
      </form>
    </div>
  )
}
