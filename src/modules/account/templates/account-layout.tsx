import { useAccount } from "@lib/context/account-context"
import { useTranslation } from "react-i18next"
import UnderlineLink from "@modules/common/components/underline-link"
import Spinner from "@modules/common/icons/spinner"
import React, { useEffect } from "react"
import AccountNav from "../components/account-nav"

const AccountLayout: any = ({ children } :any) => {
  const { customer, retrievingCustomer, checkSession } = useAccount()
  const { t } = useTranslation()
  useEffect(() => {
    checkSession()
  }, [checkSession])

  if (retrievingCustomer || !customer) {
    return (
      <div className="flex items-center justify-center w-full min-h-[640px] h-full text-gray-900">
        <Spinner size={36} />
      </div>
    )
  }

  return (
    <div className="flex-1 small:py-12 small:bg-gray-50">
      <div className="flex-1 h-full max-w-5xl mx-auto bg-white flex flex-col">
        <div className="grid grid-cols-1 small:grid-cols-[240px_1fr] small:px-8 py-6 small:py-12 ">
          <div>
            <AccountNav />
          </div>
          <div className="flex-1">{children}</div>
        </div>
        <div className="flex flex-col small:flex-row items-end justify-between small:border-t border-gray-200 px-8 py-12 gap-x-8">
          <div>
            <h3 className="text-xl-semi mb-4">{ t('GotQuestions') }</h3>
            <span className="text-small-regular">
              { t('YouCanFindFrequentlyAskedQuestionsAndAnswersOnOurCustomerServicePage') }
            </span>
          </div>
          <div>
            <UnderlineLink href="/customer-service">
              { t('CustomerService') }
            </UnderlineLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
