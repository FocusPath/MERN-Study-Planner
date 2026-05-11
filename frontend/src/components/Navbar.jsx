import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const items = [
    { label: 'Subjects', path: '/subjects' },
    { label: 'Exams', path: '/exams' },
    { label: 'Study Timer', path: '/study-timer' },
    { label: 'Statistics', path: '/statistics' },
    { label: 'Profile', path: '/profile' },
  ]

  function collapseNav() {
    const nav = document.getElementById('app-nav')
    const toggle = document.getElementById('nav-toggle')
    if (nav && toggle) {
      nav.classList.add('hidden')
      toggle.classList.remove('hidden')
      toggle.classList.add('flex')
    }
  }

  function openNav() {
    const nav = document.getElementById('app-nav')
    const toggle = document.getElementById('nav-toggle')
    if (nav && toggle) {
      nav.classList.remove('hidden')
      toggle.classList.remove('flex')
      toggle.classList.add('hidden')
    }
  }

  return (
    <>
      <aside id="app-nav" className="bg-gray-900 text-white min-h-screen w-64">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <img 
                src="src/assets/Logo.png" 
                alt="FocusPath Logo" 
                className="w-10 h-10 rounded-full object-cover"
              />
              <h2 className="text-lg font-semibold">FocusPath</h2>
            </div>
            <button onClick={collapseNav} aria-label="Collapse navigation" className="p-2">
              {'<'}
            </button>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-2">
            {items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block py-2 px-3 rounded-lg transition-colors ${
                    isActive ? 'bg-white text-gray-900 font-semibold' : 'hover:bg-gray-800'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="px-4 py-4 border-t border-gray-800 cursor-pointer">
            <p className="text-sm text-gray-400">Sign Out</p>
          </div>
        </div>
      </aside>

      {/* NOTE: collapsed toggle [hidden by default] */}
      <div id="nav-toggle" className="hidden bg-gray-900 text-white min-h-screen items-start">
        <button onClick={openNav} aria-label="Open navigation" className="w-8 h-12 m-2 bg-gray-800 text-white rounded">
          {'>'}
        </button>
      </div>
    </>
  )
}

export default Navbar
