<template>
	<div class="row  q-col-gutter-x-md">
		<div class="col-12 col-md-8">
			{{ prices }}
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		prices: { default: [] }
	},
	components: {},
	computed: {		
	},
	methods: {}
})
</script>
<style lang="scss">
</style>