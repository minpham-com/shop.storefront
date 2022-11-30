import useTranslation from "@lib/hooks/use-translation"
import { createContext } from "react"

interface I18nContext {
  locale: string | null
}

export const I18nContext = createContext<I18nContext | null>(
  null
)

export const I18nProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { locale } = useTranslation()
  return (
    <I18nContext.Provider
      value={{ locale }}
    >
      {children}
    </I18nContext.Provider>
  )
}
