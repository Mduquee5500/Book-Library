// Responsability / Concern: Process DB data (UPDATE)

import { updateReadBookInDB } from "../services/supabaseService";

export const updateBookRating = async (id, bookRating) => {
  try {
    const bookToUpdate = await updateReadBookInDB(id, { rating: bookRating });
    return bookToUpdate;
  } catch (error) {
    throw new Error("Failed updasting book rating");
  }
};
