<template>
	<form>
		<div class="form__group">
			<CusInput
				:id="'client-name-input'"
				:labelText="$t('Client Name')"
				:placeholder="$t('Insert name')"
				isRequired
				v-model="tripForm.clientName"
			/>
		</div>
		<div class="form__group">
			<CusInput
				:id="'departure-date-input'"
				:type="'date'"
				:labelText="$t('Departure date')"
				isRequired
				v-model="tripForm.departureDate"
			/>
		</div>
		<div class="form__group">
			<SearchPlaces
				v-model="tripForm.address.name"
				@placeSelected="handlePlaceSelected"
			/>
		</div>
		<div class="form__group">
			<CusInput
				:id="'cargo-details-input'"
				:labelText="$t('Cargo details')"
				:placeholder="$t('Insert details')"
				type="textarea"
				v-model="tripForm.cargoDetails"
			/>
		</div>
	</form>
</template>
<script lang="ts" src="./TripForm.ts"></script>
