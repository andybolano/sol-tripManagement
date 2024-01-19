<template>
	<div class="container">
		<CusCard :title="'Trip List'">
			<template #body>
				<p>List</p>
			</template>
		</CusCard>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
	name: "TripList",
})
</script>
