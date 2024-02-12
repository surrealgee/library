// Model

class Library {
    constructor() {
        this.books = [];
    }

    getBooks = () => {
        return this.books;
    }

    tagBook(book, tag) {
        book.setID(tag);
    }

    updateTags() {
        for (let i = 0; i < this.books.length; i++) {
            this.tagBook(this.books[i], i);
        }
    }

    printBooks() {
        console.table(this.getBooks());
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

    setID = (id) => {
        this.id = id;
    }

    getID = () => {
        return this.id;
    }

    changeStatus = () => {
        this.isRead = !this.isRead;
    }
}

// Controller

function Controller() {
    const library = new Library();

    function addBook(book) {
        library.tagBook(book, library.books.length);
        library.books.push(book);
        // library.printBooks();
    }

    function removeBook(bookID) {
        bookID = Number(bookID);
        const remainingBooks = library.books.filter(currentBook => {
            const currentBookID = currentBook.getID();
            return currentBookID !== bookID
        });
        library.books = remainingBooks;
        library.updateTags();
    }

    return { getBooks: library.getBooks, addBook, removeBook };
}

// View

function ScreenController() {
    const controller = new Controller();
    let bookList = controller.getBooks();

    // Hard coded for development purposes, will remove when finished.
    const book1 = new Book('Atomic Habits', 'James Clear', 320, true);
    const book2 = new Book('Essentialism', 'Greg McKeown', 288, true);
    const book3 = new Book('Feel-Good Productivity', 'Ali Abdaal', 304, false);

    // Hard coded for development purposes, will remove when finished.
    controller.addBook(book1);
    controller.addBook(book2);
    controller.addBook(book3);

    const addBtn = document.querySelector('.add_button');
    const dialog = document.querySelector('.newBookDialog');
    const submitBtn = document.querySelector('#submit_btn');
    const cancelBtn = document.querySelector('#cancel_btn');
    const bookForm = document.querySelector('#book_form');
    const booksTable = document.querySelector('.books_table');

    function displayBooks() {
        bookList = controller.getBooks();

        let books = `
    <thead>
        <th>Title</th>
        <th>Author</th>
        <th>Pages</th>
        <th>Read?</th>
        <th>Controls</th>
    </thead>
    `;

        for (let book of bookList) {
            books += `
        <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>${book.isRead ? 'Yes' : 'No'}</td>
            <td class="controls">
            <button id="read_btn" data-index=${book.getID()}>${book.isRead ? "Unread" : "Read"}</button>
            <button id="delete_btn" data-index=${book.getID()}>X</button>
            </td>
        </tr>
        `
        }

        booksTable.innerHTML = books;
    }

    booksTable.addEventListener('click', (e) => {
        if (e.target.id === 'delete_btn') {
            controller.removeBook(e.target.dataset.index);
        } else if (e.target.id === 'read_btn') {
            const target = bookList[e.target.dataset.index];
            target.changeStatus();
        }
        displayBooks();
    })

    addBtn.addEventListener('click', (e) => {
        dialog.showModal();
    })

    submitBtn.addEventListener('click', e => {
        e.preventDefault();

        const inputs = document.querySelectorAll('#book_form input');
        const bookData = {};

        for (let input of inputs) {
            if (input.type === 'checkbox') {
                bookData[input.name] = input.checked;
            } else {
                bookData[input.name] = input.value;
            }
        }

        const { title, author, pages, isRead } = bookData;

        if (title && author) {
            const newBook = new Book(title, author, pages, isRead);

            controller.addBook(newBook);
            displayBooks();
            dialog.close();
            clearFields();
        }
    })

    cancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        dialog.close();
    })

    function clearFields() {
        const inputs = document.querySelectorAll('#book_form input');

        for (let input of inputs) {
            if (input.type === 'checkbox') {
                input.checked = false;
            } else {
                input.value = '';
            }
        }
    }

    displayBooks();
}

ScreenController();