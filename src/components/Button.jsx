import React from "react";

const Button = ({children,className, ...rest}) => {
  return (
    <button
    {...rest}
     className={`w-fit dark:text-white py-3 px-8 border dark:border-zinc-200 border-zinc-700 ${className}`}>
      {children}
    </button>
  );
};

export default Button;
