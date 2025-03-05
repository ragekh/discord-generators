import React from 'react';

/**
 * A character counter component for text inputs
 * @param {Object} props - Component props
 * @param {string} props.text - The text to count characters for
 * @param {number} props.limit - The character limit
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} - Character counter component
 */
const CharacterCounter = ({ text = '', limit = 140, className = '' }) => {
  const count = text.length;
  const remaining = limit - count;
  const isNearLimit = remaining <= 20 && remaining > 0;
  const isOverLimit = remaining < 0;

  return (
    <div className={`text-xs mt-1 ${className}`}>
      <span
        className={`
          ${isNearLimit ? 'text-yellow-600' : ''}
          ${isOverLimit ? 'text-red-600 font-semibold' : 'text-gray-500'}
        `}
      >
        {count} / {limit} characters
        {isOverLimit && ' (over limit)'}
        {isNearLimit && ' (approaching limit)'}
      </span>
      <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
        <div
          className={`h-1 rounded-full ${
            isOverLimit
              ? 'bg-red-500'
              : isNearLimit
              ? 'bg-yellow-500'
              : 'bg-green-500'
          }`}
          style={{ width: `${Math.min(100, (count / limit) * 100)}%` }}
        ></div>
      </div>
    </div>
  );
};

export default CharacterCounter;