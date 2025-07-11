// Responsability / Concern: Talk with Open Library API

export const searchBookOpenLibrary = async (searchTerm) => {
  const apiUrl = "https://openlibrary.org/search.json";

  if (!searchTerm || searchTerm.trim().length < 2) {
    throw new Error("Search mus be at least 2 characters");
  }

  try {
    const encodeUrl = encodeURIComponent(searchTerm);
    const finalUrlBook = `${apiUrl}?q=${encodeUrl}&limit=20`;

    const response = await fetch(finalUrlBook);

    if (!response.ok) {
      throw new Error(`HTTP Error status: ${response.status}`);
    }

    const data = await response.json();
    return data.docs || [];
  } catch (error) {
    throw new Error("Error: ", error);
  }
};
