// Packages
import { axiosInstance as axios } from "../config/axiosConfig";

export const defaultPayload = {
  headers: '{"Content-Type": "application/json"}',
  params: "{}",
  body: "{}",
  url: "",
  method: "GET",
};

export function Request({
  headers = "{}",
  params = "{}",
  body = "{}",
  url = "",
  method = "GET",
}) {
  this.headers = headers;
  if (!headers) {
    this.headers = "{}";
  } else if (typeof headers == "object") {
    this.headers = JSON.stringify(headers);
  }

  this.params = params;
  if (!params) {
    this.params = "{}";
  } else if (typeof params == "object") {
    this.params = JSON.stringify(params);
  }

  this.body = body;
  if (!body) {
    this.body = "{}";
  } else if (typeof body == "object") {
    this.body = JSON.stringify(body);
  }

  this.url = url;
  this.method = method;

  this.getResponse = async (tokensData) => {
    try {
      delete tokensData.base_url;
      switch (this.method) {
        case "GET":
          return await this.getAPIResonse(tokensData);

        case "POST":
          return await this.postAPIResonse(tokensData);

        case "PUT":
          return await this.putAPIResonse(tokensData);

        case "PATCH":
          return await this.patchAPIResonse(tokensData);

        case "DELETE":
          return await this.deleteAPIResonse(tokensData);
        default:
          return {};
      }
    } catch (e) {
      alert("Some error occured");
      return {};
    }
  };

  this.getAPIResonse = async (tokensData) => {
    let newurl = this.url;
    let params = Object.entries(JSON.parse(this.params));
    for (let idx = 0; idx < params.length; idx++) {
      if (idx === 0) {
        newurl += "?";
      } else {
        newurl += "&";
      }

      newurl += params[idx][0] + "=" + params[idx][1];
    }

    return await axios.get(newurl, {
      headers: { ...JSON.parse(this.headers), ...tokensData },
    });
  };

  this.postAPIResonse = async (tokensData) => {
    return await axios.post(this.url, JSON.parse(this.body), {
      headers: { ...JSON.parse(this.headers), ...tokensData },
    });
  };

  this.patchAPIResonse = async (tokensData) => {
    return await axios.patch(this.url, JSON.parse(this.body), {
      headers: { ...JSON.parse(this.headers), ...tokensData },
    });
  };

  this.putAPIResonse = async (tokensData) => {
    return await axios.put(this.url, JSON.parse(this.body), {
      headers: { ...JSON.parse(this.headers), ...tokensData },
    });
  };

  this.deleteAPIResonse = async (tokensData) => {
    let newurl = this.url;
    let params = Object.entries(JSON.parse(this.params));
    for (let idx = 0; idx < params.length; idx++) {
      if (idx === 0) {
        newurl += "?";
      } else {
        newurl += "&";
      }

      newurl += params[idx][0] + "=" + params[idx][1];
    }

    return await axios.get(newurl, {
      headers: { ...JSON.parse(this.headers), ...tokensData },
    });
  };
}
