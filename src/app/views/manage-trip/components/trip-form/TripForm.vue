<template>
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
			<SearchPlaces
				v-model="tripForm.address.name"
				@placeSelected="handlePlaceSelected"
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
<script lang="ts" src="./TripForm.ts"></script>
