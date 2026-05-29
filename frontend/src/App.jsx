import { Routes, Route } from "react-router-dom"
import './App.css'
import AuthPage from './pages/AuthPage'
import Profile from './components/profile/profile'

function App() {

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<AuthPage />}
        />

        <Route 
          path="/profile"
          element={<Profile />}
        />
      </Routes>
    </>
  )
}

export default App
