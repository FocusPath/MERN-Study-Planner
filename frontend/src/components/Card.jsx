const Card = ({ color, title, caption }) => {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-400">
      <div className="mb-4 h-12 w-12 rounded-xl" style={{ backgroundColor: color }} />
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{caption}</p>
    </article>
  )
}

export default Card