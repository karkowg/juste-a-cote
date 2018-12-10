import ky from "ky";

const clientParams = new URLSearchParams();

clientParams.set("client_id", process.env.VUE_APP_FSQ_CLIENT_ID);
clientParams.set("client_secret", process.env.VUE_APP_FSQ_CLIENT_SECRET);
clientParams.set("v", process.env.VUE_APP_FSQ_VERSION);

const api = ky.extend({
  prefixUrl: process.env.VUE_APP_FSQ_BASE_URI
});

function mergeClientParams(searchParams) {
  for (const [key, value] of clientParams) {
    searchParams.append(key, value);
  }

  return searchParams;
}

export async function explore({
  latitude = 0,
  longitude = 0,
  radius = 250,
  section = "trending"
}) {
  const params = {
    limit: 10,
    ll: `${latitude}, ${longitude}`,
    radius,
    section
  };
  const searchParams = new URLSearchParams(params);

  return api.get("venues/explore", {
    searchParams: mergeClientParams(searchParams)
  });
}
