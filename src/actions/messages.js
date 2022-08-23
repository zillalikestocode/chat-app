import * as api from '../api'


export const getMessages = (id)=>async(dispatch)=>{
	try{
		const {data} = await api.getMessages({room: id})
		console.log(data)
		dispatch({type: 'GET_MESSAGES', payload: data.messages})
		return data
	}catch(err){
		console.log(err)
	}
}
export const sendMessage = (messageData)=> async(dispatch)=>{
	try{
		const {data} = await api.sendMessage(messageData)

		dispatch({type: 'SEND_MESSAGE', payload: data.messages})

	}catch(err){
		console.log(err)
	}
}