// Responsability / Concern: Receive data and show it in the UI

export const Modal = ({
  selectedBook,
  isOpen,
  onClose,
  onUpdateRating,
  onRemove,
  onAddToLibrary,
  context,
}) => {
  if (!isOpen || !selectedBook) return null;

  // Handle backdrop click to close modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (context === "library") {
    return (
      <div
        className="fixed inset-0 bg-black flex items-center justify-center z-50 p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onClick={handleBackdropClick}
      >
        <div className="bg-gradient-to-br from-amber-50 to-red-50 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-red-200">
          {/* Header with Close Button */}
          <div className="top-0 bg-gradient-to-r from-red-900 to-red-800 text-white p-6 rounded-t-2xl flex justify-between items-center">
            <h2 className="text-2xl font-bold text-amber-100">Book Details</h2>
            <button
              onClick={onClose}
              className="text-amber-100 hover:text-white text-3xl font-bold transition-colors duration-200 hover:bg-red-700 rounded-full w-10 h-10 flex items-center justify-center"
            >
              ×
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Book Cover */}
              <div className="md:col-span-1">
                <div className="relative bg-gradient-to-br from-red-100 to-amber-100 rounded-xl overflow-hidden shadow-lg">
                  {selectedBook.cover_url ? (
                    <img
                      src={selectedBook.cover_url}
                      alt={selectedBook.title}
                      className="w-full h-auto object-cover"
                    />
                  ) : (
                    <div className="aspect-[3/4] flex items-center justify-center">
                      <div className="text-center p-8">
                        <svg
                          className="w-20 h-20 text-red-600 mx-auto mb-4"
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

                {/* Rating Display */}
                {selectedBook.rating && (
                  <div className="mt-4 bg-gradient-to-r from-amber-100 to-red-100 rounded-lg p-4 border border-red-200">
                    <div className="flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-amber-600 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      <span className="text-lg font-bold text-red-900">
                        {selectedBook.rating}/5 Stars
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Book Information */}
              <div className="md:col-span-2">
                {/* Title */}
                <h1 className="text-3xl font-bold text-red-900 mb-4 leading-tight">
                  {selectedBook.title}
                </h1>

                {/* Author */}
                <div className="flex items-center mb-4">
                  <svg
                    className="w-5 h-5 text-red-600 mr-3"
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
                  <p className="text-xl text-red-800 font-semibold">
                    {selectedBook.author}
                  </p>
                </div>

                {/* Published Date */}
                {selectedBook.published_date && (
                  <div className="flex items-center mb-6">
                    <svg
                      className="w-5 h-5 text-red-600 mr-3"
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
                    <p className="text-red-700 font-medium">
                      Published: {selectedBook.published_date}
                    </p>
                  </div>
                )}

                {/* Description */}
                {selectedBook.description && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-red-900 mb-3">
                      Description
                    </h3>
                    <div className="bg-white bg-opacity-50 rounded-lg p-4 border border-red-200">
                      <p className="text-red-800 leading-relaxed">
                        {selectedBook.description}
                      </p>
                    </div>
                  </div>
                )}

                {/* ISBN */}
                {selectedBook.isbn && (
                  <div className="mb-6">
                    <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                      <p className="text-sm text-red-600 font-mono">
                        <span className="font-semibold">ISBN:</span>{" "}
                        {selectedBook.isbn}
                      </p>
                    </div>
                  </div>
                )}

                {/* Notes (if any) */}
                {selectedBook.notes && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-red-900 mb-3">
                      Personal Notes
                    </h3>
                    <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                      <p className="text-red-800 leading-relaxed italic">
                        "{selectedBook.notes}"
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-red-200">
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    const newRating = prompt(
                      "Rate this book (1-5):",
                      selectedBook.rating || ""
                    );
                    const ratingNum = Number(newRating);
                    if (newRating && ratingNum >= 1 && ratingNum <= 5) {
                      onUpdateRating(selectedBook.id, ratingNum);
                      onClose();
                    }
                  }}
                  className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
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
                  Update Rating
                </button>

                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to remove this book from your library?"
                      )
                    ) {
                      onRemove(selectedBook.id);
                      onClose();
                    }
                  }}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
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
                  Remove from Library
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (context === "browse" && selectedBook && isOpen) {
    return (
      <div
        className="fixed inset-0 bg-black flex items-center justify-center z-50 p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onClick={handleBackdropClick}
      >
        <div className="bg-gradient-to-br from-amber-50 to-red-50 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-red-200">
          {/* Header with Close Button */}
          <div className="top-0 bg-gradient-to-r from-red-900 to-red-800 text-white p-6 rounded-t-2xl flex justify-between items-center">
            <h2 className="text-2xl font-bold text-amber-100">Book Details</h2>
            <button
              onClick={onClose}
              className="text-amber-100 hover:text-white text-3xl font-bold transition-colors duration-200 hover:bg-red-700 rounded-full w-10 h-10 flex items-center justify-center"
            >
              ×
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Book Cover */}
              <div className="md:col-span-1">
                <div className="relative bg-gradient-to-br from-red-100 to-amber-100 rounded-xl overflow-hidden shadow-lg">
                  {selectedBook.coverUrl ? (
                    <img
                      src={selectedBook.coverUrl}
                      alt={selectedBook.title}
                      className="w-full h-auto object-cover"
                    />
                  ) : (
                    <div className="aspect-[3/4] flex items-center justify-center">
                      <div className="text-center p-8">
                        <svg
                          className="w-20 h-20 text-red-600 mx-auto mb-4"
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
              </div>

              {/* Book Information */}
              <div className="md:col-span-2">
                {/* Title */}
                <h1 className="text-3xl font-bold text-red-900 mb-4 leading-tight">
                  {selectedBook.title}
                </h1>

                {/* Author */}
                <div className="flex items-center mb-4">
                  <svg
                    className="w-5 h-5 text-red-600 mr-3"
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
                  <p className="text-xl text-red-800 font-semibold">
                    {selectedBook.author}
                  </p>
                </div>

                {/* Published Date */}
                {selectedBook.publishedDate && (
                  <div className="flex items-center mb-6">
                    <svg
                      className="w-5 h-5 text-red-600 mr-3"
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
                    <p className="text-red-700 font-medium">
                      Published: {selectedBook.publishedDate}
                    </p>
                  </div>
                )}

                {/* Description */}
                {selectedBook.description && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-red-900 mb-3">
                      Description
                    </h3>
                    <div className="bg-white bg-opacity-50 rounded-lg p-4 border border-red-200">
                      <p className="text-red-800 leading-relaxed">
                        {selectedBook.description}
                      </p>
                    </div>
                  </div>
                )}

                {/* ISBN */}
                {selectedBook.isbn && (
                  <div className="mb-6">
                    <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                      <p className="text-sm text-red-600 font-mono">
                        <span className="font-semibold">ISBN:</span>{" "}
                        {selectedBook.isbn}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-8 pt-6 border-t border-red-200">
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    onAddToLibrary(selectedBook, 1, "");
                    onClose();
                  }}
                  className="bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-800 text-amber-100 font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-3"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add to Library
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
