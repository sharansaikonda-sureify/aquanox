const constants = {
  BASE_URL: "http://localhost:8080",
  PLUTO_PATH: "/api/v1/pluto",
  SUREIFY_OBJECT_MAPPINGS: "/sureify-object-mappings",
  CLIENT_APIS: "/client-apis",
  CLIENT_DATA_SOURCE_ID: "client_data_source_id",
  SOM_URL: function () {
    return this.BASE_URL + this.PLUTO_PATH + this.SUREIFY_OBJECT_MAPPINGS;
  },
  CLIENT_APIS_URL: function () {
    return this.BASE_URL + this.PLUTO_PATH + this.CLIENT_APIS;
  },
  MAPPINGS_DATA_TYPE: ["array", "string", "object", "number", "generic"],
  MAPPINGS_FIELD_SOURCE: [
    "url",
    "input",
    "auth.id",
    "auth.access",
    "claims",
    "extra",
    "response",
    "other",
  ],
  MAPPINGS_TXN_SOURCE: [
    "req_url",
    "req_headers",
    "req_params",
    "req_body",
    "req_file",
    "res",
    "res_dl",
  ],
  MAPPINGS_SESSION_LESS: ["true", "false"],
};

export default constants;
