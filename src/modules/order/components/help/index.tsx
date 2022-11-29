import useTranslation from "@lib/hooks/use-translation"
import Link from "next/link"
import React from "react"

const Help = () => {
  const { t } = useTranslation()
  return (
    <div>
      <h2 className="text-base-semi">{ t('NeedHelp') }</h2>
      <div className="text-base-regular my-2">
        <ul className="gap-y-2 flex flex-col">
          <li>
            <Link href="/contact" legacyBehavior>
              { t('Contact') }
            </Link>
          </li>
          <li>
            <Link href="/contact" legacyBehavior>
              { t('ReturnsAndExchanges') }
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Help
