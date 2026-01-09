const library = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
}

function addBookToLibrary(title, author, pages, read){
    let newBook = new Book(title, author, pages, read);
    library.push(newBook);
}