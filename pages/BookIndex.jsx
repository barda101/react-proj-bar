import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

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
    })
    .catch(err => {
      console.log('Problem removing book', err)
    })
  }

  function onSetFilter(filterBy) {
    setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy}))
  }

  if(!books) return <div>Loading...</div>
  return (
    <section className="car-index">
      <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
      <BookList
        books={books}
        onRemoveBook={onRemoveBook}
      />
    </section>
  )

}