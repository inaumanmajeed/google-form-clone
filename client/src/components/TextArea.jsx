import { Controller } from "react-hook-form";

export default function TextArea({
  name,
  control,
  label,
  placeholder,
  rows = 4,
  error,
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="relative">
          {label && <label className="block font-medium mb-1">{label}</label>}
          <textarea
            {...field}
            rows={rows}
            placeholder={placeholder}
            className="input"
          />
          {error && (
            <p
              className="text-sm text-red-600 absolute left-0"
              style={{ top: "calc(100% + 0px)" }}
            >
              {error}
            </p>
          )}
        </div>
      )}
    />
  );
}
