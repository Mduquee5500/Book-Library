export const ConfirmModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Accept",
  cancelText = "Cancel",
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="bg-gradient-to-br from-amber-50 to-red-50 rounded-xl p-8 max-w-md w-full mx-4 border-2 border-red-200 shadow-2xl">
        {/* Title */}
        <h3 className="text-2xl font-bold text-red-900 mb-4 text-center">
          {title}
        </h3>

        {/* Message */}
        <p className="text-red-800 text-center mb-8 leading-relaxed">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors duration-200"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
