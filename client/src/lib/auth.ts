export type AuthUser = {
    id: string;
    email: string;
    name?: string;
    role?: string;
}

const TOKEN_KEY = 'token'
const USER_KEY = 'user'

export const saveToken = (t: string) => localStorage.setItem(TOKEN_KEY, t)
export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const clearToken = () => localStorage.removeItem(TOKEN_KEY)

export const saveUser = (u: AuthUser) => localStorage.setItem(USER_KEY, JSON.stringify(u))
export const getUser = (): AuthUser | null => {
    try {
        const raw = localStorage.getItem(USER_KEY); return raw ? JSON.parse(raw) : null
    } catch {return null}
}

export const clearUser = () => localStorage.removeItem(USER_KEY)

// !!getToken(): convert to boolean, if token exists return true, else false
export const isLoggedIn = () => !! getToken() 

export const logout = () => {
    clearToken()
    clearUser()
    window.location.href = '/login'
}