<template>
	<CusTable :columns="columns" :data-source="list">
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
				<i class="icon-edit" @click="goToEdit(item.id)" />
			</template>
		</template>
	</CusTable>
</template>
<script lang="ts" src="./TripTable.ts"></script>
