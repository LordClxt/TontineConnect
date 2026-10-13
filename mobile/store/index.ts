import { create } from 'zustand'

export interface User {
    id?: number
    nom?: string
    prenom?: string
    email?: string
    tel?: string
    username?: string
    role?: string
    address_blockchain?: string
    [key: string]: unknown
}

interface StoreState {
    token: string
    user: User
    setUser: (user: User) => void
    login: (token: string, user: User) => void
    logout: () => void
}

const store = create<StoreState>((set) => ({
    token: '',
    user: {},
    setUser: (user) => set(() => ({ user })),
    login: (token, user) => set(() => ({ token, user })),
    logout: () => set(() => ({ token: '', user: {} })),
}))

export default store
