import React from "react";
import "./index.css";

function Badge({ dataSource }) {
  return (
    <span className={`badge-${dataSource.color}`}>{dataSource?.label}</span>
  );
}

export default Badge;
