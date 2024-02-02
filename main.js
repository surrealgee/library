const myLibrary = [];

const addBtn = document.querySelector('.add_button');
const dialog = document.querySelector('.newBookDialog');

addBtn.addEventListener('click', (e) => {
   dialog.showModal();
})



function Book(title, author, pages, isRead) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.isRead = isRead
};

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    const booksTable = document.querySelector('.books_table');
    let books = `
    <thead>
        <th>Title</th>
        <th>Author</th>
        <th>Pages</th>
        <th>Read?</th>
    </thead>
    `;

    for (let book of myLibrary) {
        books += `
        <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>${book.isRead ? 'Yes' : 'No'}</td>
        </tr>
        `
    }

    booksTable.innerHTML = books;
}

const book1 = new Book('Atomic Habits', 'James Clear', 320, true);
const book2 = new Book('Essentialism', 'Greg McKeown', 288, true);
const book3 = new Book('Feel-Good Productivity', 'Ali Abdaal', 304, false);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

displayBooks();