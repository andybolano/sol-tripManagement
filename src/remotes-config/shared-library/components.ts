import { App } from "vue"
import CusCard from "sharedLibrary/CusCard.vue"
import CusLabel from "sharedLibrary/CusLabel.vue"
import CusButton from "sharedLibrary/CusButton.vue"
import CusInput from "sharedLibrary/CusInput.vue"
import CusHeader from "sharedLibrary/CusHeader.vue"
import CusTable from "sharedLibrary/CusTable.vue"
import CusAvatar from "sharedLibrary/CusAvatar.vue"
import CusLoading from "sharedLibrary/CusLoading.vue"
import CusMessage from "sharedLibrary/CusMessage"
import CusMap from "sharedLibrary/CusMap.vue"
import CusSearch from "sharedLibrary/CusSearch.vue"

export default {
	install(app: App): void {
		app.component("CusCard", CusCard)
		app.component("CusLabel", CusLabel)
		app.component("CusButton", CusButton)
		app.component("CusInput", CusInput)
		app.component("CusHeader", CusHeader)
		app.component("CusTable", CusTable)
		app.component("CusAvatar", CusAvatar)
		app.component("CusLoading", CusLoading)
		app.component("CusMap", CusMap)
		app.component("CusSearch", CusSearch)
	},
}

export const toastMessage = CusMessage
