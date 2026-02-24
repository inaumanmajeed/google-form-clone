import React from "react";
import { Controller } from "react-hook-form";

export default function CheckboxGroup({
  name,
  control,
  label,
  options = [],
  error,
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const value = Array.isArray(field.value) ? field.value : [];
        const toggle = (opt) => {
          if (value.includes(opt)) {
            field.onChange(value.filter((v) => v !== opt));
          } else {
            field.onChange([...value, opt]);
          }
        };

        return (
          <div className="relative">
            <div className="space-y-1">
              {label && <div className="block font-medium mb-2">{label}</div>}
              <div className="flex gap-4">
                {options.map((opt) => (
                  <label key={opt.value} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={value.includes(opt.value)}
                      onChange={() => toggle(opt.value)}
                      className="mr-2 accent-green-600 w-4 h-4"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
            {error && (
              <p
                className="text-sm text-red-600 absolute left-0"
                style={{ top: "calc(100% + 0px)" }}
              >
                {error}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}
