import { formatAmount, useCart, useProducts } from "medusa-react"
import { useEffect, useMemo } from "react"
import { CalculatedVariant } from "types/medusa"

type useProductPriceProps = {
  id: string
  variantId?: string
}

const useProductPrice = ({ id, variantId }: useProductPriceProps) => {
  const { cart } = useCart()

  const { products, isLoading, isError, refetch } = useProducts(
    {
      id: id,
      cart_id: cart?.id,
    },
    { enabled: !!cart?.id && !!cart?.region_id }
  )

  useEffect(() => {
    if (cart?.region_id) {
      refetch()
    }
  }, [cart?.region_id, refetch])

  const product = products?.[0]

  const getPercentageDiff = (original: number, calculated: number) => {
    const diff = original - calculated
    const decrease = (diff / original) * 100

    return decrease.toFixed()
  }

  const cheapestPrice = useMemo(() => {
    if (!product || !product.variants?.length || !cart?.region) {
      return null
    }

    const variants = product.variants as unknown as CalculatedVariant[]

    const cheapestVariant = variants.reduce((prev, curr) => {
      return prev.calculated_price < curr.calculated_price ? prev : curr
    })

    if (!cheapestVariant) {
      return null
    }

    return {
      calculated_price: formatAmount({
        amount: cheapestVariant.calculated_price || 0,
        region: cart.region,
        includeTaxes: false,
      }),
      original_price: formatAmount({
        amount: cheapestVariant.original_price || 0,
        region: cart.region,
        includeTaxes: false,
      }),
      price_type: cheapestVariant.calculated_price_type || 'default',
      percentage_diff: getPercentageDiff(
        cheapestVariant.original_price || 0,
        cheapestVariant.calculated_price || 0
      ),
    }
  }, [product, cart?.region])

  const variantPrice = useMemo(() => {
    if (!product || !variantId || !cart?.region) {
      return null
    }

    const variant = product.variants.find(
      (v) => v.id === variantId || v.sku === variantId
    ) as unknown as CalculatedVariant

    if (!variant) {
      return null
    }

    return {
      calculated_price: formatAmount({
        amount: variant.calculated_price || 0 ,
        region: cart.region,
        includeTaxes: false,
      }),
      original_price: formatAmount({
        amount: variant.original_price || 0,
        region: cart.region,
        includeTaxes: false,
      }),
      price_type: variant.calculated_price_type || 'default',
      percentage_diff: getPercentageDiff(
        variant.original_price || 0,
        variant.calculated_price || 0
      ),
    }
  }, [product, variantId, cart?.region])

  return {
    product,
    cheapestPrice,
    variantPrice,
    isLoading,
    isError,
  }
}

export default useProductPrice
