import { medusaClient } from "@lib/config"
import { useTranslation } from "react-i18next"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import OrderCompletedTemplate from "@modules/order/templates/order-completed-template"
import SkeletonOrderConfirmed from "@modules/skeletons/templates/skeleton-order-confirmed"
import { useRouter } from "next/router"
import { ReactElement } from "react"
import { useQuery } from "@tanstack/react-query"
import { NextPageWithLayout } from "@type/global"

const fetchOrder = async (id: string) => {
  return await medusaClient.orders.retrieve(id).then(({ order }) => order)
}

const Confirmed: NextPageWithLayout = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const id = typeof router.query?.id === "string" ? router.query.id : ""

  const { data, isLoading, isError } = useQuery(
    ["get_order_confirmed", id],
    () => fetchOrder(id),
    {
      enabled: id.length > 0,
      staleTime: Infinity,
    }
  )

  return (
    <>
      <Head
        title={t("OrderConfirmed")}
        description={t("YouPurchaseWasSuccessful")}
      />

      {isLoading || isError || !data ? (
        <SkeletonOrderConfirmed />
      ) : (
        <OrderCompletedTemplate order={data} />
      )}
    </>
  )
}

Confirmed.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Confirmed
