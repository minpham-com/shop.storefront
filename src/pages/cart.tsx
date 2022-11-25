import useTranslation from "@lib/hooks/use-translation"
import CartTemplate from "@modules/cart/templates"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"

const Cart: NextPageWithLayout = () => {
  const { t } = useTranslation()
  
  return (
    <>
      <Head title={ t("ShoppingBag") } description={ t("CartPageDescription") } />
      <CartTemplate />
    </>
  )
}

Cart.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Cart
