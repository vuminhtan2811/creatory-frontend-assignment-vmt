import React from "react";
import moment from "moment";
import Badge from "../blocks/badge";
import { DatetimeFormat } from "../../constants/date-time";

function Cell({ conf, data }) {
  switch (conf.type) {
    case "badge":
      return (
        <td>
          <Badge dataSource={conf.dataSource[data[conf.field]]} />
        </td>
      );
    case "datetime":
      return (
        <td>
          <td>{moment(data[conf.field]).format(DatetimeFormat)}</td>
        </td>
      );
    default:
      return <td>{data[conf.field]}</td>;
  }
}

export default Cell;
