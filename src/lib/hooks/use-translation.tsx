
const { I18n } = require("i18n-js/dist/require/index");
import { useEffect, useCallback, useState } from "react";
import en from "@locales/en.json";
import vi from "@locales/vi.json";
import { localeDefault, localeSupports, localeKey, localeMaps } from "@lib/config";

const i18n = new I18n({
  en: en,
  vi: vi
});

const useTranslation = () => {
  const [locale, setLocale] = useState<string>(localeDefault)

  const setLanguage = (locale: string) => {
    i18n.locale = locale
  }

  const getCurrentLocale = () => i18n.locale

  const t = useCallback( (scope: string | string[], options? :any) => i18n.t(scope, options), [])

  useEffect( () => { setLanguage(locale) },[locale])

  useEffect( () => {
    setLocale( localStorage?.getItem(localeKey) || localeDefault)
    i18n.onChange(() => {
      localStorage.setItem(localeKey, i18n.locale)
    });
  },[])

  return {
    //...i18n,
    locale,
    i18n,
    localeSupports,
    localeMaps,
    localeDefault,
    t,
    setLanguage,
    getCurrentLocale,
    setLocale
  }
};
  
export default useTranslation
  