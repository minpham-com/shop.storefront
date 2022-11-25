import { medusaClient } from "@lib/config"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import ProductTemplate from "@modules/products/templates"
import SkeletonProductPage from "@modules/skeletons/templates/skeleton-product-page"
import { useRouter } from "next/router"
import { ReactElement } from "react"
import { useQuery } from "@tanstack/react-query"
import { NextPageWithLayout, PrefetchedPageProps } from "types/global"

const fetchProduct = async (handle: string) => {
  return await medusaClient.products
    .list({ handle })
    .then(({ products }) => products[0])
}

const ProductPage: NextPageWithLayout<PrefetchedPageProps> = () => {
  const { query } = useRouter()
  const handle = typeof query.handle === "string" ? query.handle : ""

  const { data, isError, isLoading } = useQuery(
    [`get_product`, handle],
    () => fetchProduct(handle),
    {
      enabled: handle.length > 0,
      keepPreviousData: true,
    }
  )

  return (
    <>
      <Head
        description={data?.description}
        title={data?.title}
        image={data?.thumbnail}
      />
      {isLoading || isError || !data ? (
        <SkeletonProductPage />
      ) : (
        <ProductTemplate product={data} />
      )}
    </>
  )
}

ProductPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default ProductPage
