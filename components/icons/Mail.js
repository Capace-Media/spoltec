import * as React from "react";

const SvgMail = (props) => (
  <svg
    width={51}
    height={42}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M51 5.25C51 2.362 48.705 0 45.9 0H5.1C2.295 0 0 2.362 0 5.25v31.5C0 39.638 2.295 42 5.1 42h40.8c2.805 0 5.1-2.362 5.1-5.25V5.25Zm-5.1 0L25.5 18.375 5.1 5.25h40.8Zm0 31.5H5.1V10.5l20.4 13.125L45.9 10.5v26.25Z"
      fill="#FC8512"
    />
  </svg>
);

export default SvgMail;
