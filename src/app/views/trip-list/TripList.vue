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
				<CusTable :columns="columns" :data-source="listTrips">
					<template #bodyCell="{ column, item }">
						<template v-if="column.key === 'clientName'">
							<CusAvatar
								:name="item.clientName"
								:staticColor="false"
								class="mr-4"
							/>
							{{ item.clientName }}
						</template>
						<template v-if="column.key === 'address'">
							<div class="address" :title="item.address.name">
								{{ item.address.name }}
							</div>
						</template>
						<template v-if="column.key === 'departureDate'">
							{{ $filters.formatDate(item.departureDate) }}
						</template>
						<template v-if="column.key === 'createdAt'">
							{{ $filters.formatDate(item.createdAt) }}
						</template>
						<template v-if="column.key === 'action'">
							<i class="icon-edit" @click="showEdit(item.id)" />
						</template>
					</template>
				</CusTable>
			</template>
		</CusCard>
	</div>
</template>

<script lang="ts" src="./TripList.ts"></script>
<style lang="scss" src="./TripList.scss"></style>
