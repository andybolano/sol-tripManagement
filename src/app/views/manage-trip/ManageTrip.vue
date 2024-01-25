<template>
	<CusHeader>
		<template #title>
			<h1>
				{{ titlePage }}
			</h1>
		</template>
		<template #options>
			<CusButton
				class="mr-6"
				:value="$t('Back')"
				@click="cancel()"
				:type="'secondary'"
			/>
			<CusButton
				v-if="isEditTrip"
				:value="$t('Save Changes')"
				:disabled="!isFormValid"
				@click="saveChanges()"
			/>
			<CusButton
				v-else
				:value="$t('Create')"
				:disabled="!isFormValid"
				@click="createTrip()"
			/>
		</template>
	</CusHeader>
	<div class="container">
		<div class="w-full flex">
			<CusCard>
				<template #body>
					<h3 class="mb-7">{{ $t("Trip Information") }}</h3>
					<TripForm
						ref="tripFormRef"
						:initialData="trip"
						@formData="setDataForm"
					/>
				</template>
			</CusCard>
			<div class="w-full">
				<!--TODO add error boundary https://medium.com/@alpercitak/enhancing-vue-js-performance-strategies-for-optimal-user-experiences-555496c3f3ca-->
				<CusMap :location="trip.address.location" />
			</div>
		</div>
	</div>
</template>

<script lang="ts" src="./ManageTrip.ts"></script>
