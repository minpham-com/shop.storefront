import Head from "@modules/common/components/head"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"
import useTranslation from "@lib/hooks/use-translation"

const Home: NextPageWithLayout = () => {
  const { t } = useTranslation()

  return (
    <>
      <Head
        title={ t("Home") }
        description={ t("HomePageDescription") }
      />
      <Hero />
      <FeaturedProducts />
    </>
  )
}

Home.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Home
