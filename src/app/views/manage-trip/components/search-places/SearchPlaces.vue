<template>
	<CusSearch
		:id="'search-address-input'"
		:label="$t('Destination address')"
		:placeholder="$t('Search address')"
		:isLoadingResults="isLoadingPlaces"
		:itemsResults="places"
		required
		v-model="searchTerm"
		@itemSelected="handlePlaceSelected"
	/>
</template>
<script lang="ts" src="./SearchPlaces.ts"></script>
