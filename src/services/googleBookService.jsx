// Responsability / Concern: Talk with Google API

export const searchBook = async (searchTerm) => {
  const apiUrl = "https://www.googleapis.com/books/v1/volumes";

  if (!searchTerm || searchTerm.trim().length < 2) {
    throw new Error("Search mus be at least 2 characters");
  }

  try {
    const encodeUrl = encodeURIComponent(searchTerm);
    const finalUrlBook = apiUrl + "?q=" + encodeUrl + "&maxResults=20";

    const response = await fetch(finalUrlBook);

    if (!response.ok) {
      throw new Error(`HTTP Error status: ${response.status}`);
    }

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    throw new Error("Error: ", error);
  }
};
