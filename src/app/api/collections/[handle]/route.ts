import { NextRequest, NextResponse } from "next/server"
import { initialize as initializeProductModule } from "@medusajs/product"
import { ProductCollectionDTO } from "@medusajs/types/dist/product"
import { notFound } from "next/navigation"
import getPrices from "@lib/util/get-product-prices"

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, any> }
) {
  const productService = await initializeProductModule()

  const { handle } = params

  const searchParams = Object.fromEntries(request.nextUrl.searchParams)
  const { page, limit, cart_id } = searchParams

  const collections = await productService.listCollections()

  const collectionsByHandle = new Map<string, ProductCollectionDTO>()

  for (const collection of collections) {
    collectionsByHandle.set(collection.handle, collection)
  }

  const collection = collectionsByHandle.get(handle)

  if (!collection) {
    return notFound()
  }

  const count = collection.products?.length || 0

  const { products, ...collectionMeta } =
    await productService.retrieveCollection(collection.id, {
      relations: [
        "products",
        "products.variants",
        "products.variants.options",
        "products.tags",
      ],
      take: parseInt(limit) || 100,
      skip: parseInt(page) || 0,
    })

  if (!products) {
    return notFound()
  }

  const productsWithPrices = await getPrices(products, cart_id)

  const nextPage = parseInt(page) + parseInt(limit)

  return NextResponse.json({
    collection: collectionMeta,
    response: {
      products: productsWithPrices,
      count,
    },
    nextPage: count > nextPage ? nextPage : null,
  })
}
