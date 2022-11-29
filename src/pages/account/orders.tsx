import useTranslation from "@lib/hooks/use-translation"
import AccountLayout from "@modules/account/templates/account-layout"
import OrdersTemplate from "@modules/account/templates/orders-template"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { NextPageWithLayout } from "types/global"

const Orders: NextPageWithLayout = () => {
  const { t } = useTranslation()
  return (
    <>
      <Head title={ t("Orders") } description={ t("OverviewOfYourPreviousOrders") } />
      <OrdersTemplate />
    </>
  )
}

Orders.getLayout = (page) => {
  return (
    <Layout>
      <AccountLayout>{page}</AccountLayout>
    </Layout>
  )
}

export default Orders
