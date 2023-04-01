function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const borrowed = [];
  const returned = [];

  books.forEach(book => {
    if (book.borrows[0].returned) {
      returned.push(book);
    } else {
      borrowed.push(book);
    }
  });

  return [borrowed, returned];
}

// Spread operator utilized here
// The spread operator (...account) is used inside the map function to create a new object with all the properties of the original account object and adds a returned property

function getBorrowersForBook(book, accounts) {
    return book.borrows.slice(0, 10).map(borrow => {
      const account = accounts.find(acc => acc.id === borrow.id);
      return { ...account, returned: borrow.returned };
    });
  }

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
