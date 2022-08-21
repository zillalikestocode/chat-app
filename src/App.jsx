import { useState } from 'react'
import Home from './components/Home'
import Auth from './components/auth/Auth'
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom'

const App = ()=> {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to={user?.result?.name ? '/chat/rooms':'/auth'} />}/>
        <Route path="/auth" element={<Auth user={user} setUser={setUser}/>}/>
        <Route path="/chat/*" element={<Home user={user} setUser={setUser}/>}/>
      </Routes>
    </div>
  )
}

export default App
