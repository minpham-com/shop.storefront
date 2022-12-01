import { medusaClient } from "@lib/config"
import { useAccount } from "@lib/context/account-context"
import useToggleState from "@lib/hooks/use-toggle-state"
import { useTranslation } from "react-i18next"
import { Address } from "@medusajs/medusa"
import CountrySelect from "@modules/checkout/components/country-select"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"
import Edit from "@modules/common/icons/edit"
import Spinner from "@modules/common/icons/spinner"
import Trash from "@modules/common/icons/trash"
import clsx from "clsx"
import React, { useState } from "react"
import { useForm } from "react-hook-form"

type FormValues = {
  first_name: string
  last_name: string
  city: string
  country_code: string
  postal_code: string
  province?: string
  address_1: string
  address_2?: string
  phone?: string
  company?: string
}

type EditAddressProps = {
  address: Address
  isActive?: boolean
}

const EditAddress: React.FC<EditAddressProps> = ({
  address,
  isActive = false,
}) => {
  const { state, open, close } = useToggleState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const { t } = useTranslation()
  const { refetchCustomer } = useAccount()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      first_name: address.first_name || undefined,
      last_name: address.last_name || undefined,
      city: address.city || undefined,
      address_1: address.address_1 || undefined,
      address_2: address.address_2 || undefined,
      country_code: address.country_code || undefined,
      postal_code: address.postal_code || undefined,
      phone: address.phone || undefined,
      company: address.company || undefined,
      province: address.province || undefined,
    },
  })

  const submit = handleSubmit(async (data: FormValues) => {
    setSubmitting(true)
    setError(undefined)

    const payload = {
      first_name: data.first_name,
      last_name: data.last_name,
      company: data.company || "Personal",
      address_1: data.address_1,
      address_2: data.address_2 || "",
      city: data.city,
      country_code: data.country_code,
      province: data.province || "",
      postal_code: data.postal_code,
      phone: data.phone || "None",
      metadata: {},
    }

    medusaClient.customers.addresses
      .updateAddress(address.id, payload)
      .then(() => {
        setSubmitting(false)
        refetchCustomer()
        close()
      })
      .catch(() => {
        setSubmitting(false)
        setError(t("FailedToUpdateAddressPleaseTryAgain"))
      })
  })

  const removeAddress = () => {
    medusaClient.customers.addresses.deleteAddress(address.id).then(() => {
      refetchCustomer()
    })
  }

  return (
    <>
      <div
        className={clsx(
          "border border-gray-200 p-5 min-h-[220px] h-full w-full flex flex-col justify-between transition-colors",
          {
            "border-gray-900": isActive,
          }
        )}
      >
        <div className="flex flex-col">
          <span className="text-left text-base-semi">
            {address.first_name} {address.last_name}
          </span>
          {address.company && (
            <span className="text-small-regular text-gray-700">
              {address.company}
            </span>
          )}
          <div className="flex flex-col text-left text-base-regular mt-2">
            <span>
              {address.address_1}
              {address.address_2 && <span>, {address.address_2}</span>}
            </span>
            <span>
              {address.postal_code}, {address.city}
            </span>
            <span>
              {address.province && `${address.province}, `}
              {address.country_code?.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <button
            className="text-small-regular text-gray-700 flex items-center gap-x-2"
            onClick={open}
          >
            <Edit size={16} />
            { t('Edit') }
          </button>
          <button
            className="text-small-regular text-gray-700 flex items-center gap-x-2"
            onClick={removeAddress}
          >
            <Trash />
            { t('Remove') }
          </button>
        </div>
      </div>

      <Modal isOpen={state} close={close}>
        <Modal.Title>{ t('EditAddress') }</Modal.Title>
        <Modal.Body>
          <div className="grid grid-cols-1 gap-y-2">
            <div className="grid grid-cols-2 gap-x-2">
              <Input
                label={ t("FirstName") }
                {...register("first_name", {
                  required: t("ValidateIsRequired", {"attribute": t("FirstName")}),
                })}
                required
                errors={errors}
                autoComplete="given-name"
              />
              <Input
                label={ t("LastName") }
                {...register("last_name", {
                  required: t("ValidateIsRequired", {"attribute": t("LastName")}),
                })}
                required
                errors={errors}
                autoComplete="family-name"
              />
            </div>
            <Input label={ t("Company") } {...register("company")} errors={errors} />
            <Input
              label={ t("Address") }
              {...register("address_1", {
                required: t("ValidateIsRequired", {"attribute": t("Address")}),
              })}
              required
              errors={errors}
              autoComplete="address-line1"
            />
            <Input
              label={ t("ApartmentSuiteEtc") }
              {...register("address_2")}
              errors={errors}
              autoComplete="address-line2"
            />
            <div className="grid grid-cols-[144px_1fr] gap-x-2">
              <Input
                label={ t("PostalCode") }
                {...register("postal_code", {
                  required: t("ValidateIsRequired", {"attribute": t("PostalCode")}),
                })}
                required
                errors={errors}
                autoComplete="postal-code"
              />
              <Input
                label={ t("City") }
                {...register("city", {
                  required: t("ValidateIsRequired", {"attribute": t("City")}),
                })}
                errors={errors}
                required
                autoComplete="locality"
              />
            </div>
            <Input
              label={ t("ProvinceState") }
              {...register("province")}
              errors={errors}
              autoComplete="address-level1"
            />
            <CountrySelect
              {...register("country_code", { required: true })}
              autoComplete="country"
            />
            <Input
              label={ t("Phone") }
              {...register("phone")}
              errors={errors}
              autoComplete="phone"
            />
          </div>
          {error && (
            <div className="text-rose-500 text-small-regular py-2">{error}</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            { t('Cancel') }
          </Button>
          <Button onClick={submit} disabled={submitting}>
            { t('Save') }
            {submitting && <Spinner />}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditAddress
