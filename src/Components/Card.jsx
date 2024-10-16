import React from "react";

export default function Card({ children, css }) {
  return (
    <div
      className={`${css} bg-white border rounded-md shadow-[0_0px_2px_2px_rgba(0,0,0,0.2)]`}
    >
      {children}
    </div>
  );
}
