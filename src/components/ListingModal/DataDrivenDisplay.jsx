import React from "react";
import Contact from "./Contact";
import OverviewDetail from "./Overview";
const meta = require("./metadata.json");

const DataDrivenDisplay = (props) => {
  const { data, onScroll } = props;

  const categoryObj = meta.reduce((obj, item) => {
    if (!obj[item.category]) {
      obj[item.category] = { title: item.category, items: [] };
    }
    obj[item.category].items.push({
      unifiedName:
        process.env.REACT_APP_API_DETAIL_VERSION === 1 ?
          item.unifiedName :
          item.standardName || item.longName,
      longName: item.longName
    });
    return obj;
  }, {});

  return (
    <div className="detailMain" onScroll={onScroll}>
      <OverviewDetail data={data} />
      <Contact data={data} />
      {Object.keys(categoryObj).map((categoryName) => (
        <div className="detailItem" key={categoryName}>
          <div className="itemOne">
            <div className="itemTitle">{categoryObj[categoryName].title}</div>
            <div className="mb1">
              {categoryObj[categoryName].items.map((item, index) => {
                const { unifiedName, longName } = item;

                return data[categoryName] && data[categoryName][unifiedName] && (
                  <div key={index}>
                    <span className="w50" style={{ overflowWrap: "break-word" }}>
                      {longName}
                    </span>
                    :{" "}
                    <span className="font500" style={{ overflowWrap: "break-word" }}>
                      {data[categoryName][unifiedName]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};
export default DataDrivenDisplay;