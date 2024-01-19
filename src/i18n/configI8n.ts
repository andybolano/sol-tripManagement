import { createI18n } from "vue-i18n"

const defaultLanguage = "en"

const loadLocaleMessages = () => {
	const messages = {}
	loadDirectoryLocales(
		require.context("../app/locales", true, /[A-Za-z0-9-_,\s]+\.json$/i),
		messages
	)
	return messages
}

const loadDirectoryLocales = (
	locales: __WebpackModuleApi.RequireContext,
	messages: any
) => {
	locales.keys().forEach((key: string) => {
		const matched = key.match(/([A-Za-z0-9-_]+)\./i)
		if (matched && matched.length > 1) {
			const language = matched[1]
			if (!messages[language]) {
				messages[language] = {}
			}
			messages[language] = { ...messages[language], ...locales(key) }
		}
	})
}

const i18n = createI18n({
	locale: defaultLanguage,
	fallbackLocale: defaultLanguage,
	messages: loadLocaleMessages(),
	silentTranslationWarn: true,
	sync: false,
	legacy: false,
})

export default i18n
