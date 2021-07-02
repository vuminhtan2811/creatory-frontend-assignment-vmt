import React from "react";
import BackIcon from "../../assets/images/back-icon.png";
import { conf } from "./conf";
import "./detail.css";

function EmployeeDetail({ data }) {
  const renderBlockEle = () => {
    Object.keys(conf).map(function (key) {
      return (
        <div className="block">
          <span className="label">{conf[key].name}</span>
          <span className="value">{data[conf[key]]}</span>
        </div>
      );
    });
  };

  return (
    <div className="detail-employee">
      <div className="header">
        <img src={BackIcon} className="back-icon" alt="back icon" />
        <h3>Employee ID: {data?.id}</h3>
      </div>
      <div className="employee-content">{renderBlockEle()}</div>
    </div>
  );
}

EmployeeDetail.defaultProps = {
  data: {},
};

export default EmployeeDetail;
