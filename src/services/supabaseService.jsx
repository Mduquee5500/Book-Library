// Responsability / Concern: Talk with Supabase API (CRUD functions)

import { supabase } from "./supabaseClient";

export const addReadBookToDB = async (bookData) => {
  const { data, error } = await supabase.from("read_books").insert([bookData]);

  if (error) {
    throw new Error(`Failed to add book: ${error.message}`);
  } else {
    return data;
  }
};

export const getReadBooksFromDB = async () => {
  const { data, error } = await supabase.from("read_books").select();

  if (error) {
    throw new Error(`Failed to fetch books: ${error.message}`);
  } else {
    return data;
  }
};

export const updateReadBookInDB = async (id, newData) => {
  const { data, error } = await supabase
    .from("read_books")
    .update(newData)
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to update book: ${error.message}`);
  } else {
    return data;
  }
};

export const deleteReadBookFromDB = async (id) => {
  const { data, error } = await supabase
    .from("read_books")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to remove book: ${error.message}`);
  } else {
    return data;
  }
};
