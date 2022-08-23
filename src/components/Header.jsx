import React from 'react'

const Header = () => {
    const user = JSON.parse(localStorage.getItem('profile'))
  return (
    <header className="md:rounded-tr-lg px-3 py-2 text-white flex items-center bg-slate-500 w-full">
        <h4 className="font-semibold font-['Sniglet'] text-white text-xl">the chatroom</h4>
        <div className="flex items-center ml-auto gap-2">
            <h4 className="text-base">{user?.result?.name.split(' ')[0]}</h4>
        </div>
    </header>
  )
}

export default Header