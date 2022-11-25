import { useAccount } from "@lib/context/account-context"
import ResetPasswordToken from "@modules/account/components/password/reset-token"
import ResetPassword from "@modules/account/components/password/reset"

const PasswordTemplate = () => {
  const { passwordView } = useAccount()
  const [currentView, _] = passwordView

  return (
    <div className="w-full flex justify-center py-24 px-2">
      {currentView === "reset-token" ? <ResetPasswordToken /> : <ResetPassword />}
    </div>
  )
}

export default PasswordTemplate
