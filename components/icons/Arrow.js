import * as React from "react";

const SvgArrow = (props) => (
  <svg
    width={49}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M48.707 8.707a1 1 0 0 0 0-1.414L42.343.929a1 1 0 1 0-1.414 1.414L46.586 8l-5.657 5.657a1 1 0 0 0 1.414 1.414l6.364-6.364ZM0 9h48V7H0v2Z"
      fill="#FC8512"
    />
  </svg>
);

export default SvgArrow;
