export default function HouseLogo({ casa }) {
  const isMarvel = casa === 'Marvel'
  const src = isMarvel ? '/marvel-logo.png' : '/dc-logo.png'
  const alt = isMarvel ? 'Marvel logo' : 'DC logo'

  return (
    <div className={`inline-flex items-center justify-center px-4 py-2 rounded-xl ${
      isMarvel ? 'bg-red-950/40 border border-red-800/30' : 'bg-blue-950/40 border border-blue-800/30'
    }`}>
      <img
        src={src}
        alt={alt}
        className="h-8 w-auto object-contain"
        onError={e => {
          e.target.style.display = 'none'
          e.target.nextSibling.style.display = 'inline'
        }}
      />
      <span className={`hidden font-bebas text-xl tracking-widest ${isMarvel ? 'text-red-400' : 'text-blue-400'}`}>
        {casa}
      </span>
    </div>
  )
}
