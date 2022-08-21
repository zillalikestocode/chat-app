import React, { useState } from 'react'
import {motion} from 'framer-motion'
import Button from '../Button'
import { useDispatch } from 'react-redux'
import {signUp, signIn} from '../../actions/auth'
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react'

const Auth = ({user, setUser}) => {
  const navigate = useNavigate()
  const [isSignup, setSignUp] = useState(false)
  const [userCredentials, setCredentials] = useState({
    firstName: '', lastName: '', username: '', password: '', confirmPassword: ''
  })
  const handleSubmit = async(e)=>{
    e.preventDefault();

    if(isSignup){
      await dispatch(signUp(userCredentials, navigate))
    }else{
      await dispatch(signIn(userCredentials, navigate))
    }
    setUser(JSON.parse(localStorage.getItem('profile')))
  }
  const dispatch = useDispatch()
  const handleChange = (e)=>{
    setCredentials({...userCredentials, [e.target.name]: e.target.value})
  }
  const noMatch = (userCredentials.password !== userCredentials.confirmPassword) || (userCredentials.password === '' && userCredentials.confirmPassword === '')
  const shortPass = userCredentials.password.length < 8
  const invalidPass = noMatch || shortPass
  
  const variants = {
    initial: {
      scale: 0.6,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
      },
      duration: 0.3
    }
    
  }
  useEffect(() => {
    if(user?.result?.name) navigate('/')
  }, [user])
  return (
    <motion.form variants={variants} initial='initial' animate="animate" onSubmit={handleSubmit} className=" gap-3 items-center bg-slate-900 w-fit rounded-xl p-5 m-auto mt-20 flex flex-col">
      <h4 className="text-white font-['Sniglet'] font-extrabold text-2xl">the chatroom</h4>
      <div>
        <h4 className="font-semibold text-white text-lg">{isSignup ? 'Sign up': 'Sign in'}</h4>
      </div>
      <div className='flex flex-col items-center gap-3'>
        {isSignup && (
          <div className="flex gap-2 ">
          <input autoFocus required onChange={handleChange} name="firstName" type="text" placeholder='First Name' className='rounded-md bg-white/25 focus:outline-none text-white p-2 white w-32'/>
          <input required onChange={handleChange} name="lastName" type="text" placeholder='Last Name' className='rounded-md bg-white/25 focus:outline-none text-white p-2 white w-32'/>
          </div>
        )}
        <input required onChange={handleChange} name="username" type="email" placeholder='Email' className='rounded-md bg-white/25 focus:outline-none text-white p-2 white'/>
        <input required onChange={handleChange} name="password" type="password" placeholder='Password' className='rounded-md bg-white/25 focus:outline-none text-white p-2'/>
        {isSignup && <input required onChange={handleChange} name="confirmPassword" type="password" placeholder='Confirm Password' className='rounded-md focus:outline-none bg-white/25 text-white p-2'/>}
        {(isSignup && shortPass) && <p className="text-red-500 text-sm w-64">Password should have at least 8 characters</p>}
        {(isSignup && noMatch) && <p className="text-red-500 text-sm w-64">Passwords do not match</p>}
      </div>
      <Button className="text-white font-light" text={isSignup ? 'Already have an account? Sign in': "Don't have an account? Sign up"} 
        onClick={()=> setSignUp(!isSignup)}/>
      <Button type="submit" disabled={isSignup && invalidPass} text={isSignup ? 'Sign up': 'Sign in'} className={`bg-indigo-900/75 p-2 rounded-md w-full text-white font-medium ${isSignup && invalidPass && 'bg-gray-500'}`}/>
    </motion.form>
  )
}

export default Auth