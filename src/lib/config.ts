import Medusa from "@medusajs/medusa-js"
import { QueryClient } from "@tanstack/react-query"

// Defaults to standard port for Medusa server
const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24,
      retry: 1,
    },
  },
})

const medusaClient = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })
const localeSupports : string[] = ["vi", "en"];
const localeMaps: { [key: string] : any} = { vi : { name: "Việt Nam", flag: "vn", code: "vi" }, en: { name: "English", flag: "us", code: "en" } };

const localeDefault :string = process.env.LOCALE_DEFAULT || 'vi'
const localeKey :string = process.env.LOCALE_KEY || '__lang'
const unsplashCollectionId = process.env.UNSPLASH_COLLECTION_ID || '5039078'
export { MEDUSA_BACKEND_URL, queryClient, medusaClient, localeSupports, localeDefault, localeKey, localeMaps, unsplashCollectionId }
