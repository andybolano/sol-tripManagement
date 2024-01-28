<template>
	<CusSearch
		:id="'search-address-input'"
		:label="$t('Destination address')"
		:placeholder="$t('Search address')"
		:isLoadingResults="isLoadingPlaces"
		:itemsResults="places"
		required
		@changeOption="handlePlaceSelected"
		v-model="searchTerm"
	>
		<template #option="{ option }">
			<p>
				{{ option.name }}
			</p>
		</template>
	</CusSearch>
</template>
<script lang="ts" src="./SearchPlaces.ts"></script>
