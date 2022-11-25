import { medusaClient } from "@lib/config"
import CollectionTemplate from "@modules/collections/templates"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import SkeletonCollectionPage from "@modules/skeletons/templates/skeleton-collection-page"
import { useRouter } from "next/router"
import { ReactElement } from "react"
import { useQuery } from "@tanstack/react-query"
import { NextPageWithLayout, PrefetchedPageProps } from "@type/global"

const fetchCollection = async (id: string) => {
  return await medusaClient.collections.retrieve(id).then(({ collection }) => ({
    id: collection.id,
    title: collection.title,
  }))
}

export const fetchCollectionProducts = async ({
  pageParam = 0,
  id,
  cartId,
}: {
  pageParam?: number
  id: string
  cartId?: string
}) => {
  const { products, count, offset } = await medusaClient.products.list({
    limit: 12,
    offset: pageParam,
    collection_id: [id],
    cart_id: cartId,
  })

  return {
    response: { products, count },
    nextPage: count > offset + 12 ? offset + 12 : null,
  }
}

const CollectionPage: NextPageWithLayout<PrefetchedPageProps> = ({
  notFound,
}) => {
  const { query } = useRouter()
  const id = typeof query.id === "string" ? query.id : ""

  const { data, isError, isLoading } = useQuery(
    ["get_collection", id],
    () => fetchCollection(id)
  )

  return (
    <>
      <Head
        title={data?.title || ""}
        description={`${data?.title} collection`}
      />
      {isError || isLoading || !data ? (
        <SkeletonCollectionPage />
      ) : (
        <CollectionTemplate collection={data} />
      )}
    </>
  )
}

CollectionPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

/*
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const ids = await getCollectionIds()

  return {
    paths: ids.map((id) => ({ params: { id } })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = new QueryClient()
  const id = context.params?.id as string

  await queryClient.prefetchQuery(["get_collection", id], () =>
    fetchCollection(id)
  )

  await queryClient.prefetchInfiniteQuery(
    ["get_collection_products", id],
    ({ pageParam }) => fetchCollectionProducts({ pageParam, id }),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  )

  const queryData = await queryClient.getQueryData([`get_collection`, id])

  if (!queryData) {
    return {
      props: {
        notFound: true,
      },
    }
  }

  return {
    props: {
      // Work around see – https://github.com/TanStack/query/issues/1458#issuecomment-747716357
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      notFound: false,
    },
  }
}
*/
export default CollectionPage
