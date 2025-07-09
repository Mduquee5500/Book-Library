// Responsability / Concern: Receive data and show it in the UI

import React, { useState, useEffect } from "react";
import { searchBooks as search } from "../usecases/searchBooks.jsx";

// Component
export const BookSearch = () => {
  const [bookList, setBookList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleSearch = async () => {
    if (!searchTerm || searchTerm.length < 2) return;

    try {
      setIsLoading(true);
      setError("");
      const books = await search(searchTerm);
      setBookList(books);
    } catch (error) {
      setError("Failed fetching books");
      setBookList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // UI Academic Design
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-red-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Academic Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-red-900 mb-4 tracking-tight">
            Academic Library
          </h1>
          <p className="text-xl text-red-800 font-medium max-w-2xl mx-auto">
            Discover knowledge from millions of scholarly sources and academic
            publications
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-red-900 to-red-800 rounded-2xl shadow-2xl border border-red-700 p-8">
            <h2 className="text-2xl font-semibold text-amber-100 mb-6 text-center">
              Search Academic Resources
            </h2>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search for books, papers, authors, or subjects..."
                className="w-full px-6 py-4 text-lg border-2 border-amber-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none transition-all duration-200 bg-amber-50 focus:bg-white text-red-900 placeholder-red-400"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-200 border-t-red-800"></div>
              <div
                className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-amber-600 animate-spin"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "1.5s",
                }}
              ></div>
            </div>
            <p className="mt-6 text-lg font-medium text-red-800">
              Searching academic databases...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-100 border-l-4 border-red-800 p-6 rounded-lg">
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-red-800 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-red-900 font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Counter */}
        {!isLoading && !error && searchTerm.length >= 2 && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-gradient-to-r from-amber-100 to-red-100 rounded-xl p-4 border border-red-200">
              <p className="text-lg font-semibold text-red-900 text-center">
                {bookList.length > 0
                  ? `📚 ${bookList.length} academic resources found for "${searchTerm}"`
                  : `🔍 No resources found for "${searchTerm}" - Try different keywords`}
              </p>
            </div>
          </div>
        )}

        {/* Academic Book Grid */}
        {bookList.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {bookList.map((book) => (
              <div key={book.id} className="group">
                <div className="bg-gradient-to-br from-amber-50 to-red-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-red-200 hover:border-red-400 overflow-hidden h-full">
                  {/* Book Cover */}
                  <div className="relative h-64 bg-gradient-to-br from-red-100 to-amber-100">
                    {book.coverUrl ? (
                      <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center p-6">
                          <svg
                            className="w-16 h-16 text-red-600 mx-auto mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                          <p className="text-red-700 font-medium">
                            Academic Publication
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Book Information */}
                  <div className="p-6 bg-gradient-to-br from-amber-25 to-red-25">
                    <h3 className="text-xl font-bold text-red-900 mb-3 line-clamp-2 group-hover:text-red-700 transition-colors">
                      {book.title}
                    </h3>

                    <div className="flex items-center mb-3">
                      <svg
                        className="w-4 h-4 text-red-600 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <p className="text-red-800 font-medium">{book.author}</p>
                    </div>

                    {book.publishedDate && (
                      <div className="flex items-center mb-4">
                        <svg
                          className="w-4 h-4 text-red-600 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-red-700 text-sm font-medium">
                          {book.publishedDate}
                        </p>
                      </div>
                    )}

                    {book.description && (
                      <p className="text-red-800 text-sm line-clamp-3 mb-4 leading-relaxed">
                        {book.description}
                      </p>
                    )}

                    {book.isbn && (
                      <div className="mt-4 pt-4 border-t border-red-200">
                        <p className="text-xs text-red-600 font-mono bg-red-50 px-2 py-1 rounded">
                          ISBN: {book.isbn}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && searchTerm.length < 2 && (
          <div className="text-center py-16">
            <svg
              className="w-24 h-24 text-red-300 mx-auto mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <h3 className="text-2xl font-semibold text-red-800 mb-2">
              Start Your Academic Search
            </h3>
            <p className="text-red-700 max-w-md mx-auto">
              Enter at least 2 characters to begin searching through millions of
              academic publications and books
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
