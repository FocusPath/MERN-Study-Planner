import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Subjects from './pages/Subjects.jsx'
import Exams from './pages/Exams.jsx'
import StudyTimer from './pages/StudyTimer.jsx'
import AskAi from './pages/AskAi.jsx'
import Profile from './pages/Profile.jsx'
import Login from './pages/Login.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="/study-timer" element={<StudyTimer />} />
        <Route path="/ask-ai" element={<AskAi />} />
        <Route path="/statistics" element={<Navigate to="/ask-ai" replace />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App