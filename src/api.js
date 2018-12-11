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

export const sections = [
  "food",
  "drinks",
  "coffee",
  "shops",
  "arts",
  "outdoors",
  "sights",
  "trending"
];

export function extractItemsOrderedByClosest({ groups = [] }) {
  return []
    .concat(...groups.map(g => g.items))
    .sort((a, b) => a.venue.location.distance - b.venue.location.distance);
}

export async function explore({ latitude = 0, longitude = 0, ...rest }) {
  const params = {
    limit: 25,
    ll: `${latitude}, ${longitude}`,
    ...rest
  };
  const searchParams = new URLSearchParams(params);

  return api.get("venues/explore", {
    searchParams: mergeClientParams(searchParams)
  });
}
