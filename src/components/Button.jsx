import React from "react";

const Button = ({children,className, ...rest}) => {
  return (
    <button
    {...rest}
     className={`w-fit text-white py-3 px-8 border border-zinc-200 ${className}`}>
      {children}
    </button>
  );
};

export default Button;
