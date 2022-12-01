import { useTranslation } from "react-i18next"
import Button from "@modules/common/components/button"
import Link from "next/link"

const SignInPrompt = () => {
  const { t } = useTranslation()
  return (
    <div className="bg-white flex items-start justify-between">
      <div>
        <h2 className="text-xl-semi">{ t('AlreadyHaveAnAccount') }</h2>
        <p className="text-base-regular text-gray-700 mt-2">
          { t('SignInForABetterExperience') }
        </p>
      </div>
      <div>
        <Link href="/account/login" legacyBehavior>
          <Button variant="secondary">{ t('SignIn') }</Button>
        </Link>
      </div>
    </div>
  )
}

export default SignInPrompt
