import * as api from '../api'

export const signUp = (newUser, router) => async(dispatch)=>{
    try {
        const {data} = await api.signUp(newUser)

        dispatch({type: 'AUTH', payload: data})
        router('/')
    } catch (error) {
        console.log(error)
    }
}
export const signIn = (user, router) => async(dispatch)=>{
    try {
        const {data} = await api.signIn(user)

        dispatch({type: 'AUTH', payload: data})
        router('/')
    } catch (error) {
        console.log(error)
    }
}