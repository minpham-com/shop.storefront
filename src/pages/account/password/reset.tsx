import { useTranslation } from "react-i18next"
import PasswordTemplate from "@modules/account/templates/reset-password-template"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { NextPageWithLayout } from "types/global"

const ResetPassword: NextPageWithLayout = () => {
  const { t } = useTranslation()
  return (
    <>
      <Head title={t("ResetPassword")} description={t("ResetPasswordToYourAccount")} />
      <PasswordTemplate />
    </>
  )
}

ResetPassword.getLayout = (page) => {
  return <Layout>{page}</Layout>
}

export default ResetPassword
