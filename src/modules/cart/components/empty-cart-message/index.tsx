import { useTranslation } from "react-i18next"
import UnderlineLink from "@modules/common/components/underline-link"

const EmptyCartMessage = () => {
  const { t } = useTranslation()
  return (
    <div className="bg-neutral-100 px-8 py-24 flex flex-col justify-center items-center text-center">
      <h1 className="text-2xl-semi">{t("YourShoppingBagIsEmpty")}</h1>
      <p className="text-base-regular mt-4 mb-6 max-w-[32rem]">
        {t("YourShoppingBagIsEmptyNote")}
      </p>
      <div>
        <UnderlineLink href="/store">
          <>{t("ExploreProducts")}</>
        </UnderlineLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
