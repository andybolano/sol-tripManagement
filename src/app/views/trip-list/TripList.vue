<template>
	<CusHeader>
		<template #title>
			<h1>
				{{ $t("Trip List") }}
			</h1>
		</template>
		<template #options>
			<CusButton :value="$t('Create New')" @click="goToCreateNew()" />
		</template>
	</CusHeader>
	<div class="container">
		<CusCard :title="`${listTrips.length} ${$t('Results')}`">
			<template #body>
				<TripTable :list="listTrips" @edit="showEdit" />
			</template>
		</CusCard>
	</div>
</template>

<script lang="ts" src="./TripList.ts"></script>
<style lang="scss" src="./TripList.scss"></style>
