import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'BookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
}

// For Debug (easy access from console):
// window.cs = bookService

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title))
            }

            if (filterBy.minPrice) {
                books = books.filter(book => book.listPrice.amount >= filterBy.minPrice)
            }

            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', amount = 0, currencyCode = 'USD', isOnSale = false) {
    return {
        title,
        description: '',
        thumbnail: '',
        listPrice: {
            amount,
            currencyCode,
            isOnSale
        }
    }
}

function getDefaultFilter() {
    return { txt: '', minPrice: '' }
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = [
            _createbook('Book1', 100, 'USD', true),
            _createbook('Book2', 120, 'EUR', false),
            _createbook('Book3', 140, 'NIS', true)
        ]
        // const vendors = ['audu', 'fiak', 'subali', 'mitsu']
        // for (let i = 0; i < 6; i++) {
        //     const vendor = vendors[utilService.getRandomIntInclusive(0, vendors.length - 1)]
        //     books.push(_createbook(vendor, utilService.getRandomIntInclusive(80, 300)))
        // }
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createbook(title, amount, currencyCode = 'USD', isOnSale = false) {
    const book = getEmptyBook(title, amount, currencyCode, isOnSale)
    book.id = utilService.makeId()
    book.description = utilService.makeLorem(5)
    book.thumbnail = "http://ca.org/books-photos/20.jpg"
    return book
}
