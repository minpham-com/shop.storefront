import useTranslation from "@lib/hooks/use-translation"
import { Cart } from "@medusajs/medusa"
import Button from "@modules/common/components/button"
import CartTotals from "@modules/common/components/cart-totals"
import Link from "next/link"

type SummaryProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
}

const Summary = ({ cart }: SummaryProps) => {
  const { t } = useTranslation()
  return (
    <div className="grid grid-cols-1 gap-y-6">
      <CartTotals cart={cart} />
      <Link href="/checkout" legacyBehavior>
        <Button>{ t('GoToCheckout') }</Button>
      </Link>
    </div>
  )
}

export default Summary
