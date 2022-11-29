const { I18n } = require("i18n-js/dist/require/index");

import en from "@locales/en.json";
import vi from "@locales/vi.json";
import { localeDefault } from "@lib/config";
const i18n = new I18n({
  en: en,
  vi: vi
});

i18n.defaultLocale = localeDefault;
i18n.locale = localeDefault;

const useTranslation = () => {
  
  const t = (scope: string | string[], options? :any) => i18n.t(scope, options)

  return {
    ...i18n,
    i18n,
    t
  }
};
  
  export default useTranslation
  