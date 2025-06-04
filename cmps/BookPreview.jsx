export function BookPreview({ book }) {
  return (
    <article className="book-preview">
      <h2>{book.title}</h2>
      <img src={`../assets/BooksImages/${Math.floor(Math.random() * 20) + 1}.jpg`} alt="book-image"/>
      <h3>{book.listPrice.amount}{book.listPrice.currencyCode}</h3>
    </article>
  )
}