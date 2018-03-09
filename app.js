// --- Library project

function Book(id, name, author, pages) {
	this.id = id;
	this.name = name;
	this.author = author;
	this.pages = pages;
}

Book.prototype.toggleRead = function() {

}

Book.prototype.delete = function() {

}

Book.prototype.render = function(parentNode) {
	let htmlContent = `
			<div class="book-info">
				<p>${this.name}</p>
				<p>${this.author}</p>
				<p>${this.pages} pages</p>
				<div class="book-read">
					<input type="checkbox">
					<span>Haven't read yet</span>
				</div>
				<button class="btn-delete">Delete</button>
			</div>
	`;
	let bookDiv = document.createElement('div');
	bookDiv.className = 'item book-card';
	bookDiv.dataset.id = this.id;
	bookDiv.innerHTML = htmlContent;

	parentNode.appendChild(bookDiv);
}

function addBookToLibrary(e) {
	e.preventDefault();
	const inputBook = document.querySelector('#input-book');
	const inputAuthor = document.querySelector('#input-author');
	const inputPages = document.querySelector('#input-pages');
	const booksGrid = document.querySelector('.books-grid');

	let book = new Book(myLibrary.length, inputBook.value, inputAuthor.value, inputPages.value);
	book.render(booksGrid);
	
	myLibrary.push(book);
	localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
	form.reset();
}

function renderLibrary(myLibrary) {
	let booksGrid = document.querySelector('.books-grid');
	for (let book of myLibrary) {
		book.render(booksGrid);
	}
}

function getStorage(myLibrary) {
	let retrievedLibrary = JSON.parse(localStorage.getItem('myLibrary'));
	if (retrievedLibrary != null) {
		for (let i = 0; i < retrievedLibrary.length; i++) {
			let obj = retrievedLibrary[i];
			let book = new Book(obj.id, obj.name, obj.author, obj.pages);
			myLibrary.push(book);
		}
	} else {
		alert("Empty library!");
	}
}

(function(){
	// If localstorage empty

	let myLibrary = [];
	getStorage(myLibrary);
	renderLibrary(myLibrary);

	const form = document.querySelector('.add-books__form');
	
	form.addEventListener('submit', addBookToLibrary);
	// show empty library html
	//else
	// myLibrary = localstorage data
	// render library
	//

})();