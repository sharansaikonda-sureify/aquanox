export const GetTokensData = () => {
  let tokens = localStorage.getItem("tokens");
  if (tokens) {
    tokens = JSON.parse(tokens);
  } else {
    tokens = {};
  }

  delete tokens.base_url;
  return tokens;
};
