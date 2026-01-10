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
        bookTitle.classList.add('book-title');
        const bookContainer = document.createElement('div');
        const bookAuthor = document.createElement('p');
        bookAuthor.classList.add('book-author');
        const bookPages = document.createElement('p');
        bookPages.classList.add('book-pages');
        const readStatus = document.createElement('button');
        readStatus.classList.add('read-btn');

        bookTitle.textContent = `${book.title}`;
        bookAuthor.textContent = `${book.author}`;
        bookPages.textContent = `${book.pages} pages`;
        readStatus.textContent = book.read ? "Read" : "Not read";

        readStatus.addEventListener('mouseenter', () => {
            readStatus.dataset.prevText = readStatus.textContent;
            readStatus.textContent = book.read ? "Mark as not read" : "Mark as read";
        });

        readStatus.addEventListener('mouseleave', () => {
            readStatus.textContent = readStatus.dataset.prevText;
        });

        if(book.read){
            readStatus.classList.add('read')
        }

        if(!book.read){
            readStatus.classList.add('unread')
        };

        bookContainer.appendChild(bookAuthor);
        bookContainer.appendChild(bookPages);
        bookDiv.appendChild(removeBook);
        bookDiv.appendChild(bookTitle);
        bookDiv.appendChild(bookContainer);
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
    const newTitle = document.getElementById('title').value;
    const newAuthor = document.getElementById('author').value;
    const newPages = document.getElementById('pages').value;

    const readStatus = document.querySelector(
        'input[name="readStatus"]:checked'
    );

    if(!readStatus){
       addBookToLibrary(newTitle, newAuthor, newPages, false) 
    }

    else{
        addBookToLibrary(newTitle, newAuthor, newPages, readStatus.value === "true")
    };

    dialog.close();
    displayLibrary();

    form.reset();
});

displayLibrary();