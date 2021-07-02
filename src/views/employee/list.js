import React, { useState } from "react";
import { conf } from "./conf";
import Table from "../../components/DataGrid";
import { fetchEmployees } from "../../services/employee/index";
import "./index.css";

function Employee(props) {
  const [items, setItems] = useState([]);
  const [listRequested, setListRequested] = useState(false);
  const [error, setError] = useState();
  const [pagination, setPagination] = useState({});
  const title = "Employee List";
  const history = props.history;

  const get = (params) => {
    setListRequested(true);
    fetchEmployees(params)
      .then((res) => {
        setItems(res.data.employees);
        setPagination(res.data.pagination);
      })
      .catch((e) => setError(e))
      .finally(() => setListRequested(false));
  };

  return (
    <div className="employee-wrapper">
      <Table
        // detailPath="/employee" /** use if have api get resource detail. */
        {...{
          conf,
          error,
          listRequested,
          items,
          title,
          get,
          history,
          pagination,
        }}
      />
    </div>
  );
}

export default Employee;
