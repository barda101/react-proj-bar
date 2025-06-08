const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  useEffect(() => {
    onSetFilter(filterByToEdit)
  }, [filterByToEdit])

  function handleChange( {target} ) {
    let { value, name: field } = target
    switch (target.type) {
      case 'number':
        value = value === '' ? '' : +value
      break
    }
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value}))
  }

    const { txt, minPrice } = filterByToEdit
    return (
        <section className="book-filter">
            <h2>Filter Our Books</h2>
            <form>
                <label htmlFor="txt">Title</label>
                <input onChange={handleChange} value={txt} name="txt" type="text" id="txt" />

                <label htmlFor="minPrice">Min Price</label>
                <input onChange={handleChange} value={minPrice} name="minPrice" type="number" id="minPrice" />
            </form>
        </section>
    )

}