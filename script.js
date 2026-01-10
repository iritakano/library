const myLibrary = [];

function Book(title, author, pages, read = false){
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read){
    let newBook = new Book(title, author, pages, read);
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
        const readStatus = document.createElement('button');

        bookTitle.textContent = `Title: ${book.title}`;
        bookAuthor.textContent = `Author: ${book.author}`;
        bookPages.textContent = `Pages: ${book.pages} pages`;
        readStatus.textContent = book.read ? "Read" : "Not read";

        bookDiv.appendChild(removeBook);
        bookDiv.appendChild(bookTitle);
        bookDiv.appendChild(bookAuthor);
        bookDiv.appendChild(bookPages);
        bookDiv.appendChild(readStatus);

        removeBook.addEventListener('click' , () =>{
            const index = myLibrary.findIndex(b => b.id === book.id);
            myLibrary.splice(index, 1);
            displayLibrary();
        })

        readStatus.addEventListener('click', ()=> {
            book.read = !book.read;
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

    const readStatus = document.querySelector(
        'input[name="readStatus"]:checked'
    );

    addBookToLibrary(newTitle, newAuthor, newPages, readStatus.value === "true");

    dialog.close();
    displayLibrary();

    form.reset();
});

addBookToLibrary('hello', 'bye bye', 25);
addBookToLibrary('hello', 'bye bye', 25);
displayLibrary();