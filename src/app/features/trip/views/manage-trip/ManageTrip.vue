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
				:disabled="validate$.$invalid"
				@click="saveChanges()"
			/>
			<CusButton
				v-else
				:value="$t('Create')"
				:disabled="validate$.$invalid"
				@click="createTrip()"
			/>
		</template>
	</CusHeader>
	<div class="container">
		<div class="w-full flex">
			<!--TODO add error boundary https://medium.com/@alpercitak/enhancing-vue-js-performance-strategies-for-optimal-user-experiences-555496c3f3ca-->
			<CusCard>
				<template #body>
					<h3 class="mb-7">{{ $t("Trip Information") }}</h3>
					<form>
						<div class="form__group">
							<CusInput
								:id="'client-name-input'"
								:label="$t('Client Name')"
								:placeholder="$t('Insert name')"
								required
								v-model="tripForm.clientName"
							/>
						</div>
						<div class="form__group">
							<CusInput
								:id="'departure-date-input'"
								:type="'date'"
								:label="$t('Departure date')"
								required
								v-model="tripForm.departureDate"
							/>
						</div>
						<div class="form__group">
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
						</div>
						<div class="form__group">
							<CusInput
								:id="'cargo-details-input'"
								:label="$t('Cargo details')"
								:placeholder="$t('Insert details')"
								type="textarea"
								v-model="tripForm.cargoDetails"
							/>
						</div>
					</form>
				</template>
			</CusCard>
			<div>
				<CusMap :location="tripForm.address.location" />
			</div>
		</div>
	</div>
</template>

<script lang="ts" src="./ManageTrip.ts"></script>
