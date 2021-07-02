import { STATUS } from "../../constants/status";

export const conf = [
  {
    name: "First Name",
    field: "firstName",
    type: "text",
    titleStyle: {
      width: "129px",
    },
  },
  {
    name: "Last Name",
    field: "lastName",
    type: "text",
  },
  {
    name: "Age",
    field: "age",
    type: "text",
    hidden: true,
    color: {
      field: "eyeColor",
      default: "blue",
    },
  },
  {
    name: "Gender",
    field: "gender",
    type: "text",
  },
  {
    name: "Email",
    field: "email",
    type: "email",
    titleStyle: {
      width: "261px",
    },
  },
  {
    name: "Phone",
    field: "phone",
    type: "phone",
    titleStyle: {
      width: "136px",
    },
  },
  {
    name: "Registered Time",
    field: "registered",
    type: "datetime",
  },
  {
    name: "Status",
    field: "isActive",
    type: "badge",
    dataSource: STATUS,
  },
  {
    name: "Latitude",
    field: "latitude",
    type: "number",
    hidden: true,
  },
  {
    name: "Longitude",
    field: "longitude",
    type: "number",
    hidden: true,
  },
  {
    name: "Tags",
    field: "tags",
    type: "tag",
    hidden: true,
  },
  {
    name: "About",
    field: "about",
    type: "text",
    hidden: true,
  },
];
