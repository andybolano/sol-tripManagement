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
								isRequired
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
				<CusMap :location="placeSelected?.location" />
			</div>
		</div>
	</div>
</template>

<script lang="ts" src="./ManageTrip.ts"></script>
