import useTranslation from "@lib/hooks/use-translation"
import CheckoutTemplate from "@modules/checkout/templates"
import Head from "@modules/common/components/head"

const Checkout = () => {
  const { t } = useTranslation()
  return (
    <>
      <Head title={ t("Checkout") } />
      <CheckoutTemplate />
    </>
  )
}

export default Checkout
