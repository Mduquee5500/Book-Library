// Responsability / Concern: Process the raw data by calling domain function and sending it to component

import { searchBook as searchGoogleBooks } from "../services/googleBookService.jsx";
import { createBook } from "../domain/books.jsx";

export const searchBooks = async (searchTerm) => {
  try {
    const rawBooks = await searchGoogleBooks(searchTerm);
    const translatedBooks = rawBooks.map((rawBook) => createBook(rawBook));
    return translatedBooks;
  } catch (error) {
    throw new Error("Failed to search books");
  }
};
