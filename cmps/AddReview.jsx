const { useState, useEffect } = React
import { bookService } from "../services/book.service.js"

export function AddReview({ onAddReview }) {
  const [review, setReview] = useState(bookService.getEmptyReview())

  function handleChange({ target }) {
    const { name, value, type } = target
    const val = type === 'number' ? +value : value
    setReview(prev => ({ ...prev, [name]: val }))
  }

  function onSubmit(ev) {
    ev.preventDefault()
    onAddReview(review)
    setReview(bookService.getEmptyReview())
  }

  return (
    <form onSubmit={onSubmit}>
      <h3>Add Review</h3>
      <input
        type="text"
        name="fullName"
        value={review.fullName}
        onChange={handleChange}
        placeholder="Your name"
      />
      <select name="rating" value={review.rating} onChange={handleChange}>
        {[1, 2, 3, 4, 5].map(num => (
          <option key={num} value={num}>{num} ⭐</option>
        ))}
      </select>
      <input
        type="date"
        name="date"
        value={review.date}
        onChange={handleChange}
      />
      <input
        type="text"
        name="txt"
        placeholder="Say something..."
        value={review.txt}
        onChange={handleChange}
      />
      <button>Add</button>
    </form>
  )
}
