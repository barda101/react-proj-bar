const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { AppHeader } from "./cmps/AppHeader.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { About } from "./pages/About.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"



export function RootCmp() {
    return (
        <Router>
            <section className="app">
                <AppHeader />
                <main className="main-layout">
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/about" element={<About />}></Route>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/book" element={<BookIndex />} />
                        <Route path='/book/edit' element={<BookEdit />} />
                        <Route path='/book/edit/:bookId' element={<BookEdit />} />
                        <Route path="/book/:bookId" element={<BookDetails />} />
                    </Routes>
                </main>
                <UserMsg />
            </section>
        </Router>
    )
}