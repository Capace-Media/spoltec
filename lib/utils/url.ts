const BASE_URL = "https://www.spoltec.se";

export function absoluteUrl(path = "/") {
  return `${BASE_URL}${path}`;
}
