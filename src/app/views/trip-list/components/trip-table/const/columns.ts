import { useI18n } from "vue-i18n"

export const columns = () => {
	const { t } = useI18n()
	return [
		{
			title: t("Client Name"),
			dataIndex: "clientName",
			key: "clientName",
		},
		{
			title: t("Address"),
			dataIndex: "address.name",
			key: "address",
		},
		{
			title: t("Departure Date"),
			dataIndex: "departureDate",
			key: "departureDate",
		},
		{
			title: t("Created At"),
			dataIndex: "createdAt",
			key: "createdAt",
		},
		{
			title: "",
			key: "action",
		},
	]
}
