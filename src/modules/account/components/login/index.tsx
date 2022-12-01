import { medusaClient } from "@lib/config"
import { LOGIN_VIEW, useAccount } from "@lib/context/account-context"
import { useTranslation } from "react-i18next"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import { useRouter } from "next/router"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"

interface SignInCredentials extends FieldValues {
  email: string
  password: string
}

const Login = () => {
  const { loginView, refetchCustomer } = useAccount()
  const [_, setCurrentView] = loginView
  const [authError, setAuthError] = useState<string | undefined>(undefined)
  const router = useRouter()
  const { t } = useTranslation()
  const handleError = (_e: Error) => {
    setAuthError(t("InvalidEmailOrPassword"))
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInCredentials>()

  const onSubmit = handleSubmit(async (credentials) => {
    medusaClient.auth
      .authenticate(credentials)
      .then(() => {
        refetchCustomer()
        router.push("/account")
      })
      .catch(handleError)
  })

  return (
    <div className="max-w-sm w-full flex flex-col items-center">
      <h1 className="text-large-semi uppercase mb-6">{ t('WelcomeBack') }</h1>
      <p className="text-center text-base-regular text-gray-700 mb-8">
        { t('SignInToAccessShoppingExperience') }
      </p>
      <form className="w-full" onSubmit={onSubmit}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label={ t("Email") }
            {...register("email", { required: t("ValidateIsRequired", { attribute: t('Email')}) })}
            autoComplete="email"
            errors={errors}
          />
          <Input
            label={ t("Password") }
            {...register("password", { required: t("ValidateIsRequired", { attribute: t('Password')}) })}
            type="password"
            autoComplete="current-password"
            errors={errors}
          />
        </div>
        {authError && (
          <div>
            <span className="text-rose-500 w-full text-small-regular">
              { t('InvalidUserOrPassword') }
            </span>
          </div>
        )}
        <Button className="mt-6">{ t('Enter') }</Button>
      </form>
      <span className="text-center text-gray-700 text-small-regular mt-6">
        { t('NotAMember') }{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline"
        >
          { t('JoinUs') }
        </button>
        .
      </span>
    </div>
  )
}

export default Login
