function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.filter(book => !book.borrows[0].returned).length;
}

// Object destructuring utilized here
// Object destructuring is used to extract the genre property from each book when iterating through the books array with forEach. Additionally, Object destructuring is used in the map function to extract the name and count properties from the entries of the genreCounts object
function getMostCommonGenres(books) {
  const genreCounts = {};

  books.forEach(({ genre }) => {
    genreCounts[genre] = (genreCounts[genre] || 0) + 1;
  });

  return Object.entries(genreCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((genreA, genreB) => genreB.count - genreA.count)
    .slice(0, 5);
}

// Object shorthand and object destructuring utilized here
// Object destructuring is used to extract the title and borrows properties from each book, and then use object shorthand when creating a new object with the properties name and count.
function getMostPopularBooks(books) {
  return books
    .map(({ title, borrows }) => ({ name: title, count: borrows.length }))
    .sort((bookA, bookB) => bookB.count - bookA.count)
    .slice(0, 5);
}

// Template literals utilized here
// The backticks (`) are used to create a template literal, and the `${expression}`syntax is used to embed the `author.name.first` and `author.name.last` expressions within the resulting string
function getMostPopularAuthors(books, authors) {
  const authorPopularity = books.reduce((accumulator, book) => {
    const author = authors.find(author => author.id === book.authorId);
    const authorName = `${author.name.first} ${author.name.last}`;
    accumulator[authorName] = (accumulator[authorName] || 0) + book.borrows.length;
    return accumulator;
  }, {});

  const popularAuthors = Object.keys(authorPopularity)
    .map(authorName => ({ name: authorName, count: authorPopularity[authorName] }))
    .sort((authorA, authorB) => authorB.count - authorA.count)
    .slice(0, 5);

  return popularAuthors;
}


// Helper function to find the total times an author's books have been borrowed
function totalBorrowsByAuthor(authorId, books) {
  return books
    .filter((book) => book.authorId === authorId)
    .reduce((acc, book) => acc + book.borrows.length, 0);
}

function getMostPopularAuthors(books, authors) {
  const authorPopularity = authors.map((author) => {
    const name = `${author.name.first} ${author.name.last}`;
    const count = totalBorrowsByAuthor(author.id, books);
    return { name, count };
  });

  return authorPopularity
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
