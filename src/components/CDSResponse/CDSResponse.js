import React from "react";
import ReactJson from "react-json-view";

const CDSResponse = ({ data }) => {
  return (
    <ReactJson
      src={data}
      collapsed={true}
      theme="twilight"
      displayDataTypes={false}
      enableClipboard={true}
    />
  );
};

export default CDSResponse;
