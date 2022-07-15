import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tokens, setTokens] = useState({
    access_token: "",
    carrier_token: "",
    base_url: "http://localhost:8080",
  });

  useEffect(() => {
    if (localStorage.getItem("tokens") != null) {
      let tokens = JSON.parse(localStorage.getItem("tokens"));
      setTokens(tokens);
    }
  }, []);

  const navigate = useNavigate();

  const changeHandler = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    let newData = { ...tokens, [key]: value };
    setTokens(newData);
  };

  const updateTokens = () => {
    localStorage.setItem("tokens", JSON.stringify(tokens));
  };

  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col">
          <label className="form-label" htmlFor="base_url">
            Base URL
          </label>
        </div>
        <div className="col">
          <input
            placeholder="http://localhost:8080"
            onChange={(e) => {
              changeHandler(e);
            }}
            className=" form-control"
            type="text"
            name="base_url"
            value={tokens.base_url}
          />
        </div>
      </div>

      <div className="row mt-2">
        <div className="col">
          <label className="form-label" htmlFor="access_token">
            Access Token
          </label>
        </div>
        <div className="col">
          <input
            onChange={(e) => {
              changeHandler(e);
            }}
            className=" form-control"
            type="text"
            name="access_token"
            placeholder="Bearer `token`"
            value={tokens.access_token}
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col">
          <label className="form-label" htmlFor="carrier_token">
            Carrier Token
          </label>
        </div>
        <div className="col">
          <input
            onChange={(e) => {
              changeHandler(e);
            }}
            className=" form-control"
            type="text"
            name="carrier_token"
            value={tokens.carrier_token}
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col">
          <input
            onClick={updateTokens}
            className=" form-control btn-success"
            type="button"
            name="update_tokens"
            value="Update Tokens"
          />
        </div>
      </div>
      <div className="row mt-5">
        <div
          className="col boxbutton"
          onClick={() => {
            navigate("/clientapis");
          }}
        >
          Client APIs
        </div>
        <div
          className="col boxbutton"
          onClick={() => {
            navigate("/som");
          }}
        >
          Sureify Object Mappings
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
