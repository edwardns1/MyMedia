import { useState } from 'react'
import MediaForm from '../components/MediaForm'
import MediaList from '../components/MediaList'
import FilterBar from '../components/FilterBar'
import { getAllMedia, addMedia, updateMedia, deleteMedia } from '../storage'

function Home() {
  const [items, setItems] = useState(() => getAllMedia())
  const [filter, setFilter] = useState({ search: '', type: 'all', status: 'all', rating: 'all' })
  const [editingItem, setEditingItem] = useState(null)

  const handleAdd = (item) => {
    addMedia(item)
    setItems(getAllMedia())
  }

  const handleUpdate = (id, updated) => {
    updateMedia(id, updated)
    setItems(getAllMedia())
    setEditingItem(null)
  }

  const handleDelete = (id) => {
    deleteMedia(id)
    setItems(getAllMedia())
  }

  const query = filter.search.toLowerCase()
  const filtered = items.filter((item) => {
    if (query) {
      const haystack = [
        item.title,
        item.type,
        item.status,
        item.rating != null ? String(item.rating) : '',
        item.notes,
      ].map((v) => (v ?? '').toLowerCase()).join('\0')
      if (!haystack.includes(query)) return false
    }
    if (filter.type !== 'all' && item.type !== filter.type) return false
    if (filter.status !== 'all' && item.status !== filter.status) return false
    if (filter.rating !== 'all' && item.rating !== Number(filter.rating)) return false
    return true
  })

  return (
    <div>
      <div className="section">
        <MediaForm
          editItem={editingItem}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          onCancelEdit={() => setEditingItem(null)}
        />
      </div>
      <div className="section">
        <FilterBar filter={filter} onFilterChange={setFilter} />
      </div>
      <MediaList items={filtered} onEdit={setEditingItem} onDelete={handleDelete} />
    </div>
  )
}

export default Home
