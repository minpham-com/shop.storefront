import OrderCompletedTemplate from "@modules/order/templates/order-completed-template"
import { useOrder } from "medusa-react"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"

const OrderDetailsTemplate = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const { order } = router.query

  const { order: details, isLoading } = useOrder(order as string, {
    enabled: !!order,
  })

  if (isLoading || !details) {
    return <div>{t("Loading")}...</div>
  }

  return <OrderCompletedTemplate order={details} />
}

export default OrderDetailsTemplate
