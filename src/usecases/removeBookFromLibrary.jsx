// Responsability / Concern: Process DB data (DELETE)

import { deleteReadBookFromDB } from "../services/supabaseService";

export const removeBookFromLibrary = async (id) => {
  try {
    const deletedBook = await deleteReadBookFromDB(id);
    return deletedBook;
  } catch (error) {
    throw new Error("Failed deleting book");
  }
};
