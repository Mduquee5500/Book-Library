// Responsability / Concern: Process the raw data by calling domain function and sending it to component

// usecases/searchBooks.jsx
import { searchBookOpenLibrary } from "../services/openLibraryService.jsx";
import { searchBooks as searchGoogleBooks } from "../services/googleBookService.jsx";
import {
  createBookFromOpenLibrary,
  createHybridBook,
} from "../domain/books.jsx";

const findMatchingGoogleBook = (openLibraryBook, googleBooks) => {
  const normalizeString = (str) => {
    return str?.toLowerCase().replace(/[^a-z0-9]/g, "") || "";
  };

  const olTitle = normalizeString(openLibraryBook.title);
  const olAuthor = normalizeString(openLibraryBook.author_name?.[0]);

  console.log(
    `\n--- Buscando match para: "${openLibraryBook.title}" por ${openLibraryBook.author_name?.[0]} ---`
  );

  const match = googleBooks.find((googleBook) => {
    const googleTitle = normalizeString(googleBook.volumeInfo?.title);
    const googleAuthor = normalizeString(googleBook.volumeInfo?.authors?.[0]);

    const titleMatch =
      olTitle === googleTitle ||
      (olTitle.length > 5 && googleTitle.includes(olTitle)) ||
      (googleTitle.length > 5 && olTitle.includes(googleTitle));

    const authorMatch = olAuthor === googleAuthor;

    if (titleMatch && authorMatch) {
      console.log(
        `✅ MATCH ENCONTRADO: "${googleBook.volumeInfo?.title}" por ${googleBook.volumeInfo?.authors?.[0]}`
      );
      return true;
    }
    return false;
  });

  if (!match) {
    console.log(`❌ No se encontró match para: "${openLibraryBook.title}"`);
  }

  return match;
};
// export const searchBooks = async (searchTerm) => {
//   try {
//     const rawBooks = await searchBookOpenLibrary(searchTerm);
//     const translatedBooks = rawBooks.map((rawBook) =>
//       createBookFromOpenLibrary(rawBook)
//     );
//     return translatedBooks;
//   } catch (error) {
//     console.log("ORIGINAL ERROR:", error);
//     console.log("Error message:", error.message);
//     console.log("Error stack:", error.stack);
//     throw error;
//   }
// };

export const searchBooks = async (searchTerm) => {
  try {
    const openLibraryBooks = await searchBookOpenLibrary(searchTerm);
    const googleBooks = await searchGoogleBooks(searchTerm);

    const usedGoogleBooks = new Set();

    const hybridBooks = openLibraryBooks
      .filter((book) => book && book.key)
      .map((olBook) => {
        const googleMatch = findMatchingGoogleBook(
          olBook,
          googleBooks,
          usedGoogleBooks
        ); // ← Pasar el Set
        if (googleMatch) {
          usedGoogleBooks.add(googleMatch.id);
        }
        return createHybridBook(olBook, googleMatch);
      });

    return hybridBooks;
  } catch (error) {
    console.log("ORIGINAL ERROR:", error);
    console.log("Error message:", error.message);
    console.log("Error stack:", error.stack);
    throw error;
  }
};
