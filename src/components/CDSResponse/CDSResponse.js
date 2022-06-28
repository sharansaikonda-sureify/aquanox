import React from "react";
import ReactJson from "react-json-view";

const CDSResponse = ({ data }) => {
  return <ReactJson src={data} />;
};

export default CDSResponse;
