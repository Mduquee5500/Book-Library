// Responsability / Concern: Process DB data (CREATE)

import { addReadBookToDB } from "../services/supabaseService";
import { createReadBookForDB } from "../domain/readBook";

export const addBookToLibrary = async (googleBook, rating, notes) => {
  try {
    const translatedBook = createReadBookForDB(googleBook, rating, notes);
    window.alert("Added to library");
    return addReadBookToDB(translatedBook);
  } catch (error) {
    throw new Error("Failed adding book");
  }
};
