import { medusaClient } from "@lib/config"
import { PASSWORD_VIEW, useAccount } from "@lib/context/account-context"
import { useTranslation } from "react-i18next"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import { useRouter } from "next/router"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import Link from "next/link"

interface ResetTokenCredentials extends FieldValues {
  email: string
}

const ResetPasswordToken = () => {
  const { passwordView } = useAccount()
  const [_, setCurrentView] = passwordView
  const [error, setError] = useState<string | undefined>(undefined)
  
  const { t } = useTranslation()
  const handleError = (_e: Error) => {
    setError(_e.message || t("InvalidEmailOrPassword"))
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetTokenCredentials>()

  const onSubmit = handleSubmit(async (credentials) => {
    medusaClient.customers
      .generatePasswordToken(credentials)
      .then(() => {
        setCurrentView(PASSWORD_VIEW.RESET)
      })
      .catch(handleError)
  })

  return (
    <div className="max-w-sm w-full flex flex-col items-center">
      <h1 className="text-large-semi uppercase mb-6">{t("ResetPasswordToken")}</h1>
      <form className="w-full" onSubmit={onSubmit}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label={t("Email")}
            {...register("email", {
              required: t("ValidateIsRequired", { attribute: t("Email") }),
            })}
            autoComplete="email"
            errors={errors}
          />
        </div>
        {error && (
          <div>
            <span className="text-rose-500 w-full text-small-regular">
              {t("InvalidResetPasswordEmail")}
            </span>
          </div>
        )}
        <Button className="mt-6">{t("Reset")}</Button>
      </form>
    </div>
  )
}

export default ResetPasswordToken
