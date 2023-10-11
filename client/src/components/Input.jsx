import React, { useRef, useState } from "react";

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

   const fileInputRef = useRef(null);
   const [selectedFileName, setSelectedFileName] = useState("");

   const handleFileChange = (event) => {
     const file = event.target.files[0];
     if (file) {
       fileFormik.setFieldValue("image", file);
       setSelectedFileName(file.name);
     } else {
       setSelectedFileName("");
     }
   };

   const handleFileButtonClick = () => {
     fileInputRef.current.click();
   };

  if (type === "file") {
    return (
      <div className="w-full">
        <label className="block mb-2 cursor-pointer">
          {label}
          <input
            ref={fileInputRef}
            className="hidden"
            name={name}
            id={name}
            type="file"
            onChange={handleFileChange}
          />
        </label>
        <button
          onClick={handleFileButtonClick}
          type="button"
          className="w-full bg-mainBackground bg-opacity-20 p-4 rounded-md outline-none text-sm text-secondaryBackground placeholder:text-secondaryBackground cursor-pointer"
        >
          {selectedFileName || "Choose File"}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <label htmlFor={name} className="block mb-2 font-syne">
        {label}
      </label>
      <input
        id={name}
        name={name}
        className="w-full bg-mainBackground bg-opacity-20 p-4 rounded-md outline-none text-sm placeholder:text-secondaryBackground"
        placeholder={placeholder}
        type={type ? type : "text"}
        defaultValue={defaultValue}
        onChange={onChange}
        onBlur={onBlur}
        min={minDate}
      />
    </div>
  );
};

export default Input;
