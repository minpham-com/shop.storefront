import useTranslation from "@lib/hooks/use-translation"
import { Payment, PaymentStatus } from "@medusajs/medusa"

type PaymentDetailsProps = {
  payments: Payment[]
  paymentStatus: PaymentStatus
}

const PaymentDetails = ({ payments, paymentStatus }: PaymentDetailsProps) => {
  const { t } = useTranslation()
  return (
    <div>
      <h2 className="text-base-semi">{ t('Payment') }</h2>
      <div className="my-2">
        {payments.map((p) => {
          switch (p.provider_id) {
            case "stripe":
              return <StripeDetails key={p.id} payment={p} />
            case "paypal":
              return <PayPalDetails key={p.id} />
            case "manual":
              return <TestDetails key={p.id} />
            default:
              return null
          }
        })}
      </div>
    </div>
  )
}

const PayPalDetails = () => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col text-base-regular">
      <span className="text-small-regular text-gray-700">{ t('PayPal') }</span>
      <span>{ t('PayPalPayment') }</span>
    </div>
  )
}

const StripeDetails = ({ payment }: { payment: Payment }) => {
  const card: {
    brand: string
    last4: string
    exp_year: number
    exp_month: number
  } = (payment.data.charges as any).data[0].payment_method_details.card

  return (
    <div className="flex flex-col text-base-regular">
      <span className="text-small-regular text-gray-700">
        {card.brand.substring(0, 1).toUpperCase()}
        {card.brand.substring(1)}
      </span>
      <span>************{card.last4}</span>
      <span>
        {card.exp_month > 9 ? card.exp_month : `0${card.exp_month}`} /{" "}
        {card.exp_year.toString().slice(2)}
      </span>
    </div>
  )
}

const TestDetails = () => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col text-base-regular">
      <span className="text-small-regular text-gray-700">{ t('Test') }</span>
      <span>{ ('TestPayment') }</span>
    </div>
  )
}

export default PaymentDetails
