// Responsability / Concern: Receive data and show it in the UI

import React, { useState, useEffect } from "react";
import { getMyBooks } from "../usecases/getMyBooks";
import { updateBookRating } from "../usecases/updateBookRating";
import { removeBookFromLibrary } from "../usecases/removeBookFromLibrary";
import { Modal } from "./Modal";
import { Toast } from "./Toast";
import { ConfirmModal } from "./ConfirmModal";
import { RatingModal } from "./RatingModal";

export const MyBooks = () => {
  const [myList, setMyList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedBook, setSelectedBook] = useState(null);
  const [showBookModal, setShowBookModal] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  const [showRating, setShowRating] = useState(false);

  useEffect(() => {
    loadMyBooks();
  }, []);

  const loadMyBooks = async () => {
    try {
      setIsLoading(true);
      setError("");
      const books = await getMyBooks();
      setMyList(books);
      return books;
    } catch (error) {
      setError(error.message);
      setMyList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateRating = async (id, newRating) => {
    try {
      await updateBookRating(id, newRating);
      await loadMyBooks();
      setToastMessage("Rating updated successfully");
      setToastType("success");
      setShowToast(true);
    } catch (error) {
      setError(error.message);
      setToastMessage("Error updating rating");
      setToastType("error");
      setShowToast(true);
    }
  };

  const handleRemoveBook = async (id) => {
    try {
      setBookToDelete(id);
      setShowConfirmModal(true);
    } catch (error) {
      setError(error.message);
      setToastMessage("Error deleting book");
      setToastType("error");
      setShowToast(true);
    }
  };

  const confirmDelete = async () => {
    try {
      await removeBookFromLibrary(bookToDelete);
      await loadMyBooks();
      setToastMessage("Book deleted successfully");
      setToastType("success");
      setShowToast(true);
    } catch (error) {
      setToastMessage("Error al eliminar libro");
      setToastType("error");
      setShowToast(true);
    } finally {
      setShowConfirmModal(false);
      setBookToDelete(null);
    }
  };

  // UI / Render
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-red-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-red-900 mb-4 tracking-tight">
            My Personal Library
          </h1>
          <p className="text-xl text-red-800 font-medium max-w-2xl mx-auto">
            Your curated collection of read books
          </p>
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
              Loading your personal library...
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

        {/* Library Counter */}
        {!isLoading && !error && myList.length > 0 && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-gradient-to-r from-amber-100 to-red-100 rounded-xl p-4 border border-red-200">
              <p className="text-lg font-semibold text-red-900 text-center">
                📚 {myList.length} book{myList.length > 1 ? "s" : ""} in your
                personal library
              </p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && myList.length === 0 && (
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
              Your Library is Empty
            </h3>
            <p className="text-red-700 max-w-md mx-auto">
              Start building your collection by adding books from the Browse
              section
            </p>
          </div>
        )}

        {/* Personal Book Grid */}
        {myList.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {myList.map((book) => (
              <div
                key={book.id}
                className="group"
                onClick={() => {
                  console.log("Card listener: ", book.title);
                  setSelectedBook(book);
                  setShowBookModal(true);
                }}
              >
                <div className="bg-gradient-to-br from-amber-50 to-red-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-red-200 hover:border-red-400 overflow-hidden h-full">
                  {/* Book Cover */}
                  <div className="relative h-64 bg-gradient-to-br from-red-100 to-amber-100">
                    {book.cover_url ? (
                      <img
                        src={book.cover_url}
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
                          <p className="text-red-700 font-medium">Book Cover</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Book Information */}
                  <div className="p-6">
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

                    {/* Rating Display */}
                    {book.rating && (
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
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                        <span className="text-red-800 font-medium">
                          {book.rating}/5 stars
                        </span>
                      </div>
                    )}

                    {book.published_date && (
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
                          {book.published_date}
                        </p>
                      </div>
                    )}

                    {book.description && (
                      <p className="text-red-800 text-sm line-clamp-3 mb-4 leading-relaxed">
                        {book.description}
                      </p>
                    )}

                    {book.isbn && (
                      <div className="mb-4">
                        <p className="text-xs text-red-600 font-mono bg-red-50 px-2 py-1 rounded">
                          ISBN: {book.isbn}
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-6 pt-4 border-t border-red-200">
                      {/* Edit Rating Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowBookModal(false);
                          setSelectedBook(book);
                          setShowRating(true);
                        }}
                        className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                        Rate
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveBook(book.id);
                        }}
                        className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Modal */}
      <Modal
        selectedBook={selectedBook}
        isOpen={showBookModal}
        onClose={() => setSelectedBook(null)}
        context="library"
        onUpdateRating={handleUpdateRating}
        onRemove={handleRemoveBook}
      />

      {/* Toast */}
      <Toast
        message={toastMessage}
        type={toastType}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        duration={3000}
      />

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={showConfirmModal}
        title="Delete book?"
        message="This action cannot be undone, want to proceed?"
        onConfirm={confirmDelete}
        onCancel={() => setShowConfirmModal(false)}
        confirmText="Delete"
        cancelText="Cancel"
      />

      {/* Rating */}
      <RatingModal
        isOpen={showRating}
        onCancel={() => setShowRating(false)}
        book={selectedBook}
        onRatingSubmit={handleUpdateRating}
      />
    </div>
  );
};
