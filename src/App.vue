<template>
	<CusLoading />
	<router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import CusLoading from "sharedLibrary/CusLoading.vue"

export default defineComponent({
	name: "LayoutView",
	components: {
		CusLoading,
	},
})
</script>
