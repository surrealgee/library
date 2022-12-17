'use strict';

const myLibrary = [];

function Book(author, title, pages, isRead) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.isRead = isRead;
}

const ikigai = new Book("Hector Garcia", "Ikigai", 295, true);
const mobyDick = new Book("Herman Melville", "Moby Dick", 600, false);


addBookToLibrary(ikigai);
addBookToLibrary(mobyDick);
addBookToLibrary(new Book("Don Quixote", "Miguel De Cervantes", 800, false));


function addBookToLibrary(book) {
    myLibrary.push(book);
}

function getBooks(library) {
    let bookList = ``;

    for (let book of library) {
        bookList += `
            <tr>
                <td>${book.author}</td>
                <td>${book.title}</td>
                <td>${book.pages}</td>
                <td>${(book.isRead) ? "Yes": "No"}</td>
            </tr>
        `;
    }
    return bookList;
}

function renderBooks() {
    document.getElementById('bookList').innerHTML = getBooks(myLibrary);
}

renderBooks();
