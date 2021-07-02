import React from "react";
function CellHead(props) {
  return <th style={props?.titleStyle}>{props.name}</th>;
}

export default CellHead;
