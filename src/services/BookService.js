import {BACKEND_API} from "../common/constants";

export const searchBooks = async(title) => {
    let results = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}&maxResults=40&orderBy=newest`)
        .then(response =>
            response.json().then(res => res.items));
    // console.log("this is first results " + results[0].volumeInfo)
    results = results.filter(book => book.volumeInfo.hasOwnProperty('imageLinks'))


    return results
}

export const searchBooksByISBN = async(isbnNumber) => {
    let results = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbnNumber}`)
        .then(response => response.json())
        .then(res => res.items);
    //console.log(results[0])
    return results[0];
}

export const sellBook = async (newBook) => {
     const response = await fetch(`${BACKEND_API}/api/book/Addbook`, {
         method: "POST",
         body: JSON.stringify(newBook),
         headers: {
             'content-type': 'application/json'
         }
     })
     return await response.json()
}

export const getAllBooks = () => {
    return fetch(`${BACKEND_API}/api/book/getAllBooks`)
        .then(response => response.json())
}

export const findBookById = (bookId) => {
    return fetch(`${BACKEND_API}/api/book/getBookByIsbn/${bookId}`)
        .then(response => response.json())
}
