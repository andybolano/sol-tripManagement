import { App } from "vue"
import CusCard from "sharedLibrary/CusCard.vue"
import CusLabel from "sharedLibrary/CusLabel.vue"
import CusButton from "sharedLibrary/CusButton.vue"
import CusInput from "sharedLibrary/CusInput.vue"
import CusHeader from "sharedLibrary/CusHeader.vue"
import CusTable from "sharedLibrary/CusTable.vue"

export default {
	install(app: App): void {
		app.component("CusCard", CusCard)
		app.component("CusLabel", CusLabel)
		app.component("CusButton", CusButton)
		app.component("CusInput", CusInput)
		app.component("CusHeader", CusHeader)
		app.component("CusTable", CusTable)
	},
}
