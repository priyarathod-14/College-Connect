import React from "react";
export default function ProtectedMessage({ children }) {
  return <div className="alert alert-light border rounded-4">{children}</div>;
}