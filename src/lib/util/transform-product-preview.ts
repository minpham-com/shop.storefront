import { getPercentageDiff } from "@lib/util/get-precentage-diff"
import { Product, Region } from "@medusajs/medusa"
import { formatAmount } from "medusa-react"
import { ProductPreviewType } from "types/global"
import { CalculatedVariant } from "types/medusa"

const transformProductPreview = (
  product: Product,
  region: Region
): ProductPreviewType => {
  const variants = product.variants as CalculatedVariant[]

  let cheapestVariant = undefined

  if (variants?.length > 0) {
    cheapestVariant = variants.reduce((acc, curr) => {
      if (acc.calculated_price > curr.calculated_price) {
        return curr
      }
      return acc
    }, variants[0])
  }

  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    thumbnail: product.thumbnail,
    price: {
      calculated_price: formatAmount({
        amount: cheapestVariant?.calculated_price || 0,
        region: region,
        includeTaxes: false,
      }),
      original_price: formatAmount({
        amount: cheapestVariant?.original_price || 0,
        region: region,
        includeTaxes: false,
      }),
      difference: getPercentageDiff(
        cheapestVariant?.original_price || 0,
        cheapestVariant?.calculated_price || 0
      ),
      price_type: cheapestVariant?.calculated_price_type || 'default',
    },
  }
}

export default transformProductPreview
