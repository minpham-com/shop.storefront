import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { useTranslation } from "react-i18next"
import { NextPageWithLayout, PrefetchedPageProps } from "types/global"

const TermsOfPage: NextPageWithLayout<PrefetchedPageProps> = ({ }) => {
  const { t } = useTranslation()
  return (
    <>
      <div className="w-full px-2 py-3 text-center">{t("TermsOfUse")}</div>
    </>
  )
}

TermsOfPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default TermsOfPage
