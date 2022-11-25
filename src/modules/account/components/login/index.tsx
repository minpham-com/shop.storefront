import { medusaClient } from "@lib/config"
import { LOGIN_VIEW, useAccount } from "@lib/context/account-context"
import { useTranslation } from "react-i18next"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import Spinner from "@modules/common/icons/spinner"
import { useRouter } from "next/router"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import Link from "next/link"

interface SignInCredentials extends FieldValues {
  email: string
  password: string
}

const Login = () => {
  const { setLoginMarkKey, isLoginMarkKey, loginView, refetchCustomer } = useAccount()
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
    formState: { errors, isSubmitting },
  } = useForm<SignInCredentials>()

  const onSubmit = handleSubmit(async (credentials) => {
    await medusaClient.auth
      .authenticate(credentials)
      .then(() => {
        setLoginMarkKey(isLoginMarkKey)
        refetchCustomer()
        router.push("/account")
      })
      .catch(handleError)
  })

  return (
    <div className="max-w-sm w-full flex flex-col items-center">
      {isSubmitting && (
        <div className="z-10 fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center">
          <Spinner size={24} />
        </div>
      )}
      <h1 className="text-large-semi uppercase mb-6">{t("WelcomeBack")}</h1>
      <p className="text-center text-base-regular text-gray-700 mb-8">
        {t("SignInToAccessShoppingExperience")}
      </p>
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
            autoComplete="current-password"
            errors={errors}
          />
        </div>
        {authError && (
          <div>
            <span className="text-rose-500 w-full text-small-regular">
              {t("InvalidUserOrPassword")}
            </span>
          </div>
        )}
        <span className="text-small-regular mt-6 px-2">
          <Link href="/account/password/reset">{t("ResetPassword")}</Link>
        </span>
        <Button className="mt-6">{t("Login")}</Button>
      </form>
      <span className="text-center text-gray-700 text-small-regular mt-6">
        {t("NotAMember")}{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline"
        >
          {t("JoinUs")}
        </button>
        .
      </span>
    </div>
  )
}

export default Login
