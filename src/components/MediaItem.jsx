const STATUS_CLASS = {
  'planned':     'badge--planned',
  'in-progress': 'badge--progress',
  'completed':   'badge--completed',
}

function MediaItem({ item, onEdit, onDelete }) {
  const stars = item.rating != null ? '★'.repeat(item.rating) + '☆'.repeat(5 - item.rating) : null

  return (
    <li className="media-card">
      <div className="media-card__header">
        <span className="media-card__title">{item.title}</span>
        <span className="badge">{item.type}</span>
      </div>
      <div className="media-card__meta">
        <span className={`badge ${STATUS_CLASS[item.status] ?? ''}`}>{item.status}</span>
        {stars && <span className="media-card__rating">{stars}</span>}
      </div>
      {item.notes && <p className="media-card__notes">{item.notes}</p>}
      <div className="media-card__actions">
        <button className="btn-edit" onClick={() => onEdit(item)}>Edit</button>
        <button className="btn-danger" onClick={() => onDelete(item.id)}>Delete</button>
      </div>
    </li>
  )
}

export default MediaItem
