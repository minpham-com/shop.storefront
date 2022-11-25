import { useAccount } from "@lib/context/account-context"
import { useTranslation } from "react-i18next"
import AddressBook from "../components/address-book"

const AddressesTemplate = () => {
  const { customer, retrievingCustomer } = useAccount()
  const { t } = useTranslation()
  if (retrievingCustomer || !customer) {
    return null
  }

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">{t("ShippingAddresses")}</h1>
        <p className="text-base-regular">{t("ShippingAddressesNote")}</p>
      </div>
      <AddressBook customer={customer} />
    </div>
  )
}

export default AddressesTemplate
