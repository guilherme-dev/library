// --- Library project

// Prototype Book object, once will have many instances
function Book (id, name, author, pages) {
	this.id = id;
	this.name = name;
	this.author = author;
	this.pages = pages;
}

// Book.prototype.toggleRead = function() {

// }

Book.prototype.render = function(parentNode) {

	//TODO: 
	// <div class="book-read">
	// 	<input type="checkbox">
	// 	<span>Haven't read yet</span>
	// </div>

	let htmlContent = `
			<div class="book-info">
				<p>${this.name}</p>
				<p>${this.author}</p>
				<p>${this.pages} pages</p>
				<button class="btn-delete">Delete</button>
			</div>
	`;
	let bookDiv = document.createElement('div');
	bookDiv.className = 'item book-card';
	bookDiv.dataset.id = this.id;
	bookDiv.innerHTML = htmlContent;

	parentNode.appendChild(bookDiv);
}

let Library = (() => {
	let booksCollection = [];

	//Cache DOM
	let form = document.querySelector('form');
	let inputBook = document.querySelector('#input-book');
	let inputAuthor = document.querySelector('#input-author');
	let inputPages = document.querySelector('#input-pages');
	let booksGrid = document.querySelector('.books-grid');
	let addButton = document.querySelector('#addButton');
	let deleteButton;

	// Bind Events
	addButton.addEventListener('click', addBook);
	
	//renders the entire library
	function _render() {
		for (let book of booksCollection) {
			_renderBook(book);
		}
	}

	//render a book and binds the delete button event
	function _renderBook(book) {
		book.render(booksGrid);
		
		// Needs to bind the delete event after the buttons are appended to the DOM
		deleteButton = document.querySelector('.btn-delete');
		deleteButton.addEventListener('click', deleteBook);
	}

	function _getStorage() {
		let retrievedLibrary = JSON.parse(localStorage.getItem('booksCollection'));
		if (retrievedLibrary != null) {
			for (let obj of retrievedLibrary) {
				let book = new Book(obj.id, obj.name, obj.author, obj.pages);
				booksCollection.push(book);
			}
		} else {
			alert("Empty library!");
		}
	}

	function _setStorage() {
		localStorage.setItem('booksCollection', JSON.stringify(booksCollection));
	}

	function addBook() {
		let book = new Book(booksCollection.length, inputBook.value, inputAuthor.value, inputPages.value);
		_renderBook(book);
		booksCollection.push(book);
		_setStorage();
		form.reset();
	}

	function deleteBook(e) {
		let selected = e.target;
		let elem = selected.parentElement.parentElement;
		let id = elem.dataset.id;

		elem.parentNode.removeChild(elem);
		booksCollection.splice(id, 1);
		_setStorage();
	}

	_getStorage();
	_render();

	return {
		addBook
	}
})();

