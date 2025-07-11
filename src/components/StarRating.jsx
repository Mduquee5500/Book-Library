import React, { useState } from "react";

export const StarRating = ({
  currentRating,
  onRatingChange,
  size,
  editable,
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const stars = [1, 2, 3, 4, 5];

  const handleClickStar = (starNumber) => {
    if (editable && onRatingChange) {
      onRatingChange(starNumber);
    }
  };

  return (
    <div onMouseLeave={() => editable && setHoverRating(0)}>
      {stars.map((number) => {
        const activeRating = hoverRating > 0 ? hoverRating : currentRating;
        const isFilled = number <= activeRating;

        return (
          <span
            key={number}
            onClick={() => handleClickStar(number)}
            onMouseEnter={() => editable && setHoverRating(number)}
            // Quitar el onMouseLeave de aquí
            style={{
              cursor: editable ? "pointer" : "default",
              fontSize: size || "24px",
              transition: "color 0.2s ease",
              userSelect: "none",
            }}
          >
            {isFilled ? "⭐" : "☆"}
          </span>
        );
      })}
    </div>
  );
};
