import MediaItem from './MediaItem'

function MediaList({ items, onEdit, onDelete }) {
  if (items.length === 0) {
    return <p className="empty">No items found.</p>
  }

  return (
    <ul className="media-grid">
      {items.map((item) => (
        <MediaItem key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  )
}

export default MediaList
