<template>
	<div class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
		<div class="relative w-1/5">
			<!--content-->
			<div class="rounded-3xl bg-white outline-none focus:outline-none py-4">
				<!--header-->
				<div class="flex flex-col items-start justify-between">
					<!-- Close Icon -->
					<button class="ri-close-line px-1 ml-auto text-black float-right text-3xl font-semibold" v-on:click="close(false)" />
				</div>
				<!--header-->

				<!--body-->
        <span class="text-violet-900 text-lg font-medium p-2">Confirm Delete</span>
				<div class="text-center space-x-12">
					<button class="text-white py-0.5 w-16 rounded-full shadow-lg text-lg uppercase bg-gradient-to-r from-orange-400 to-orange-300" @click="close(true)">YES</button>
          <button class="text-white py-0.5 w-16 rounded-full shadow-lg text-lg uppercase" style="background-color:#424874;" @click="close(false)">NO</button>
				</div>
				<!--body-->
			</div>
			<!--content-->
		</div>
	</div>
</template>

<script>


export default {
	components: { 

		},
	props: {

	},
	emits: [
		"confirm"
	],
	data() {
		return {
		};
	},
	methods: {
		async close (x) {
			this.$emit("confirm", x);
		},
	},
};
</script>
