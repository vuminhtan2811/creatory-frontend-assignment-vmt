import React, { useEffect } from "react";
import Proptypes from "prop-types";
import { parse, stringify } from "query-string";
import Cell from "./Cell";
import CellHead from "./CellHead";
import Loader from "../../containers/common/loading";
import Pagination from "../blocks/pagination";
import "./index.css";

function DataGrid(props) {
  let unlisten;

  const defaultSearch = {
    limit: 15,
    page: 1,
    ...props.defaultSearch,
  };
  const renderRightHeader = () => {};

  const fetchItems = (params) => {
    return props.get?.(params);
  };

  const setupEvenHookDetectRouterChange = () => {
    if (!props.history) return;
    unlisten = props.history?.listen((location, action) => {
      if (location.state === "search") {
        let params = parse(location.search);
        fetchItems(params);
      }
    });
  };

  const onSearchStart = (search = {}, replace = false) => {
    if (!props.history) return;
    const location = {
      search: stringify({ ...(search ?? {}) }),
      state: "search",
    };
    if (replace) props.history.replace(location);
    else props.history.push(location);
  };

  const onSearchChanged = (obj, isForceUpdate) => {
    // Merge page number into current search
    const newQueryParams = !isForceUpdate
      ? Object.assign({}, defaultSearch, obj)
      : obj;
    onSearchStart(newQueryParams);
  };

  useEffect(() => {
    // Merge page number into current search
    const queryParam = Object.assign({}, defaultSearch, {
      ...parse(props.history?.location.search ?? ""),
    });
    setupEvenHookDetectRouterChange();
    onSearchStart(queryParam, true);
  }, []);

  const renderHeadRow = () => {
    return (
      <>
        {props.conf.map((pName) => {
          if (pName.hidden) return null;
          return <CellHead key={pName.field} name={pName.name} {...pName} />;
        })}
      </>
    );
  };

  const onRowClicked = (item, key) => {
    if (props.detailPath) {
      return props.history.push(`${props.detailPath}/${item.id}`);
    }
  };

  const renderTableRow = (item = {}) => {
    return (
      <>
        {props.conf?.map((pName) => {
          if (pName.hidden) return null;
          return <Cell key={pName.field} data={item} conf={pName} />;
        })}
      </>
    );
  };

  const renderNoData = () => {
    if (!props.items.length && !props.listRequested) {
      return <h3 className="text-center nodata">No data...</h3>;
    }
  };

  const renderContent = () => {
    if (props.items.length) {
      return props.items.map((item, key) => (
        <tr key={key} onClick={() => onRowClicked(item, key)}>
          {renderTableRow(item)}
        </tr>
      ));
    }
  };

  return (
    <section className={`data-grid section ${props.extClass ?? ""}`}>
      <div className="card">
        <header className="card-header mb-20 d-flex is-align-items-center">
          {props?.title && (
            <h3 className="card-header-props?.title">{props.title}</h3>
          )}
          {renderRightHeader()}
        </header>
        <div className="card-content">
          <div className="table-container">
            <table className="table is-hoverable ">
              <thead>
                <tr>{renderHeadRow()}</tr>
              </thead>
              <tbody>
                {props.listRequested && <Loader />}
                {renderContent()}
              </tbody>
            </table>
            {renderNoData()}
          </div>
          <Pagination
            onSearchChanged={onSearchChanged}
            pagination={props.pagination}
            limit={Number(props?.pagination?.limit)}
          />
        </div>
      </div>
    </section>
  );
}

DataGrid.defaultProps = {
  listRequested: false,
  items: [],
  error: {},
  extClass: "",
  conf: [],
  title: "",
  get: undefined,
  defaultSearch: {},
  detailPath: "",
};

DataGrid.propTypes = {
  listRequested: Proptypes.bool,
  items: Proptypes.array.isRequired,
  error: Proptypes.any,
  extClass: Proptypes.string,
  conf: Proptypes.arrayOf(Object),
  title: Proptypes.string,
  get: Proptypes.func,
  defaultSearch: Proptypes.object,
  detailPath: Proptypes.string,
};
export default DataGrid;
