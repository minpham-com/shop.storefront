import Medusa from "@medusajs/medusa-js"
import { QueryClient } from "react-query"

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
const localeSupports = ["vi", "en"];
const localeDefault = process.env.LOCALE_DEFAULT || 'en'
export { MEDUSA_BACKEND_URL, queryClient, medusaClient, localeSupports, localeDefault }
