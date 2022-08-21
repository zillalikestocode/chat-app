import React from 'react'
import {TbHome2, TbSettings} from 'react-icons/tb'
import {BiMessageSquareAdd, BiPencil} from 'react-icons/bi'
import { Link } from 'react-router-dom' 

const Sidebar = () => {
    const user = JSON.parse(localStorage.getItem('profile'))
  return (
    <div className="md:rounded-l-lg  p-2 bg-slate-900 flex flex-col">
        <div className='bg-[#dee4e7] rounded-full w-8 h-8 justify-center flex items-center'>
            <h4 className="text-lg text-center">{user?.result?.name[0]}</h4>
        </div>
        <div className="flex flex-col items-center mt-8">
            <Link to="/chat/rooms"><div className="cursor-pointer text-white py-3"><TbHome2 fontSize={25} /></div></Link>
            <Link to="/chat/create"><div className="cursor-pointer text-white py-3"><BiPencil fontSize={25} /></div></Link>
            <Link to="/chat/join"><div className="cursor-pointer text-white py-3"><BiMessageSquareAdd fontSize={25} /></div></Link>
            <Link to="/chat/settings"><div className="cursor-pointer text-white py-3 mt-[100%]"><TbSettings fontSize={25} /></div></Link>
        </div>
    </div>
  )
}

export default Sidebar