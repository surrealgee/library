// Model

class Library {
    constructor() {
        this.library = [];
    }

    addBook(book) {
        this.tagBook(book, this.library.length);
        this.library.push(book);
    }

    removeBook(book) {
        const remainingBooks = this.library.filter(currentBook => currentBook.id !== book.id);
        this.library = remainingBooks;
        this.updateTags();
    }

    getLibrary() {
        return this.library;
    }

    tagBook(book, tag) {
        book.setID(tag);
    }

    updateTags() {
        for (let i = 0; i < this.library.length; i++) {
            this.tagBook(this.library[i], i);
        }
    }
}

class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
        this.id;
    }

    setID(id) {
        this.id = id;
    }

    getID() {
        return this.id;
    }

    changeStatus() {
        this.isRead = !this.isRead;
    }
}

const myLibrary = new Library();
console.log(myLibrary.getLibrary());

const book1 = new Book('Atomic Habits', 'James Clear', 320, true);
const book2 = new Book('Essentialism', 'Greg McKeown', 288, true);
const book3 = new Book('Feel-Good Productivity', 'Ali Abdaal', 304, false);

myLibrary.addBook(book1);
myLibrary.addBook(book2);
myLibrary.addBook(book3);

console.log(myLibrary.getLibrary());





// let myLibrary = [];

// const addBtn = document.querySelector('.add_button');
// const dialog = document.querySelector('.newBookDialog');
// const submitBtn = document.querySelector('#submit_btn');
// const cancelBtn = document.querySelector('#cancel_btn');
// const bookForm = document.querySelector('#book_form');
// const booksTable = document.querySelector('.books_table');

// booksTable.addEventListener('click', (e) => {
//     if (e.target.id === 'delete_btn') {
//         deleteBook(e.target);
//     } else if (e.target.id === 'read_btn') {
//         const target = myLibrary[e.target.dataset.index];
//         target.changeStatus();
//     }

//     displayBooks();
// })

// addBtn.addEventListener('click', (e) => {
//     dialog.showModal();
// })

// submitBtn.addEventListener('click', e => {
//     e.preventDefault();

//     const inputs = document.querySelectorAll('#book_form input');
//     const bookData = {};

//     for (let input of inputs) {
//         if (input.type === 'checkbox') {
//             bookData[input.name] = input.checked;
//         } else {
//             bookData[input.name] = input.value;
//         }
//     }

//     const { title, author, pages, isRead } = bookData;

//     if (title && author) {
//         const newBook = new Book(title, author, pages, isRead);

//         addBookToLibrary(newBook);
//         displayBooks();
//         dialog.close();
//         clearFields();
//     }
// })

// cancelBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     dialog.close();
// })

// function clearFields() {
//     const inputs = document.querySelectorAll('#book_form input');

//     for (let input of inputs) {
//         if (input.type === 'checkbox') {
//             input.checked = false;
//         } else {
//             input.value = '';
//         }
//     }
// }

// class Book {
//     constructor(title, author, pages, isRead) {
//         this.title = title;
//         this.author = author;
//         this.pages = pages;
//         this.isRead = isRead;
//     }

//     changeStatus() {
//         this.isRead = !this.isRead;
//     }
// }

// function addBookToLibrary(book) {
//     myLibrary.push(book);
// }

// function displayBooks() {
//     const booksTable = document.querySelector('.books_table');
//     let books = `
//     <thead>
//         <th>Title</th>
//         <th>Author</th>
//         <th>Pages</th>
//         <th>Read?</th>
//         <th>Controls</th>
//     </thead>
//     `;

//     for (let i = 0; i < myLibrary.length; i++) {
//         books += `
//         <tr>
//             <td>${myLibrary[i].title}</td>
//             <td>${myLibrary[i].author}</td>
//             <td>${myLibrary[i].pages}</td>
//             <td>${myLibrary[i].isRead ? 'Yes' : 'No'}</td>
//             <td class="controls">
//             <button id="read_btn" data-index=${i}>${myLibrary[i].isRead ? "Unread" : "Read"}</button>
//             <button id="delete_btn" data-index=${i}>X</button>
//             </td>
//         </tr>
//         `
//     }

//     booksTable.innerHTML = books;
// }

// function deleteBook(targetEl) {
//     const newArr = [];

//     for (let i = 0; i < myLibrary.length; i++) {
//         if (i != targetEl.dataset.index) {
//             newArr.push(myLibrary[i]);
//         }
//     }

//     myLibrary = newArr;
// }

// const book1 = new Book('Atomic Habits', 'James Clear', 320, true);
// const book2 = new Book('Essentialism', 'Greg McKeown', 288, true);
// const book3 = new Book('Feel-Good Productivity', 'Ali Abdaal', 304, false);

// addBookToLibrary(book1);
// addBookToLibrary(book2);
// addBookToLibrary(book3);

// displayBooks();