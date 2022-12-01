import { useTranslation } from "react-i18next"
import { createContext, useEffect } from "react"

interface I18nContext {
  locale: string | null
}

export const I18nContext = createContext<I18nContext | null>(null)

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const { locale, i18n } = useTranslation()
  useEffect(() => console.log(locale, i18n), [locale, i18n])
  return (
    <I18nContext.Provider value={{ locale }}>{children}</I18nContext.Provider>
  )
}
