import { medusaClient } from "@lib/config"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import OrderDetailsTemplate from "@modules/order/templates/order-details-template"
import SkeletonOrderConfirmed from "@modules/skeletons/templates/skeleton-order-confirmed"
import { useRouter } from "next/router"
import { ReactElement } from "react"
import { useTranslation } from "react-i18next"
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
    ["get_order_details", id],
    () => fetchOrder(id),
    {
      enabled: id.length > 0,
      staleTime: 60 * 60 * 1000, // 1 hour
    }
  )

  return (
    <>
      <Head
        title={t("OrderId", { num: data?.display_id || "" })}
        description={t("ViewYourOrder")}
      />

      {isLoading || isError || !data ? (
        <SkeletonOrderConfirmed />
      ) : (
        <OrderDetailsTemplate order={data} />
      )}
    </>
  )
}

Confirmed.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Confirmed
