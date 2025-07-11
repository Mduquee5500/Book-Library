import { StarRating } from "./StarRating";

export const RatingModal = ({ isOpen, book, onRatingSubmit, onCancel }) => {
  if (!isOpen) return null;

  const handleRatingChange = (rating) => {
    onRatingSubmit(book.id, rating);
    onCancel();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="bg-gradient-to-br from-amber-50 to-red-50 rounded-xl p-8 max-w-md w-full mx-4 border-2 border-red-200 shadow-2xl">
        {/* Title */}
        <h3 className="text-2xl font-bold text-red-900 mb-2 text-center">
          Rate this book
        </h3>

        {/* Book Title */}
        <p className="text-red-800 text-center mb-6 font-medium">
          "{book?.title}"
        </p>

        {/* Current Rating */}
        <div className="text-center mb-6">
          <p className="text-sm text-red-700 mb-3">
            Current rating: {book?.rating || "Not rated"}
          </p>

          {/* Star Rating Component */}
          <StarRating
            currentRating={book?.rating || 0}
            onRatingChange={handleRatingChange}
            size="32px"
            editable={true}
          />
        </div>

        {/* Cancel Button */}
        <div className="flex justify-center">
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
