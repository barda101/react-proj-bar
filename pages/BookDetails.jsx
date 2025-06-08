import { LongTxt } from "../cmps/LongTxt.jsx";
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

  function getPublishLabel(PublishedDate) {
    const currentYear = new Date().getFullYear()
    const age = currentYear - PublishedDate

    if (age > 10) return 'Vintage'
    if (age < 1 ) return 'New'
    return ''
  }

  function getPriceClass(amount) {
    if (amount > 150) return 'red'
    if (amount < 20) return 'green'
    return ''
  }

  if(!book) return <div>Loading...</div>
  return (
    <section className="book-details">
      <h1>{book.title}</h1>
      {/* <img src={`../assets/BooksImages/${Math.floor(Math.random() * 20) + 1}.jpg`} alt="book-image"/> */}
      <img src={book.thumbnail} alt="book-image"/>
      <h2>
        {book.pageCount > 500 ? 'Serious Reading' :
        book.pageCount > 200 ? 'Descent Reading' :
        book.pageCount < 100 ? 'Light Reading' :
        ''}
      </h2>
      {book.description && <LongTxt txt={book.description} />}
      <h4>{getPublishLabel(book.publishedDate)}</h4>
      <h3 className={getPriceClass(book.listPrice.amount)}>{book.listPrice.amount}{book.listPrice.currencyCode}{' '}{book.listPrice.isOnSale && 'On Sale'}</h3>

      <button onClick={onBack}>Back</button>
    </section>
  )
}