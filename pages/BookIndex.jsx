import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

  useEffect(() => {
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    bookService.query(filterBy)
      .then(setBooks)
      .catch(err => {
        console.log('Problem getting books', err)
      })
  }

  function onRemoveBook(bookId) {
    bookService.remove(bookId)
    .then(() => {
      setBooks(books => books.filter(book => book.id !== bookId))
      showSuccessMsg('Book removed successfully!')
    })
    .catch(err => {
      showErrorMsg('Book removing car!')
    })
  }

  function onSetFilter(filterBy) {
    setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy}))
  }

  if(!books) return <div>Loading...</div>
  return (
    <section className="car-index">
      <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
      <Link to="/book/edit"><button className='add-book'>Add book</button></Link>
      <BookList
        books={books}
        onRemoveBook={onRemoveBook}
      />
    </section>
  )

}