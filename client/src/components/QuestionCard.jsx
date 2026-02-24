import React from "react";

export default function QuestionCard({ title, description, children }) {
  return (
    <div className="question-card bg-white rounded-lg shadow-custom border border-gray-100 overflow-hidden">
      <div className="h-3 bg-green-600 rounded-t-lg" />
      <div className="p-5">
        {title && <div className="text-lg font-medium mb-2">{title}</div>}
        {description && (
          <div className="text-sm text-gray-600 mb-3">{description}</div>
        )}
        <div className="pt-1">{children}</div>
      </div>
    </div>
  );
}
