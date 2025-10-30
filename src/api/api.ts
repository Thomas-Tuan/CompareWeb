import axios from 'axios'

const api = axios.create({
  // Dev: dùng proxy => để '/', Prod: Flask serve dist => cũng '/'
  baseURL: import.meta.env.VITE_API_BASE || '/'
})

export default api