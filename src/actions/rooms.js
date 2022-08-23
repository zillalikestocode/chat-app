import * as api from '../api'

export const createRoom = (roomData)=> async(dispatch)=>{
	
	try{
		const {data} = await api.createRoom(roomData)

		dispatch({type: 'CREATE', payload: data})
		return data
	}catch(err){
		console.log(err)
	}
	
}
export const joinRoom = (roomData)=> async(dispatch)=>{
	
	try{
		const {data} = await api.joinRoom(roomData)

		dispatch({type: 'CREATE', payload: data})
		return data
	}catch(err){
			console.log(err.response.status)
	}
	
}
export const getRooms = (id)=> async(dispatch)=>{
	
	try{
		const {data} = await api.getRooms(id)

		dispatch({type: 'GET', payload: data})
	}catch(err){
		console.log(err)
	}
	
}
