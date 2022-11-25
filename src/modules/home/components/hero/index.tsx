import { useTranslation } from "react-i18next"
import UnderlineLink from "@modules/common/components/underline-link"
import Image from "next/image"
import useConfig from "@lib/hooks/use-config"

const Hero = () => {
  const { t } = useTranslation()
  const { unsplashCollectionId } = useConfig()
  return (
    <div className="h-[90vh] w-full relative">
      <div className="text-white absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:text-left small:justify-end small:items-start small:p-32">
        <h1 className="text-2xl-semi mb-4 drop-shadow-md shadow-black">
          Summer styles are finally here
        </h1>
        <p className="text-base-regular max-w-[32rem] mb-6 drop-shadow-md shadow-black">
          This year, our new summer collection will shelter you from the harsh
          elements of a world that doesn&apos;t care if you live or die.
        </p>
        <UnderlineLink href="/store">
          <>{t("ExploreProducts")}</>
        </UnderlineLink>
      </div>
      <Image
        src={ `https://source.unsplash.com/collection/${ unsplashCollectionId }/1200x600` }
        fill
        style={{ objectFit: "cover" }}
        loading="eager"
        priority={true}
        quality={90}
<<<<<<< HEAD
        alt="Photo by @unsplash"
=======
        alt="Photo by @thevoncomplex https://unsplash.com/@thevoncomplex"
>>>>>>> 36cea15 (Start develop)
        className="absolute inset-0"
        draggable="false"
      />
    </div>
  )
}

export default Hero
