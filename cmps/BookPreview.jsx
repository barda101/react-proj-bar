export function BookPreview({ book }) {
  return (
    <article className="book-preview">
      <div className="img-container">
        {book.listPrice.isOnSale && (<img src="./assets/img/onsale.png" alt="On Sale" className="on-sale-icon"/>)}
      </div>
      <h2>{book.title}</h2>
      {/* <img src={`../assets/BooksImages/${Math.floor(Math.random() * 20) + 1}.jpg`} alt="book-image"/> */}
      <img src={book.thumbnail} alt="book-image"/>
      <h3>{book.listPrice.amount}{book.listPrice.currencyCode}</h3>
    </article>
  )
}