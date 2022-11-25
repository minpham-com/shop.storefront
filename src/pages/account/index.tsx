import { useTranslation } from "react-i18next"
import AccountLayout from "@modules/account/templates/account-layout"
import OverviewTemplate from "@modules/account/templates/overview-template"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"

const Account: NextPageWithLayout = () => {
  const { t } = useTranslation()
  return (
    <>
      <Head
        title={t("Account")}
        description={t("OverviewOfYourAccountActivity")}
      />
      <OverviewTemplate />
    </>
  )
}

Account.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      <AccountLayout>{page}</AccountLayout>
    </Layout>
  )
}

export default Account
