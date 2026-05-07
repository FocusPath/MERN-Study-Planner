const Navbar = () => {
  const items = ['Subjects', 'Exams', 'Study Timer', 'Statistics', 'Settings']

  function collapseNav() {
    const nav = document.getElementById('app-nav')
    const toggle = document.getElementById('nav-toggle')
    if (nav && toggle) {
      nav.classList.add('hidden')
      toggle.classList.remove('hidden')
    }
  }

  function openNav() {
    const nav = document.getElementById('app-nav')
    const toggle = document.getElementById('nav-toggle')
    if (nav && toggle) {
      nav.classList.remove('hidden')
      toggle.classList.add('hidden')
    }
  }

  return (
    <>
      <aside id="app-nav" className="bg-gray-900 text-white h-screen w-64">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
            <h2 className="text-lg font-semibold">FocusPath</h2>
            <button onClick={collapseNav} aria-label="Collapse navigation" className="p-2">
              {'<'}
            </button>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-2">
            {items.map((label) => (
              <div key={label} className="py-2 cursor-pointer">
                {label}
              </div>
            ))}
          </nav>

          <div className="px-4 py-4 border-t border-gray-800">
            <p className="text-sm text-gray-400">Account</p>
          </div>
        </div>
      </aside>

      {/* NOTE: collapsed toggle [hidden by default] */}
      <div id="nav-toggle" className="hidden bg-gray-900 text-white h-screen flex items-start">
        <button onClick={openNav} aria-label="Open navigation" className="w-8 h-12 m-2 bg-gray-800 text-white rounded">
          {'>'}
        </button>
      </div>
    </>
  )
}

export default Navbar
