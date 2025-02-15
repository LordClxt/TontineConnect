import {create} from 'zustand'


const store = create((set)=>({
    token:'',
    user:{},
    setUser:(user)=>set(()=>({user:user})),
    login : (token, user)=> set((state)=>({token:token, user:user})),
    logout:()=>set((state)=>({token:'', user:{}}))
}))


export default store