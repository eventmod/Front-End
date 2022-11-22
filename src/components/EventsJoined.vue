<template>
	<div class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex shadow-xl">
		<!-- <div class="relative"> -->
			<!--content-->
			<div class="rounded-3xl bg-white outline-none focus:outline-none w-3/5 h-60">
				<!--header-->
				<div class="flex flex-col items-start justify-between">
					<!-- Close Icon -->
					<button class="ri-close-line p-1 ml-auto text-black float-right text-3xl font-semibold" v-on:click="cancel()" />
				</div>
				<!--header-->

				<!--body-->
				<div class="flex justify-center">
					<table class="w-full text-center">
						<thead>
							<th>Student ID</th>
							<th>Name</th>
							<th>KMUTT Mail</th>
						</thead>
						<tr v-for="l in lineAccount" :key="l.lineaccounts.lineaccID">
							<td>{{ l.lineaccounts.lineaccStudentID }}</td>
							<td>{{ l.lineaccounts.lineaccKmuttMail.split('.')[0].toUpperCase() }}</td>
							<td>{{ l.lineaccounts.lineaccKmuttMail }}</td>
						</tr>
					</table>
				</div>
				<!--body-->
			</div>
			<!--content-->
		<!-- </div> -->
	</div>
</template>

<script>

export default {
	props: {
		lineAccount: {
			type: Array,
			require: true,
		}
  },
	data() {
		return {
		}
	},
	methods: {
    cancel() {
      this.$emit("close");
    },
	},
	async created() {
		
	}
};
</script>
