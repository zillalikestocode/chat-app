import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'

const Settings = ({user, setUser}) => {
  const navigate = useNavigate()
  const handleClick = ()=>{
    localStorage.clear()
    setUser(null)
    navigate('/auth')
  }
  return (
    <div className="mt-7 flex flex-col gap-2 items-center">
      <div className='bg-blue-600 text-white rounded-full w-8 h-8 justify-center flex items-center'>
        <h4 className="text-lg text-center">{user?.result?.name[0]}</h4>
      </div>
      <h4 className='text-xl '>{user?.result?.name}</h4>
      <Button text='Sign Out' onClick={handleClick} className="p-2 text-white shadow-md bg-blue-600 rounded-md" />
    </div>
  )
}

export default Settings