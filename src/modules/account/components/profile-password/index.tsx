import { medusaClient } from "@lib/config"
import { useTranslation } from "react-i18next"
import { Customer } from "@medusajs/medusa"
import Input from "@modules/common/components/input"
import { useUpdateMe } from "medusa-react"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import AccountInfo from "../account-info"

type MyInformationProps = {
  customer: Omit<Customer, "password_hash">
}

type UpdateCustomerPasswordFormData = {
  old_password: string
  new_password: string
  confirm_password: string
}

const ProfileName: React.FC<MyInformationProps> = ({ customer }) => {
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>(
    undefined
  )
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<UpdateCustomerPasswordFormData>()
  const { t } = useTranslation()
  const {
    mutate: update,
    isLoading,
    isSuccess,
    isError,
    reset: clearState,
  } = useUpdateMe()

  useEffect(() => {
    reset()
  }, [customer, reset])

  const updatePassword = async (data: UpdateCustomerPasswordFormData) => {
    const isValid = await medusaClient.auth
      .authenticate({
        email: customer.email,
        password: data.old_password,
      })
      .then(() => true)
      .catch(() => false)

    if (!isValid) {
      setError("old_password", {
        type: "validate",
        message: t("ValidateIsIncorrect", { attribute: t("OldPassword") }),
      })
      setErrorMessage(t("ValidateIsIncorrect", { attribute: t("OldPassword") }))

      return
    }

    if (data.new_password !== data.confirm_password) {
      setError("confirm_password", {
        type: "validate",
        message: t("ValidateDoNotMatch", { attribute: t("Passwords") }),
      })
      setErrorMessage(t("ValidateDoNotMatch", { attribute: t("Passwords") }))

      return
    }

    return update({
      id: customer.id,
      password: data.new_password,
    })
  }

  return (
    <form
      onSubmit={handleSubmit(updatePassword)}
      onReset={() => reset()}
      className="w-full"
    >
      <AccountInfo
        label={t("Password")}
        currentInfo={
          <span>{t("ThePasswordIsNotShownForSecurityReasons")}</span>
        }
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        errorMessage={errorMessage}
        clearState={clearState}
      >
        <div className="grid grid-cols-2 gap-4">
          <Input
            label={t("OldPassword")}
            {...register("old_password", {
              required: true,
            })}
            type="password"
            autoComplete="current-password"
            errors={errors}
          />
          <Input
            label={t("NewPassword")}
            type="password"
            {...register("new_password", { required: true })}
            errors={errors}
            autoComplete="new-password"
          />
          <Input
            label={t("ConfirmPassword")}
            type="password"
            {...register("confirm_password", { required: true })}
            errors={errors}
            autoComplete="new-password"
          />
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfileName
