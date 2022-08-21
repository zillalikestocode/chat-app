import axios from 'axios'

const API = axios.create({baseURL: 'https://z-chat-project.herokuapp.com'})

export const signUp =(user)=> API.post('/user/signup', user)
export const signIn = (user)=> API.post('/user/signin', user)
export const getRooms = (id)=> API.post('/room', id)
export const joinRoom = (data)=> API.post('/room/join', data)
export const createRoom = (roomData)=> API.post('/room/create', roomData)
export const getMessages = (id) => API.post('/room/get', id)
export const sendMessage = (data)=> API.post('/room/send', data)