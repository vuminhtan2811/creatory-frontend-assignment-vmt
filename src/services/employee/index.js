import { API } from "../../utils/api";
import { API_ENDPOINT } from "../../constants/endpoint";
import { stringifyUrl } from "query-string";

export const fetchEmployees = (params) => {
  return new Promise((resolve, reject) => {
    API.get(
      stringifyUrl(
        { url: API_ENDPOINT.employees.list, query: params },
        { skipEmptyString: true, skipNull: true }
      )
    )
      .then((response) => {
        resolve(response);
      })
      .catch((e) =>
        reject(
          e?.error?.message ?? { message: "Can't get employees", error: true }
        )
      );
  });
};
