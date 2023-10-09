import React from "react";

const Select = ({
  label,
  name,
  icon,
  option,
  onChange,
  defaultValue,
  onBlur,
}) => {
  return (
    <div className="w-full">
      <label className="block mb-2" htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        <select
          className="w-full bg-[#fbf4ea] p-4 rounded-md outline-none text-sm placeholder:text-[#9d7b4d]"
          name={name}
          id={name}
          onChange={onChange}
          defaultValue={defaultValue} // Use value instead of defaultValue
          onBlur={onBlur}
        >
          <option value="">{label}</option>
          {option.map((o) => (
            <option key={o._id} value={o._id}>
              {o.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
