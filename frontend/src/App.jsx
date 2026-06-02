import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Subjects from './pages/Subjects.jsx'
import Exams from './pages/Exams.jsx'
import StudyTimer from './pages/StudyTimer.jsx'
import AskAi from './pages/AskAi.jsx'
import Profile from './pages/Profile.jsx'
import Login from './pages/Login.jsx'
import { getCurrentEmail } from './lib/auth.js'

const RequireAuth = ({ children }) => {
  if (!getCurrentEmail()) {
    return <Navigate to="/login" replace />
  }

  return children
}

const PublicOnly = ({ children }) => {
  if (getCurrentEmail()) {
    return <Navigate to="/subjects" replace />
  }

  return children
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={getCurrentEmail() ? '/subjects' : '/login'} replace />} />
        <Route path="/login" element={<PublicOnly><Login /></PublicOnly>} />
        <Route path="/subjects" element={<RequireAuth><Subjects /></RequireAuth>} />
        <Route path="/exams" element={<RequireAuth><Exams /></RequireAuth>} />
        <Route path="/study-timer" element={<RequireAuth><StudyTimer /></RequireAuth>} />
        <Route path="/ask-ai" element={<RequireAuth><AskAi /></RequireAuth>} />
        <Route path="/statistics" element={<Navigate to="/ask-ai" replace />} />
        <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App