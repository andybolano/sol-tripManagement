<template>
	<CusSearch
		:id="'search-address-input'"
		:labelText="$t('Destination address')"
		:placeholder="$t('Search address')"
		:isLoadingResults="isLoadingPlaces"
		:itemsResults="placesSearchList"
		isRequired
		@changeOption="handlePlaceSelected"
		v-model="searchTerm"
	>
		<template #option="{ option }">
			<div class="flex align-center">
				<i class="icon-map-pin" />
				<p class="ml-4">{{ option.name }}</p>
			</div>
		</template>
	</CusSearch>
</template>
<script lang="ts" src="./SearchPlaces.ts"></script>
