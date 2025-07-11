// Responsability / Concern: Translate raw book data to data understandable for usecases

export const createBook = (googleBookData) => {
  const { volumeInfo } = googleBookData;

  const book = {
    id: googleBookData.id,
    title: volumeInfo.title || "Unknown Title",
    author: volumeInfo.authors?.[0] || "Unknown Author",
    description: volumeInfo.description || "",
    coverUrl: volumeInfo.imageLinks?.thumbnail || null,
    publishedDate: volumeInfo.publishedDate || null,
    isbn: volumeInfo.industryIdentifiers?.[0]?.identifier || null,
  };

  return book;
};

export const createBookFromOpenLibrary = (openLibraryData) => {
  if (!openLibraryData || !openLibraryData.key) {
    return null;
  }

  console.log("Raw Open Library data:", openLibraryData);

  const book = {
    id: openLibraryData.key,
    title: openLibraryData.title || "Unknown Title",
    author: openLibraryData.author_name?.[0] || "Unknown Author",
    description: "",
    coverUrl: openLibraryData.cover_i
      ? `https://covers.openlibrary.org/b/id/${openLibraryData.cover_i}-L.jpg`
      : null,
    publishedDate: openLibraryData.first_publish_year || null,
    isbn: null,
  };
  return book;
};

export const createHybridBook = (openLibraryData, googleBookData) => {
  const book = {
    id: openLibraryData.key,
    title: openLibraryData.title || "Unknown Title",
    author: openLibraryData.author_name?.[0] || "Unknown Author",
    description: googleBookData?.volumeInfo?.description || "",
    coverUrl: openLibraryData.cover_i
      ? `https://covers.openlibrary.org/b/id/${openLibraryData.cover_i}-L.jpg`
      : null,
    publishedDate: openLibraryData.first_publish_year || null,
    isbn:
      googleBookData?.volumeInfo?.industryIdentifiers?.[0]?.identifier || null,
  };
  return book;
};
