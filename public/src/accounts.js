// for/in Loop utilized here
function findAccountById(accounts, id) {
  for (let index in accounts) {
    if (accounts[index].id === id) {
      return accounts[index];
    }
  }
  return null; // If no matching account is found, return null
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) => a.name.last.toLowerCase() > b.name.last.toLowerCase() ? 1 : -1);
}

// Ternary operator utilized here
// The ternary operator is used inside the nested forEach loop to check if the borrow ID matches the account ID, and if it does, the totalBorrows count is incremented by 1; otherwise, it remains unchanged
function getTotalNumberOfBorrows(account, books) {
  let totalBorrows = 0;

  books.forEach(book => {
    book.borrows.forEach(borrow => {
      totalBorrows += borrow.id === account.id ? 1 : 0;
    });
  });

  return totalBorrows;
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;

  const borrowedBooks = books.filter(book => {
    const recentBorrow = book.borrows[0];
    return recentBorrow.id === accountId && !recentBorrow.returned;
  });

  return borrowedBooks.map(book => {
    const author = authors.find(author => author.id === book.authorId);
    return { ...book, author };
  });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
