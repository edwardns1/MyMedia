const KEY = 'mymedia_items'

export function getAllMedia() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? []
  } catch {
    return []
  }
}

export function addMedia(item) {
  const items = getAllMedia()
  items.push(item)
  localStorage.setItem(KEY, JSON.stringify(items))
}

export function updateMedia(id, updatedItem) {
  const items = getAllMedia().map((item) =>
    item.id === id ? { ...item, ...updatedItem } : item
  )
  localStorage.setItem(KEY, JSON.stringify(items))
}

export function deleteMedia(id) {
  const items = getAllMedia().filter((item) => item.id !== id)
  localStorage.setItem(KEY, JSON.stringify(items))
}
