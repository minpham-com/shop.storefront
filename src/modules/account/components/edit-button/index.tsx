import { useTranslation } from "react-i18next"
import React from "react"

const EditButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  const { t } = useTranslation()
  return (
    <div>
      <button
        className="underline text-small-regular text-gray-700 mt-2"
        {...props}
      >
        {t("Edit")}
      </button>
    </div>
  )
}

export default EditButton
