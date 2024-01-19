import { App } from "vue"
import CusCard from "uiLibrary/CusCard.vue"
import CusLabel from "uiLibrary/CusLabel.vue"
import CusButton from "uiLibrary/CusButton.vue"
import CusInput from "uiLibrary/CusInput.vue"
import CusHeader from "uiLibrary/CusHeader.vue"

export default {
	install(app: App): void {
		app.component("CusCard", CusCard)
		app.component("CusLabel", CusLabel)
		app.component("CusButton", CusButton)
		app.component("CusInput", CusInput)
		app.component("CusHeader", CusHeader)
	},
}
