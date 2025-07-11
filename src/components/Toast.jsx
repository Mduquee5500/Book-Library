import React, { useEffect } from "react";

export const Toast = ({ message, type, isVisible, onClose, duration }) => {
  useEffect(() => {
    if (isVisible && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  if (!isVisible) return null;

  const getToastStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-100 border-green-500 text-green-800";
      case "error":
        return "bg-red-100 border-red-500 text-red-800";
      case "info":
        return "bg-blue-100 border-blue-500 text-blue-800";
      default:
        return "bg-gray-100 border-gray-500 text-gray-800";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "info":
        return "ℹ️";
      default:
        return "";
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-lg border-l-4 shadow-lg transition-all duration-300 ${getToastStyles()}`}
    >
      <div className="flex items-center gap-2">
        <span className="text-lg">{getIcon()}</span>
        <p className="font-medium">{message}</p>
      </div>
    </div>
  );
};
