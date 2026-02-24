import React from "react";
import { Controller } from "react-hook-form";
import Select, { components } from "react-select";

export default function SelectField({
  name,
  control,
  label,
  options = [],
  error,
}) {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: 50,
      height: 50,
      display: "flex",
      alignItems: "center",
      backgroundColor: "#ffffff",
      border: state.isFocused ? "1px solid #34d399" : "1px solid #e5e7eb",
      boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
      borderRadius: 6,
      outline: "none",
      "&:hover": {
        borderColor: "#34d399",
      },
    }),
    valueContainer: (provided) => ({ ...provided, padding: "8px 12px" }),
    input: (provided) => ({ ...provided, margin: 0, padding: 0 }),
    placeholder: (provided) => ({ ...provided, margin: 0 }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#ffffff",
      boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    }),
    singleValue: (provided) => ({ ...provided, color: "#111827" }),
  };
  function codeToFlag(cc) {
    if (!cc) return "";
    const code = cc.toUpperCase();
    return code.replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt(0)),
    );
  }

  const OptionWithFlag = (props) => (
    <components.Option {...props}>
      <div className="flex items-center">
        <span className="mr-3 text-lg">{codeToFlag(props.data.value)}</span>
        <div>{props.data.label}</div>
      </div>
    </components.Option>
  );

  const SingleValueWithFlag = (props) => (
    <components.SingleValue {...props}>
      <div className="flex items-center">
        <span className="mr-3 text-lg">{codeToFlag(props.data.value)}</span>
        <div>{props.data.label}</div>
      </div>
    </components.SingleValue>
  );
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const selected = options.find((o) => o.value === field.value) || null;
        return (
          <div className="relative">
            <div className="space-y-1">
              {label && (
                <label className="block font-medium mb-1">{label}</label>
              )}
              <Select
                className="w-full"
                classNamePrefix="rs"
                styles={customStyles}
                components={{
                  Option: OptionWithFlag,
                  SingleValue: SingleValueWithFlag,
                }}
                value={selected}
                onChange={(opt) => field.onChange(opt ? opt.value : "")}
                options={options}
              />
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
