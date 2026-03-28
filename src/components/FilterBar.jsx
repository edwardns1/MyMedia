function FilterBar({ filter, onFilterChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    onFilterChange((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="filter-bar">
      <input
        name="search"
        value={filter.search}
        onChange={handleChange}
        placeholder="Search…"
      />
      <label>
        Type
        <select name="type" value={filter.type} onChange={handleChange}>
          <option value="all">All</option>
          <option value="movie">Movie</option>
          <option value="show">Show</option>
          <option value="game">Game</option>
          <option value="book">Book</option>
        </select>
      </label>
      <label>
        Status
        <select name="status" value={filter.status} onChange={handleChange}>
          <option value="all">All</option>
          <option value="planned">Planned</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </label>
      <label>
        Rating
        <select name="rating" value={filter.rating} onChange={handleChange}>
          <option value="all">All</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
    </div>
  )
}

export default FilterBar
