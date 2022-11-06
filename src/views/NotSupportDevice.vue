<template>
	<div class="">
    <span>This device is not supported in the system.</span>
  </div>
</template>

<script>

export default {
	components: { 

		},
	props: {
		
	},
	emits: [
		
	],
	data() {
		return {
			
		};
	},
	methods: {
		
	},

  async created() {
    if(window.innerWidth >= 1024) {
      this.$router.push("/")
    }
  }
}
</script>
