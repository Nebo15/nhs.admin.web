import i18n from "i18next";
import { LANG_COOKIE_NAME } from "config";

import uk from "../locales/uk.po";
import ru from "../locales/ru.po";
import en from "../locales/en.po";

const LanguageDetector = __CLIENT__
  ? require("i18next-browser-languagedetector")
  : require("i18next-express-middleware").LanguageDetector;

const service = i18n;
service.use(
  new LanguageDetector(null, {
    order: ["querystring", "cookie", "navigator", "htmlTag"],
    caches: ["cookie"],
    lookupCookie: LANG_COOKIE_NAME,
    lookupQuerystring: "lang"
  })
);

service.init({
  nsSeparator: false,
  keySeparator: false,
  fallbackLng: "uk",
  whitelist: ["uk", "ru", "en"],
  resources: {
    uk: {
      translation: uk
    },
    ru: {
      translation: ru
    },
    en: {
      translation: en
    }
  }
});

export default service;
