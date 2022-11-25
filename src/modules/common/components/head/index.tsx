import NextHead from "next/head"
import React from "react"
import { useTranslation } from "react-i18next"

type HeadProps = {
  title?: string
  description?: string | null
  image?: string | null
}

const Head: React.FC<HeadProps> = ({ title, description, image }) => {
  const { t } = useTranslation()
  return (
    <NextHead>
      <title>
        {title ? `${title} | ${t("AppName")}` : t("AppName") }
      </title>
      <meta itemProp="name" content={title} />
      {description && <meta itemProp="description" content={description} />}
      {image && <meta itemProp="image" content={image} />}
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  )
}

export default Head
