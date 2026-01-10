const myLibrary = [];

function Book(title, author, pages){
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
}

function addBookToLibrary(title, author, pages){
    let newBook = new Book(title, author, pages);
    myLibrary.push(newBook);
}

const library = document.querySelector('.library');

function displayLibrary() {
    library.innerHTML = "";

    myLibrary.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add('book');
        const bookTitle = document.createElement('p');
        const bookAuthor = document.createElement('p');
        const bookPages = document.createElement('p');

        bookTitle.textContent = `Title: ${book.title}`;
        bookAuthor.textContent = `Author: ${book.author}`;
        bookPages.textContent = `Pages: ${book.pages} pages`;

        bookDiv.appendChild(bookTitle);
        bookDiv.appendChild(bookAuthor);
        bookDiv.appendChild(bookPages);

        library.appendChild(bookDiv);
    });
}
