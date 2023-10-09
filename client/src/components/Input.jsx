import React from "react";

const Input = ({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  defaultValue,
  onBlur,
  fileFormik,
}) => {
  let minDate = "";
  if (type === "datetime-local") {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");
    minDate = `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  if (type === "file") {
    return (
      <div className="w-full">
        <label className="block mb-2" htmlFor="">
          {label}
        </label>
        <input
          className="hidden"
          type="file"
          onChange={(event) => {
            const file = event.target.files[0];
            if (file) {
              fileFormik.setFieldValue("image", file);
            }
          }}
        />
        <label className="w-full bg-[#fbf4ea] p-4 rounded-md outline-none text-sm placeholder:text-[#9d7b4d] cursor-pointer">
          {defaultValue || "Choose File"}
          <span
            onClick={() => {
              document.querySelector('input[type="file"]').click();
            }}
          >
            {value}
          </span>
        </label>
      </div>
    );
  }

  return (
    <div className="w-full">
      <label htmlFor={name} className="block mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        className="w-full bg-[#fbf4ea] p-4 rounded-md outline-none text-sm placeholder:text-[#9d7b4d]"
        placeholder={placeholder}
        type={type ? type : "text"}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        min={minDate}
      />
    </div>
  );
};

export default Input;
