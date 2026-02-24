import React from "react";

export default function SectionCard({ title, children, description }) {
  return (
    <section className="section-card">
      <div className="px-6 py-4">
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        {description && (
          <p className="text-sm text-gray-600 mb-4">{description}</p>
        )}
        <div className="space-y-4">{children}</div>
      </div>
    </section>
  );
}
