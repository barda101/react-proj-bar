
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM
//import { useParams, useNavigate } from 'react-router-dom'

export function BookDetails() {
  const [book, setBook] = useState(null)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadBook()
  }, [params.id])

  function loadBook() {
    bookService.get(params.bookId)
      .then(setBook)
      .catch(err => {
        console.log('err', err)
      })
  }

  function onBack() {
      navigate('/book')
  }

  if(!book) return <div>Loading...</div>
  return (
    <section className="book-details">
      <h1>{book.title}</h1>
      <img src={`../assets/BooksImages/${Math.floor(Math.random() * 20) + 1}.jpg`} alt="book-image"/>
      <h2>{book.description}</h2>
      <h3>{book.listPrice.amount}{book.listPrice.currencyCode}{' '}{book.isOnSale ? 'On Sale' : ''}</h3>
      <button onClick={onBack}>Back</button>
    </section>
  )
}