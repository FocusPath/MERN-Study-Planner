const CheckBox = ({ topic,onToggle  }) => { //className="rounded bg-green-500 px-2 py-1 text-xs text-white hover:bg-green-600"
    const completeState = "bg-green-300 hover:bg-green-400"
    const todoState = "bg-gray-200 hover:bg-gray-300";
  return (
    <article onClick={onToggle}
     className={`rounded-2xl border border-slate-200 p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-400 ${topic.done ? completeState : todoState}`}>
      <h2 className="text-xl font-semibold text-slate-900">{topic.topic}</h2>

    </article>
  )
}

export default CheckBox