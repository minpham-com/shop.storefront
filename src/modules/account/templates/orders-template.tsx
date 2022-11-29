import useTranslation from "@lib/hooks/use-translation"
import OrderOverview from "../components/order-overview"

const OrdersTemplate = () => {
  const { t } = useTranslation()
  return ( 
    <div className="w-full">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">{ t('Orders') }</h1>
        <p className="text-base-regular">
          { t('OrdersPageNote') }
        </p>
      </div>
      <div>
        <OrderOverview />
      </div>
    </div>
  )
}

export default OrdersTemplate
