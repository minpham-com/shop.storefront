import { medusaClient } from "@lib/config"
import { useTranslation } from "react-i18next"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import { useRouter } from "next/router"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"

interface ResetCredentials extends FieldValues {
  email: string
  password: string
  token: string
}

const ResetPassword = () => {
  
  const [error, setError] = useState<string | undefined>(undefined)
  const router = useRouter()
  const { t } = useTranslation()
  const handleError = (_e: Error) => {
    setError(_e.message || t("ResetPasswordFailed"))
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetCredentials>()

  const onSubmit = handleSubmit(async (credentials) => {
    medusaClient.customers
      .resetPassword(credentials)
      .then(() => {
        router.push("/account")
      })
      .catch(handleError)
  })

  return (
    <div className="max-w-sm w-full flex flex-col items-center">
      <h1 className="text-large-semi uppercase mb-6">{t("ResetPassword")}</h1>
      
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
          <Input
            label={t("Password")}
            {...register("password", {
              required: t("ValidateIsRequired", { attribute: t("Password") }),
            })}
            type="password"
            errors={errors}
          />
          <Input
            label={t("Token")}
            {...register("token", {
              required: t("ValidateIsRequired", { attribute: t("Token") }),
            })}
            type="input"
            errors={errors}
          />
        </div>
        {error && (
          <div>
            <span className="text-rose-500 w-full text-small-regular">
              {t("ResetPasswordFailed")}
            </span>
          </div>
        )}
        
        <Button className="mt-6">{t("Reset")}</Button>
      </form>
      
    </div>
  )
}

export default ResetPassword
