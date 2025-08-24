import axios from 'axios'
import { getToken } from './auth'

import { logout } from './auth'

export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000' })

// 
api.interceptors.request.use((config) => {
    const t = getToken()
    if(t) {
        config.headers = config.headers ?? {}
        config.headers.Authorization = `Bearer ${t}`
        
    }
    return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      logout()
      // redirect về login
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)



// current API functions
export const listTeachers = (params: Record<string, any>) => api.get('/teachers', { params }).then(r => r.data)
export const getTeacher = (id: string) => api.get(`/teachers/${id}`).then(r => r.data)
export const getAvailability = (id: string, weekStart?: string) => api.get(`/teachers/${id}/availability`, { params: { weekStart } }).then(r => r.data)
export const bookTrial = (teacherId: string, startUtc: string) => api.post('/bookings/trial', { teacherId, startUtc, minutes: 25 }).then(r => r.data)

// ====Authg====
export const register = (email: string, password: string, name: string) => 
    api.post('/auth/register', { email, password, name }).then(r => r.data)
export const login = (email:string, password:string) =>
    api.post('/auth/login', { email, password }).then(r => r.data)

export const me = () => api.get('/auth/me').then(r => r.data)

// ====Bookings====
export const getMyBookings = (range: 'upcoming'|'past' = 'upcoming') =>
  api.get(`/bookings/my`, { params: { range } }).then(r => r.data)