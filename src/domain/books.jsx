// Responsability / Concern: Translate raw book data to data understandable for usecases

export const createBook = (googleBookData) => {
    const { volumeInfo } = googleBookData

    const book = {
        id: googleBookData.id,                                         // → google_book_id
        title: volumeInfo.title || 'Unknown Title',                    // → title
        author: volumeInfo.authors?.[0] || 'Unknown Author',           // → author
        description: volumeInfo.description || '',                     // → description
        coverUrl: volumeInfo.imageLinks?.thumbnail || null,            // → cover_url
        publishedDate: volumeInfo.publishedDate || null,               // → published_date
        isbn: volumeInfo.industryIdentifiers?.[0]?.identifier || null  // → isbn
    }

    return book
}