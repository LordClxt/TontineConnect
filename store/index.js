import {create} from 'zustand'


const store = create((set)=>({
    token:'',
    user:{},
    login : (token, user)=> set((state)=>({token:token, user:user})),
    logout:()=>set((state)=>({token:'', user:{}}))
}))


export default store