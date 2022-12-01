import { useTranslation } from "react-i18next"
import AccountLayout from "@modules/account/templates/account-layout"
import AddressesTemplate from "@modules/account/templates/addresses-template"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"

const Addresses: NextPageWithLayout = () => {
  const { t } = useTranslation()
  return (
    <>
      <Head title={ t("Addresses") } description={ t("ViewYourAddresses") } />
      <AddressesTemplate />
    </>
  )
}

Addresses.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      <AccountLayout>{page}</AccountLayout>
    </Layout>
  )
}

export default Addresses
