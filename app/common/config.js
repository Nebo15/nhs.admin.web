let config = {};

if (__CLIENT__ && window && window.__CONFIG__) {
  try {
    config = JSON.parse(unescape(window.__CONFIG__));
  } catch (e) {}
}

export const PORT = config.PORT || process.env.PORT || 8080;
export const HOSTNAME =
  typeof window !== "undefined"
    ? window.location.origin
    : config.HOSTNAME || "http://localhost:8080";
export const API_HOST =
  config.API_HOST || process.env.API_HOST || "http://api.dev.asclepius.com.ua";
export const MOCK_API_HOST =
  "http://private-anon-8b83c175a2-ehealthapi1.apiary-mock.com";

export const SITEMAP_HOSTNAME =
  process.env.SITEMAP_HOSTNAME || "http://localhost:8080"; // used in sitemap
export const LANG_COOKIE_NAME = "lang";
export const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME || "authorization";

export const API_PROXY_PATH = "/api";
export const API_INTERNAL_PROXY = "/api-internal"; // For internal usage.
export const MOCK_API_PROXY_PATH = "/mock-api";

export const PUBLIC_INDEX_ROUTE = "/sign-in";
export const PRIVATE_INDEX_ROUTE = "/dashboard";

export const CLIENT_ID =
  config.CLIENT_ID ||
  process.env.CLIENT_ID ||
  "e32e51ac-f720-4e42-adb3-67d504f3ad30";
export const SCOPES = config.SCOPES || process.env.SCOPES || "";
export const OAUTH_URL =
  config.OAUTH_URL ||
  process.env.OAUTH_URL ||
  "http://auth.dev.asclepius.com.ua/sign-in";
export const SIGN_URL =
  config.SIGN_URL ||
  process.env.SIGN_URL ||
  "http://auth.dev.asclepius.com.ua/sign";
export const OAUTH_REDIRECT_PATH =
  config.OAUTH_REDIRECT_PATH ||
  process.env.OAUTH_REDIRECT_PATH ||
  "/auth/redirect";
export const OAUTH_REDIRECT_URL =
  config.OAUTH_REDIRECT_URL ||
  process.env.OAUTH_REDIRECT_URL ||
  `${HOSTNAME}${OAUTH_REDIRECT_PATH}`;

// for internal app usage. for example for XHR requests or server side rendering
export const API_URL =
  typeof window !== "undefined" ? API_PROXY_PATH : API_HOST;
export const MOCK_API_URL =
  typeof window !== "undefined" ? MOCK_API_PROXY_PATH : MOCK_API_HOST;
