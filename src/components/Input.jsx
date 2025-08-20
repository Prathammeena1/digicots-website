import React from 'react'


const Input = ({ type, name, placeholder, value, onChange, className, required }) => {
  const commonClasses = "w-full bg-transparent border-0 pointer-events-auto border-b pb-8 border-zinc-600 py-2 text-2xl placeholder-zinc-600 font-semibold focus:outline-none focus:border-gray-400 transition-colors";

  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={commonClasses + " " + className}
      required={required}
    />
  );
}

export default Input