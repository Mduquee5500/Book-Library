// Responsability / Concern: Translate raw book data to data understandable for database

export const createReadBookForDB = (googleBook, rating, notes) => {
  return {
    google_book_id: googleBook.id,
    title: googleBook.title,
    author: googleBook.author,
    description: googleBook.description || null,
    cover_url: googleBook.coverUrl,
    published_date: googleBook.publishedDate || null,
    isbn: googleBook.isbn || null,
    rating: rating,
    date_read: new Date().toISOString(),
    notes: notes || null,
  };
};
