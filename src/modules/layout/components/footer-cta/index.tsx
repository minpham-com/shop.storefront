import { useTranslation } from "react-i18next"
import UnderlineLink from "@modules/common/components/underline-link"
import Image from "next/image"

const FooterCTA = () => {
  const { t } = useTranslation()
  return (
    <div className="bg-amber-100 w-full">
      <div className="content-container flex flex-col-reverse gap-y-8 small:flex-row small:items-center justify-between py-16 relative">
        <div>
          <h3 className="text-2xl-semi">{ ('ShopTheLatestStyles') }</h3>
          <div className="mt-6">
            <UnderlineLink href="/store"><>{ t('ExploreProducts') }</></UnderlineLink>
          </div>
        </div>

        <div className="relative w-full aspect-square small:w-[35%] small:aspect-[28/36]">
          <Image
            fill
            style={{ objectFit: "cover" }}
            src="/cta_three.jpg"
            alt=""
            className="absolute inset-0"
          />
        </div>
      </div>
    </div>
  )
}

export default FooterCTA
