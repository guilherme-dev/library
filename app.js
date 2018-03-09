// --- Library project

// Array that store all the books


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

function addBookToLibrary() {

}

function renderLibrary(myLibrary) {
	let booksGrid = document.querySelector('.books-grid');
	for (let book of myLibrary) {
		book.render(booksGrid);
	}
}

(function(){
	// If localstorage empty

	let myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
	if (myLibrary === null) {
		myLibrary = [];
		localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
	}
	
	renderLIbrary(myLibrary);

	// show empty library html
	//else
	// myLibrary = localstorage data
	// render library
	//

})();