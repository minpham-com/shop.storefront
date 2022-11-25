import { medusaClient } from "@lib/config"
import { useAccount } from "@lib/context/account-context"
import useToggleState from "@lib/hooks/use-toggle-state"
import useTranslation from "@lib/hooks/use-translation"
import CountrySelect from "@modules/checkout/components/country-select"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"
import Plus from "@modules/common/icons/plus"
import Spinner from "@modules/common/icons/spinner"
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

const AddAddress: React.FC = () => {
  const { state, open, close } = useToggleState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const { t } = useTranslation()
  const { refetchCustomer } = useAccount()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>()

  const handleClose = () => {
    reset({
      first_name: "",
      last_name: "",
      city: "",
      country_code: "",
      postal_code: "",
      address_1: "",
      address_2: "",
      company: "",
      phone: "",
      province: "",
    })
    close()
  }

  const submit = handleSubmit(async (data: FormValues) => {
    setSubmitting(true)
    setError(undefined)

    const payload = {
      first_name: data.first_name,
      last_name: data.last_name,
      company: data.company || "",
      address_1: data.address_1,
      address_2: data.address_2 || "",
      city: data.city,
      country_code: data.country_code,
      province: data.province || "",
      postal_code: data.postal_code,
      phone: data.phone || "",
      metadata: {},
    }

    medusaClient.customers.addresses
      .addAddress({ address: payload })
      .then(() => {
        setSubmitting(false)
        refetchCustomer()
        handleClose()
      })
      .catch(() => {
        setSubmitting(false)
        setError("Failed to add address, please try again.")
      })
  })

  return (
    <>
      <button
        className="border border-gray-200 p-5 min-h-[220px] h-full w-full flex flex-col justify-between"
        onClick={open}
      >
        <span className="text-base-semi">{ t('NewAddress') }</span>
        <Plus size={24} />
      </button>

      <Modal isOpen={state} close={handleClose}>
        <Modal.Title>{ t('AddAddress') }</Modal.Title>
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
          <Button
            className="!bg-gray-200 !text-gray-900 !border-gray-200 min-h-0"
            onClick={handleClose}
          >
            { t('Cancel') }
          </Button>
          <Button className="min-h-0" onClick={submit} disabled={submitting}>
            { t('Save') }
            {submitting && <Spinner />}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddAddress
