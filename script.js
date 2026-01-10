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

        const removeBook = document.createElement("button");
        removeBook.textContent = "X";
        removeBook.classList.add("remove-book");

        const bookTitle = document.createElement('p');
        const bookAuthor = document.createElement('p');
        const bookPages = document.createElement('p');

        bookTitle.textContent = `Title: ${book.title}`;
        bookAuthor.textContent = `Author: ${book.author}`;
        bookPages.textContent = `Pages: ${book.pages} pages`;

        bookDiv.appendChild(removeBook);
        bookDiv.appendChild(bookTitle);
        bookDiv.appendChild(bookAuthor);
        bookDiv.appendChild(bookPages);

        removeBook.addEventListener('click' , () =>{
            const index = myLibrary.findIndex(b => b.id === book.id);
            myLibrary.splice(index, 1);
            displayLibrary();
        })

        library.appendChild(bookDiv);
    });
}

const addNew = document.querySelector('.addBookBtn');
const dialog = document.querySelector("dialog");
const closeButton = document.querySelector(".close-btn");
const form = document.querySelector("dialog form")

addNew.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

const addBook = document.querySelector('.submit-btn');

addBook.addEventListener('click', (e) => {
    e.preventDefault();
    const newTitle = document.getElementById('title').value;
    const newAuthor = document.getElementById('author').value;
    const newPages = document.getElementById('pages').value;
    addBookToLibrary(newTitle, newAuthor, newPages);

    dialog.close();
    displayLibrary();

    form.reset();
});

addBookToLibrary('hello', 'bye bye', 25);
addBookToLibrary('hello', 'bye bye', 25);
displayLibrary();