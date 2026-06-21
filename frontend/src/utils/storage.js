export const StorageKeys = {
  HISTORY: 'mam_download_history',
  FAVORITES: 'mam_favorites',
  SETTINGS: 'mam_settings',
}

export const storageManager = {
  getHistory: () => {
    try {
      const data = localStorage.getItem(StorageKeys.HISTORY)
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  },

  addToHistory: (item) => {
    const history = storageManager.getHistory()
    const newItem = {
      id: Date.now(),
      ...item,
      timestamp: new Date().toISOString(),
    }
    history.unshift(newItem)
    localStorage.setItem(StorageKeys.HISTORY, JSON.stringify(history.slice(0, 50)))
    return newItem
  },

  removeFromHistory: (itemId) => {
    const history = storageManager.getHistory()
    const filtered = history.filter((item) => item.id !== itemId)
    localStorage.setItem(StorageKeys.HISTORY, JSON.stringify(filtered))
  },

  clearHistory: () => {
    localStorage.removeItem(StorageKeys.HISTORY)
  },

  getSettings: () => {
    try {
      const data = localStorage.getItem(StorageKeys.SETTINGS)
      return data ? JSON.parse(data) : {}
    } catch {
      return {}
    }
  },

  updateSettings: (settings) => {
    const current = storageManager.getSettings()
    const updated = { ...current, ...settings }
    localStorage.setItem(StorageKeys.SETTINGS, JSON.stringify(updated))
  },
}
