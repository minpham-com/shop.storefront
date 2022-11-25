import { Listbox, Transition } from "@headlessui/react"
import useToggleState from "@lib/hooks/use-toggle-state"
import { useTranslation } from "react-i18next"
import { Fragment } from "react"
import ReactCountryFlag from "react-country-flag"
import { localeDefault, localeSupports, localeMaps } from "@lib/config"
const LanguageSwitcher = () => {
  const { state, open, close } = useToggleState()
  const { t, i18n } = useTranslation()

  const handleChange = (lang: string) => {
    i18n.changeLanguage(lang)
    close()
  }

  const mapFlag = (countryCode: string) =>
    localeMaps[countryCode]?.flag || localeMaps[localeDefault]?.flag

  return (
    <div onMouseEnter={open} onMouseLeave={close}>
      <Listbox onChange={handleChange} value={i18n.language}>
        <Listbox.Button className="py-1 w-full">
          <div className="text-small-regular flex items-center gap-x-2 xsmall:justify-end">
            <span>{t("Language")}:</span>
            {i18n.language && (
              <span className="text-small-semi flex items-center gap-x-2">
                <ReactCountryFlag
                  svg
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                  countryCode={mapFlag(i18n.language)}
                  alt={i18n.language}
                />
              </span>
            )}
          </div>
        </Listbox.Button>
        <div className="relative w-full min-w-[316px]">
          <Transition
            show={state}
            as={Fragment}
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className="absolute -bottom-[calc(100%-36px)] left-0 xsmall:left-auto xsmall:right-0 max-h-[442px] overflow-y-scroll z-[900] bg-white drop-shadow-md text-small-regular uppercase text-black no-scrollbar"
              static
            >
              {localeSupports?.map((o: string) => {
                return (
                  <Listbox.Option
                    key={o}
                    value={o}
                    className="py-2 hover:bg-gray-200 px-3 cursor-pointer flex items-center gap-x-2"
                  >
                    <ReactCountryFlag
                      svg
                      style={{
                        width: "16px",
                        height: "16px",
                      }}
                      countryCode={mapFlag(o)}
                      alt={o}
                    />
                  </Listbox.Option>
                )
              })}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default LanguageSwitcher
