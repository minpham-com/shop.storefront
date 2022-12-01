import { CheckoutFormValues } from "@lib/context/checkout-context"
import { useTranslation } from "react-i18next"
import ConnectForm from "@modules/common/components/connect-form"
import Input from "@modules/common/components/input"
import CountrySelect from "../country-select"

const BillingAddress = () => {
  const { t } = useTranslation()
  return (
    <ConnectForm<CheckoutFormValues>>
      {({ register, formState: { errors, touchedFields } }) => (
        <div className="grid grid-cols-1 gap-y-2">
          <div className="grid grid-cols-2 gap-x-2">
            <Input
              label={ t("FirstName") }
              {...register("billing_address.first_name", {
                required: t("ValidateIsRequired", { attribute: t('FirstName') }),
              })}
              autoComplete="given-name"
              errors={errors}
              touched={touchedFields}
            />
            <Input
              label={ t("LastName") }
              {...register("billing_address.last_name", {
                required: t("ValidateIsRequired", { attribute: t('LastName') }),
              })}
              autoComplete="family-name"
              errors={errors}
              touched={touchedFields}
            />
          </div>
          <Input
            label={ t("Company") }
            {...register("billing_address.company")}
            autoComplete="organization"
            errors={errors}
            touched={touchedFields}
          />
          <Input
            label={ t("Address") }
            {...register("billing_address.address_1", {
              required: t("ValidateIsRequired", { attribute: t('Address') }),
            })}
            autoComplete="address-line1"
            errors={errors}
            touched={touchedFields}
          />
          <Input
            label={ t("ApartmentSuiteEtc") }
            {...register("billing_address.address_2")}
            autoComplete="address-line2"
            errors={errors}
            touched={touchedFields}
          />
          <div className="grid grid-cols-[144px_1fr] gap-x-2">
            <Input
              label={ t("PostalCode") }
              {...register("billing_address.postal_code", {
                required: t("ValidateIsRequired", { attribute: t('PostalCode') }),
              })}
              autoComplete="postal-code"
              errors={errors}
              touched={touchedFields}
            />
            <Input
              label={ t("City") }
              {...register("billing_address.city", {
                required: t("ValidateIsRequired", { attribute: t('City') }),
              })}
              autoComplete="address-level2"
              errors={errors}
              touched={touchedFields}
            />
          </div>
          <CountrySelect
            {...register("billing_address.country_code", {
              required: t("ValidateIsRequired", { attribute: t('Country') }),
            })}
            autoComplete="country"
            errors={errors}
            touched={touchedFields}
          />
          <Input
            label={ t("ProvinceState") }
            {...register("billing_address.province")}
            autoComplete="address-level1"
            errors={errors}
            touched={touchedFields}
          />
          <Input
            label={ t("Phone") }
            {...register("billing_address.phone")}
            autoComplete="tel"
            errors={errors}
            touched={touchedFields}
          />
        </div>
      )}
    </ConnectForm>
  )
}

export default BillingAddress
