import { CheckoutFormValues } from "@lib/context/checkout-context"
import { emailRegex } from "@lib/util/regex"
import ConnectForm from "@modules/common/components/connect-form"
import Input from "@modules/common/components/input"
import { useMeCustomer } from "medusa-react"
import { useTranslation } from "react-i18next"
import AddressSelect from "../address-select"
import CountrySelect from "../country-select"

const ShippingAddress = () => {
  const { customer } = useMeCustomer()
  const { t } = useTranslation()
  return (
    <div>
      {customer && (customer.shipping_addresses?.length || 0) > 0 && (
        <div className="mb-6 flex flex-col gap-y-4 bg-neutral-100 p-4">
          <p className="text-small-regular">
            {t("DoYouWantToUseOneYourSavedAddresses", {
              text: customer.first_name,
            })}
          </p>
          <AddressSelect addresses={customer.shipping_addresses} />
        </div>
      )}
      <ConnectForm<CheckoutFormValues>>
        {({ register, formState: { errors, touchedFields } }) => (
          <div className="grid grid-cols-1 gap-y-2">
            <Input
              label={t("Email")}
              {...register("email", {
                required: t("ValidateIsRequired", { attribute: t("Email") }),
                pattern: emailRegex,
              })}
              autoComplete="email"
              errors={errors}
              touched={touchedFields}
            />
            <div className="grid grid-cols-2 gap-x-2">
              <Input
                label={t("FirstName")}
                {...register("shipping_address.first_name", {
                  required: t("ValidateIsRequired", {
                    attribute: t("FirstName"),
                  }),
                })}
                autoComplete="given-name"
                errors={errors}
                touched={touchedFields}
              />
              <Input
                label={t("LastName")}
                {...register("shipping_address.last_name", {
                  required: t("ValidateIsRequired", {
                    attribute: t("LastName"),
                  }),
                })}
                autoComplete="family-name"
                errors={errors}
                touched={touchedFields}
              />
            </div>
            <Input
              label={t("Company")}
              {...register("shipping_address.company")}
              autoComplete="organization"
              errors={errors}
              touched={touchedFields}
            />
            <Input
              label={t("Address")}
              {...register("shipping_address.address_1", {
                required: t("ValidateIsRequired", { attribute: t("Address") }),
              })}
              autoComplete="address-line1"
              errors={errors}
              touched={touchedFields}
            />
            <Input
              label={t("ApartmentSuiteEtc")}
              {...register("shipping_address.address_2")}
              autoComplete="address-line2"
              errors={errors}
              touched={touchedFields}
            />
            <div className="grid grid-cols-[122px_1fr] gap-x-2">
              <Input
                label={t("PostalCode")}
                {...register("shipping_address.postal_code", {
                  required: t("ValidateIsRequired", {
                    attribute: t("PostalCode"),
                  }),
                })}
                autoComplete="postal-code"
                errors={errors}
                touched={touchedFields}
              />
              <Input
                label={t("City")}
                {...register("shipping_address.city", {
                  required: t("ValidateIsRequired", { attribute: t("City") }),
                })}
                autoComplete="address-level2"
                errors={errors}
                touched={touchedFields}
              />
            </div>
            <CountrySelect
              {...register("shipping_address.country_code", {
                required: t("ValidateIsRequired", { attribute: t("Country") }),
              })}
              autoComplete="country"
              errors={errors}
              touched={touchedFields}
            />
            <Input
              label={t("ProvinceState")}
              {...register("shipping_address.province")}
              autoComplete="address-level1"
              errors={errors}
              touched={touchedFields}
            />
            <Input
              label={t("Phone")}
              {...register("shipping_address.phone")}
              autoComplete="tel"
              errors={errors}
              touched={touchedFields}
            />
          </div>
        )}
      </ConnectForm>
    </div>
  )
}

export default ShippingAddress
