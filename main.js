"use strict";

// Variables

let myLibrary = [];
const newBookBtn = document.getElementById("new-book-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const addBookBtn = document.getElementById("add-book-btn");
const formEl = document.getElementById("form-el");
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
    removeBook(e.target.dataset.delete);
  } else if (e.target.dataset.read) {
    let targetBook = myLibrary[e.target.dataset.read];
    targetBook.isRead = !targetBook.isRead;
    saveToStorage();
    renderBooks();
  }
});

// Functions

function getFromStorage() {
  if (localStorage.getItem("books") === null) {
    myLibrary = [];
  } else {
    let booksFromStorage = JSON.parse(localStorage.getItem("books"));
    myLibrary = booksFromStorage;
  }

  return myLibrary;
}

function saveToStorage() {
  localStorage.setItem("books", JSON.stringify(myLibrary));
}

function getBook(book) {
  let author = book.get("author");
  let title = book.get("title");
  let pages = book.get("pages");
  let isRead = book.get("isRead");

  const newBook = new Book(author, title, pages, isRead);

  addBookToLibrary(newBook);
  closeModal();
  renderBooks();
}

function renderBooks() {
  document.getElementById("book-list").innerHTML = getBooks(myLibrary);
}

function getBooks(library) {
  library = getFromStorage();
  let bookList = ``;
  let i = 0;

  for (let book of library) {
    bookList += `
            <tr>
                <td>${book.author}</td>
                <td>${book.title}</td>
                <td>${book.pages}</td>
                <td>${book.isRead ? "Yes" : "No"}</td>
                <td>
                <button id="mark-read-btn" data-read="${i}">${
      book.isRead ? "Unread" : "Read"
    }</button>
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
  saveToStorage();
  renderBooks();
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  saveToStorage();
}

function showModal() {
  document.getElementById("form-modal").style.display = "block";
}

function closeModal() {
  document.getElementById("form-modal").style.display = "none";
}

// Constructors

class Book {
  constructor(author, title, pages, isRead) {
    this.author = author;
    this.title = title;
    this.pages = Number(pages);
    this.isRead = Boolean(isRead);
  }
}

renderBooks();
