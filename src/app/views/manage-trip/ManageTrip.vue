<template>
	<CusHeader>
		<template #title>
			<h1>{{ $t("Create new trip") }}</h1>
		</template>
		<template #options>
			<CusButton :value="$t('Create')" />
		</template>
	</CusHeader>
	<div class="container">
		<div class="w-full flex">
			<CusCard>
				<template #body>
					<h3 class="mb-7">{{ $t("Trip Information") }}</h3>
					<form>
						<div class="form__group">
							<CusLabel :text="$t('Client Name')" isRequired />
							<CusInput :placeholder="$t('Insert name')" />
						</div>
						<div class="form__group">
							<CusLabel :text="$t('Departure date')" isRequired />
							<CusInput :type="'date'" />
						</div>
						<div class="form__group">
							<CusSearch
								:label="$t('Destination address')"
								:placeholder="$t('Search address')"
								required
							/>
						</div>
						<div class="form__group">
							<CusLabel :text="$t('Cargo details')" />
							<CusInput
								:placeholder="$t('Insert details')"
								type="textarea"
							/>
						</div>
					</form>
				</template>
			</CusCard>
			<div>
				<CusMap />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import CusMap from "uiLibrary/CusMap.vue"
import CusSearch from "uiLibrary/CusSearch.vue"

export default defineComponent({
	name: "ManageTrip",
	components: {
		CusMap,
		CusSearch,
	},
})
</script>
