import { medusaClient } from "@lib/config"
import { LOGIN_VIEW, useAccount } from "@lib/context/account-context"
import { useTranslation } from "react-i18next"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import Spinner from "@modules/common/icons/spinner"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"

interface RegisterCredentials extends FieldValues {
  first_name: string
  last_name: string
  email: string
  password: string
  phone?: string
}

const Register = () => {
  const { setLoginMarkKey, isLoginMarkKey, loginView, refetchCustomer } = useAccount()
  const [_, setCurrentView] = loginView
  const [authError, setAuthError] = useState<string | undefined>(undefined)
  const router = useRouter()
  const { t } = useTranslation()
  const handleError = (e: Error) => {
    setAuthError(t("AnErrorOccuredPleaseTryAgain"))
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterCredentials>()

  const onSubmit = handleSubmit(async (credentials) => {
    await medusaClient.customers
      .create(credentials)
      .then(() => {
        setLoginMarkKey(isLoginMarkKey)
        refetchCustomer()
        router.push("/account")
      })
      .catch(handleError)
  })

  return (
    <div className="max-w-sm flex flex-col items-center mt-12">
      {isSubmitting && (
        <div className="z-10 fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center">
          <Spinner size={24} />
        </div>
      )}
      <h1 className="text-large-semi uppercase mb-6">{t("BecomeAMember")}</h1>
      <p className="text-center text-base-regular text-gray-700 mb-4">
        {t("CreateYourMemberProfileAndGetAccessToAnEnhancedShoppingExperience")}
      </p>
      <form className="w-full flex flex-col" onSubmit={onSubmit}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label={t("FirstName")}
            {...register("first_name", {
              required: t("ValidateIsRequired", { attribute: t("FistName") }),
            })}
            autoComplete="given-name"
            errors={errors}
          />
          <Input
            label={t("LastName")}
            {...register("last_name", {
              required: t("ValidateIsRequired", { attribute: t("LastName") }),
            })}
            autoComplete="family-name"
            errors={errors}
          />
          <Input
            label={t("Email")}
            {...register("email", {
              required: t("ValidateIsRequired", { attribute: t("Email") }),
            })}
            autoComplete="email"
            errors={errors}
          />
          <Input
            label={t("Phone")}
            {...register("phone")}
            autoComplete="tel"
            errors={errors}
          />
          <Input
            label={t("Password")}
            {...register("password", {
              required: t("ValidateIsRequired", { attribute: t("Password") }),
            })}
            type="password"
            autoComplete="new-password"
            errors={errors}
          />
        </div>
        {authError && (
          <div>
            <span className="text-rose-500 w-full text-small-regular">
              {t("TheseCredentialsDoNotMatchOurRecords")}
            </span>
          </div>
        )}
        <span className="text-center text-gray-700 text-small-regular mt-6">
          By creating an account, you agree to Acme&apos;s{" "}
          <Link href="/content/privacy-policy" className="underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/content/terms-of-use" className="underline">
            Terms of Use
          </Link>
          .
        </span>
        <Button className="mt-6">{t("Join")}</Button>
      </form>
      <span className="text-center text-gray-700 text-small-regular mt-6">
        {`${t("AlreadyAMember")} `}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          {`${t("SignIn")}`}
        </button>
        .
      </span>
    </div>
  )
}

export default Register
