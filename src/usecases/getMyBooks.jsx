// Responsability / Concern: Process DB data (READ)

import { getReadBooksFromDB } from "../services/supabaseService";

export const getMyBooks = async () => {
  try {
    const books = await getReadBooksFromDB();
    return books;
  } catch (error) {
    throw new Error("Failed to get my books");
  }
};
