'use strict';

// Variables

const myLibrary = [];
const newBookBtn = document.getElementById("new-book-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const addBookBtn = document.getElementById("add-book-btn");
const formEl = document.getElementById("form-el")
const bookList = document.getElementById("book-list");

// Event Listeners 

newBookBtn.addEventListener("click", showModal);
closeModalBtn.addEventListener("click", closeModal);
formEl.addEventListener("submit", function (e) {
    e.preventDefault();

    const newBookData = new FormData(formEl);

    getBook(newBookData);

    const inputFields = document.getElementsByTagName("input");

    for (let field of inputFields) {
        field.value = "";
    }
});

bookList.addEventListener("click", function (e) {
    if (e.target.dataset.delete) {
        console.log(e.target.dataset.delete);
        removeBook(e.target.dataset.delete);
    }

})

// Functions

function getBook(book) {
    let author = book.get("author");
    let title = book.get("title");
    let pages = book.get("pages");
    let isRead = book.get("isRead");

    const newBook = new Book(author, title, pages, isRead);

    addBookToLibrary(newBook);
    closeModal()
    renderBooks();
}

function renderBooks() {
    document.getElementById('book-list').innerHTML = getBooks(myLibrary);
}

function getBooks(library) {
    let bookList = ``;
    let i = 0;

    for (let book of library) {
        bookList += `
            <tr>
                <td>${book.author}</td>
                <td>${book.title}</td>
                <td>${book.pages}</td>
                <td>${(book.isRead) ? "Yes" : "No"}</td>
                <td>
                <button id="mark-read-btn">Read/Unread</button>
                <button id="delete-book-btn" data-delete="${i}">Delete</button></td>
            </tr>
        `;
        i++;
    }
    return bookList;
}

function removeBook(book) {
    let index = Number(book);
    myLibrary.splice(index, 1);
    renderBooks();
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function showModal() {
    document.getElementById("form-modal").style.display = "block";
}

function closeModal() {
    document.getElementById("form-modal").style.display = "none";
}

// Constructors

function Book(author, title, pages, isRead) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.isRead = isRead;
}

const ikigai = new Book("Hector Garcia", "Ikigai", 295, true);
const mobyDick = new Book("Herman Melville", "Moby Dick", 600, false);

// Calls

addBookToLibrary(ikigai);
addBookToLibrary(mobyDick);
addBookToLibrary(new Book("Don Quixote", "Miguel De Cervantes", 800, false));

renderBooks();
