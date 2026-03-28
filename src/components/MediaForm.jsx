import { useState, useEffect } from 'react'

const DEFAULT = { title: '', type: 'movie', status: 'planned', rating: '', notes: '' }

function MediaForm({ editItem, onAdd, onUpdate, onCancelEdit }) {
  const [form, setForm] = useState(DEFAULT)

  useEffect(() => {
    if (editItem) {
      setForm({
        title: editItem.title,
        type: editItem.type,
        status: editItem.status,
        rating: editItem.rating != null ? String(editItem.rating) : '',
        notes: editItem.notes ?? '',
      })
    } else {
      setForm(DEFAULT)
    }
  }, [editItem])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    const fields = {
      title: form.title.trim(),
      type: form.type,
      status: form.status,
      rating: form.rating ? Number(form.rating) : null,
      notes: form.notes,
    }
    if (editItem) {
      onUpdate(editItem.id, fields)
    } else {
      onAdd({ id: crypto.randomUUID(), ...fields, createdAt: Date.now() })
      setForm(DEFAULT)
    }
  }

  return (
    <form className="media-form" onSubmit={handleSubmit}>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <select name="type" value={form.type} onChange={handleChange}>
        <option value="movie">Movie</option>
        <option value="show">Show</option>
        <option value="game">Game</option>
        <option value="book">Book</option>
      </select>
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="planned">Planned</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <select name="rating" value={form.rating} onChange={handleChange}>
        <option value="">No rating</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <input
        name="notes"
        value={form.notes}
        onChange={handleChange}
        placeholder="Notes (optional)"
      />
      <button type="submit" className="btn-primary">{editItem ? 'Update' : 'Add'}</button>
      {editItem && <button type="button" className="btn-ghost" onClick={onCancelEdit}>Cancel</button>}
    </form>
  )
}

export default MediaForm
