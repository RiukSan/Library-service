function Book(index, author, title, issued, issuedTo) {
	if (index <= 0 || isNaN(index)) {
		throw new Error('Non positive indexes are not allowed');
	}
	if (issued == undefined) {
		issued = "";
	}
	if (issuedTo == undefined) {
		issuedTo = "";
	}
	var id = index;
	this.author = author;
	this.title = title;
	this.issued = issued;
	this.issuedTo = issuedTo;
	this.getIndex = function () {
		return id;
	}
}

module.exports = Book;