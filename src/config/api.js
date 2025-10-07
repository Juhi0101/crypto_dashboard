const BASE_URL =
  import.meta.env.MODE === "development"
    ? "/api"
    : "https://api.coingecko.com/api/v3";

export { BASE_URL };