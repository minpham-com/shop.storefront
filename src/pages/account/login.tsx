import { useTranslation } from "react-i18next"
import LoginTemplate from "@modules/account/templates/login-template"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { NextPageWithLayout } from "types/global"

const Login: NextPageWithLayout = () => {
  const { t } = useTranslation()
  return (
    <>
      <Head title={ t("SignIn") } description={ t("SignInToYourAccount") } />
      <LoginTemplate />
    </>
  )
}

Login.getLayout = (page) => {
  return <Layout>{page}</Layout>
}

export default Login
