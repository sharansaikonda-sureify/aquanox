import { v4 as uuidv4 } from "uuid";

const customErrorCodesDefaultSchema = {
  condition: {
    response: {},
    status_codes: ["xxx"],
  },
  is_success: false,
  message: "",
  outgoing_status_code: 0,
};

export const defaultPayload = {
  body: {},
  ca_cert: "",
  cache_time: -1,
  clear_api_caches: [],
  client_data_source_uuid: uuidv4(),
  custom_error_codes: [customErrorCodesDefaultSchema],
  headers: [{ key: "Content-Type", value: "application/json" }],
  name: "",
  no_cache_keys: [],
  params: [],
  session_less: false,
  ssl_cert: ["", ""],
  type: "GET",
  url: "https://example.com",
};

export function ClientAPI({
  id,
  body = {},
  ca_cert = "",
  cache_time = -1,
  clear_api_caches = [],
  custom_error_codes = [],
  client_data_source_id,
  client_data_source_uuid = uuidv4(),
  headers = [],
  name = "",
  no_cache_keys = [],
  params = [],
  session_less,
  ssl_cert = ["", ""],
  type = "",
  url = "",
}) {
  this.name = name;
  this.type = type;
  this.url = url;

  this.ca_cert = ca_cert;
  this.id = id;
  this.client_data_source_uuid = client_data_source_uuid;
  this.client_data_source_id = client_data_source_id;
  this.cache_time = parseInt(cache_time);

  this.session_less = session_less;
  if (session_less === "true" || session_less === true) {
    this.session_less = "true";
  } else {
    this.session_less = "false";
  }

  this.body = body;
  if (!body) {
    this.body = "{}";
  } else if (typeof body == "object") {
    this.body = JSON.stringify(body);
  }

  this.clear_api_caches = clear_api_caches;
  if (!clear_api_caches) {
    this.clear_api_caches = "[]";
  } else if (Array.isArray(clear_api_caches)) {
    this.clear_api_caches = JSON.stringify(clear_api_caches);
  }

  this.custom_error_codes = custom_error_codes;
  if (!custom_error_codes) {
    this.custom_error_codes = "[]";
  } else if (Array.isArray(custom_error_codes)) {
    this.custom_error_codes = JSON.stringify(custom_error_codes);
  }

  this.headers = headers;
  if (!headers) {
    this.headers = "[]";
  } else if (Array.isArray(headers)) {
    this.headers = JSON.stringify(headers);
  }

  this.params = params;
  if (!params) {
    this.params = "[]";
  } else if (Array.isArray(params)) {
    this.params = JSON.stringify(params);
  }

  this.ssl_cert = ssl_cert;
  if (!ssl_cert) {
    this.ssl_cert = '["", ""]';
  } else if (Array.isArray(ssl_cert)) {
    this.ssl_cert = JSON.stringify(ssl_cert);
  }

  this.no_cache_keys = no_cache_keys;
  if (!no_cache_keys) {
    this.no_cache_keys = "[]";
  } else if (Array.isArray(no_cache_keys)) {
    this.no_cache_keys = JSON.stringify(no_cache_keys);
  }

  this.getPostMappings = () => {
    return {
      ca_cert: this.ca_cert,
      cache_time: this.cache_time,
      client_data_source_uuid: this.client_data_source_uuid,

      body: JSON.parse(this.body),
      clear_api_caches: JSON.parse(this.clear_api_caches),
      custom_error_codes: JSON.parse(this.custom_error_codes),
      headers: JSON.parse(this.headers),
      no_cache_keys: JSON.parse(this.no_cache_keys),
      params: JSON.parse(this.params),
      ssl_cert: JSON.parse(this.ssl_cert),
      session_less: this.session_less === "true" ? true : false,

      name: this.name,
      type: this.type,
      url: this.url,
    };
  };

  this.getPutMappings = () => {
    return {
      ca_cert: this.ca_cert,
      cache_time: this.cache_time,
      client_data_source_uuid: this.client_data_source_uuid,

      body: JSON.parse(this.body),
      clear_api_caches: JSON.parse(this.clear_api_caches),
      custom_error_codes: JSON.parse(this.custom_error_codes),
      headers: JSON.parse(this.headers),
      no_cache_keys: JSON.parse(this.no_cache_keys),
      params: JSON.parse(this.params),
      ssl_cert: JSON.parse(this.ssl_cert),
      session_less: this.session_less === "true" ? true : false,

      name: this.name,
      type: this.type,
      url: this.url,
    };
  };
}
