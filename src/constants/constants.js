const constants = {
  BASE_URL: "http://localhost:8080",
  PLUTO_PATH: "/api/v1/pluto",
  SUREIFY_OBJECT_MAPPINGS: "/sureify-object-mappings",
  CLIENT_APIS: "/client-apis",
  CLIENT_DATA_SOURCE_ID: "client_data_source_id",
  SOM_URL: function () {
    this.BASE_URL =
      localStorage.getItem("tokens") == null
        ? "http://localhost:8080"
        : JSON.parse(localStorage.getItem("tokens"))["base_url"];
    return this.BASE_URL + this.PLUTO_PATH + this.SUREIFY_OBJECT_MAPPINGS;
  },
  CLIENT_APIS_URL: function () {
    this.BASE_URL =
      localStorage.getItem("tokens") == null
        ? "http://localhost:8080"
        : JSON.parse(localStorage.getItem("tokens"))["base_url"];
    return this.BASE_URL + this.PLUTO_PATH + this.CLIENT_APIS;
  },
  MAPPINGS_DATA_TYPE: [
    "array",
    "string",
    "object",
    "number",
    "generic",
    "boolean",
  ],
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
    "email_global",
    "email_sender",
    "email_sendername",
    "email_recipient",
    "email_cc",
    "email_bcc",
    "email_subject",
    "email_body",
    "email_attachment",
    "email_attachment_content",
  ],
  MAPPINGS_SESSION_LESS: ["true", "false"],
  MAPPINGS_HTTP_VERBS: ["GET", "POST", "PUT", "DELETE", "PATCH", "DELETE"],
};

export default constants;
