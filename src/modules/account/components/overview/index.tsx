import { useTranslation } from "react-i18next"
import { Customer, Order } from "@medusajs/medusa"
import ChevronDown from "@modules/common/icons/chevron-down"
import MapPin from "@modules/common/icons/map-pin"
import Package from "@modules/common/icons/package"
import User from "@modules/common/icons/user"
import EyeOff from "@modules/common/icons/eye-off"
import { formatAmount } from "medusa-react"
import Link from "next/link"
import { useAccount } from "@lib/context/account-context"

type OverviewProps = {
  orders?: Order[]
  customer?: Omit<Customer, "password_hash">
}

const Overview = ({ orders, customer }: OverviewProps) => {
  const { t } = useTranslation()
  const { handleLogout } = useAccount()
  return (
    <div>
      <div className="small:hidden">
        <div className="text-xl-semi mb-4 px-8">
          {t("Hello")} {customer?.first_name}
        </div>
        <div className="text-base-regular">
          <ul>
            <li>
              <Link
                href="/account/profile"
                className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
              >
                <>
                  <div className="flex items-center gap-x-2">
                    <User size={16} />
                    <span>{t("Profile")}</span>
                    <ChevronDown className="transform -rotate-90" />
                  </div>
                </>
              </Link>
            </li>
            <li>
              <Link
                href="/account/addresses"
                className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
              >
                <>
                  <div className="flex items-center gap-x-2">
                    <MapPin size={16} />
                    <span>{t("Addresses")}</span>
                    <ChevronDown className="transform -rotate-90" />
                  </div>
                  
                </>
              </Link>
            </li>
            <li>
              <Link
                href="/account/orders"
                className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
              >
                <>
                  <div className="flex items-center gap-x-2">
                    <Package size={16} />
                    <span>{t("Orders")}</span>
                    <ChevronDown className="transform -rotate-90" />
                  </div>
                  
                </>
              </Link>
            </li>
            <li>
              <Link
                href="/account/orders"
                className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                legacyBehavior
              >
                <a className="flex items-center justify-between py-4 border-b border-gray-200 px-8">
                  <div className="flex items-center gap-x-2">
                    <EyeOff size={16} />
                    <span onClick={handleLogout} >{t("LogOut")}</span>
                    <ChevronDown className="transform -rotate-90" />
                  </div>
                  
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="hidden small:block">
        <div className="text-xl-semi flex justify-between items-start mb-4">
          <span>
            {t("Hello")} {customer?.first_name}
          </span>
          <span className="text-small-regular text-gray-700">
            {t("SignedInAs")}:{" "}
            <span className="font-semibold">{customer?.email}</span>
          </span>
        </div>
        <div className="flex flex-col py-8 border-t border-gray-200">
          <div className="flex flex-col gap-y-4 h-full col-span-1 row-span-2 flex-1">
            <div className="flex items-start gap-x-16 mb-6">
              <div className="flex flex-col gap-y-4">
                <h3 className="text-large-semi">Profile</h3>
                <div className="flex items-end gap-x-2">
                  <span className="text-3xl-semi leading-none">
                    {getProfileCompletion(customer)}%
                  </span>
                  <span className="uppercase text-base-regular text-gray-500">
                    {t("Completed")}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-y-4">
                <h3 className="text-large-semi">{t("Addresses")}</h3>
                <div className="flex items-end gap-x-2">
                  <span className="text-3xl-semi leading-none">
                    {customer?.shipping_addresses?.length || 0}
                  </span>
                  <span className="uppercase text-base-regular text-gray-500">
                    {t("Saved")}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-y-4">
              <div className="flex items-center gap-x-2">
                <h3 className="text-large-semi">{t("RecentOrders")}</h3>
              </div>
              <ul className="flex flex-col gap-y-4">
                {orders ? (
                  orders.slice(0, 5).map((order) => {
                    return (
                      <li key={order.id}>
                        <Link href={`/order/details/${order.id}`}>
                          <div className="bg-gray-50 flex justify-between items-center p-4">
                            <div className="grid grid-cols-3 grid-rows-2 text-small-regular gap-x-4 flex-1">
                              <span className="font-semibold">Date placed</span>
                              <span className="font-semibold">
                                Order number
                              </span>
                              <span className="font-semibold">
                                Total amount
                              </span>
                              <span>
                                {new Date(order.created_at).toDateString()}
                              </span>
                              <span>#{order.display_id}</span>
                              <span>
                                {formatAmount({
                                  amount: order.total,
                                  region: order.region,
                                  includeTaxes: false,
                                })}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </li>
                    )
                  })
                ) : (
                  <span>{t("NoRecentOrders")}</span>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const getProfileCompletion = (customer?: Omit<Customer, "password_hash">) => {
  let count = 0

  if (!customer) {
    return 0
  }

  if (customer.email) {
    count++
  }

  if (customer.first_name && customer.last_name) {
    count++
  }

  if (customer.phone) {
    count++
  }

  if (customer.billing_address) {
    count++
  }

  return (count / 4) * 100
}

export default Overview
