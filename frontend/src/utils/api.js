import axios from 'axios'

const API_BASE = '/api'

const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized')
    }
    return Promise.reject(error)
  }
)

export const fetchMetadata = async (url) => {
  try {
    const response = await api.post('/fetch', { url })
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const startDownload = async (url, formatId, quality) => {
  try {
    const response = await api.post('/download', {
      url,
      format_id: formatId,
      quality,
    })
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const getDownloadStatus = async (jobId) => {
  try {
    const response = await api.get(`/status/${jobId}`)
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const getHistory = async () => {
  try {
    const response = await api.get('/history')
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const deleteHistoryItem = async (itemId) => {
  try {
    const response = await api.delete(`/history/${itemId}`)
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export default api
