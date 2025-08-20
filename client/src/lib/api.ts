import axios from 'axios'
export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000' })

export const listTeachers = (params: Record<string, any>) => api.get('/teachers', { params }).then(r => r.data)
export const getTeacher = (id: string) => api.get(`/teachers/${id}`).then(r => r.data)
export const getAvailability = (id: string, weekStart?: string) => api.get(`/teachers/${id}/availability`, { params: { weekStart } }).then(r => r.data)
export const bookTrial = (teacherId: string, startUtc: string) => api.post('/bookings/trial', { teacherId, startUtc, minutes: 25 }).then(r => r.data)
