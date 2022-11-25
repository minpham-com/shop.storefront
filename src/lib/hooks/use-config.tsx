import {
  MEDUSA_BACKEND_URL, queryClient, medusaClient, localeSupports, localeDefault, localeKey, localeMaps, unsplashCollectionId
} from '@lib/config'

const useConfig = () => {
  return {
    MEDUSA_BACKEND_URL, queryClient, medusaClient, localeSupports, localeDefault, localeKey, localeMaps, unsplashCollectionId
  }
}
export default useConfig
