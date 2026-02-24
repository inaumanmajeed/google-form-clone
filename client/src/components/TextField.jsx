import React, { useState } from "react";
import { Controller } from "react-hook-form";

export default function TextField({
  name,
  control,
  label,
  placeholder,
  type = "text",
  error,
}) {
  const [numberError, setNumberError] = useState(null);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="relative">
          {label && <label className="block font-medium mb-1">{label}</label>}
          <input
            {...field}
            type={type}
            placeholder={placeholder}
            className={`input ${error || numberError ? "border-red-600" : ""}`}
            {...(type === "number"
              ? {
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  min: 1,
                  onKeyDown: (e) => {
                    const forbidden = ["e", "E", "+", "-", "."];
                    if (forbidden.includes(e.key)) e.preventDefault();
                  },
                  onPaste: (e) => {
                    const paste = (
                      e.clipboardData || window.clipboardData
                    ).getData("text");
                    if (!/^[0-9]+$/.test(paste)) e.preventDefault();
                  },
                  onChange: (e) => {
                    const raw = e.target.value;
                    const cleaned = raw.replace(/\D+/g, "");
                    if (cleaned === "") {
                      setNumberError(null);
                      field.onChange("");
                      return;
                    }
                    const n = parseInt(cleaned, 10);
                    if (Number.isNaN(n)) {
                      setNumberError("Invalid number");
                      field.onChange(cleaned);
                      return;
                    }
                    if (n < 1) {
                      setNumberError("Value must be 1 or greater");
                    } else {
                      setNumberError(null);
                    }
                    field.onChange(String(n));
                  },
                }
              : {})}
          />
          {error && (
            <p
              className="text-xs text-red-600 absolute left-0"
              style={{ top: "calc(100% + 0px)" }}
            >
              {error}
            </p>
          )}
          {numberError && (
            <p
              className="text-xs text-red-600 absolute left-0"
              style={{ top: "calc(100% + 0px)" }}
            >
              {numberError}
            </p>
          )}
        </div>
      )}
    />
  );
}
