import React from "react";

export default function Banner({ title, subtitle }) {
  return (
    <div className="w-full rounded-lg overflow-hidden mb-6">
      <div className="h-40 bg-gradient-to-r from-green-600 via-green-500 to-green-400 relative flex items-center">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 200'><rect width='800' height='200' fill='%23fff' opacity='0'/><g fill='%23000000' opacity='0.02'><rect x='0' y='0' width='100' height='100' rx='8'/></g></svg>\")",
          }}
        />
        <div className="p-6 text-white z-10">
          <h2 className="text-3xl font-semibold">{title}</h2>
          {subtitle && <p className="mt-2 opacity-90">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
