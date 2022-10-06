<template>
	<div id="aa" class="Each Event pt-52">
    <NavBar class="overflow-hidden fixed top-0 w-full z-10" />
    <div class="flex flex-col bg-white mx-80 z-20 rounded-lg shadow-lg px-10 py-12 gap-y-8">
      <span class="font-bold text-4xl">{{ user.username }}</span>
    </div>
    <Footer class="mt-40 w-full" />
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
      host: process.env.VUE_APP_EVENTMOD_HOST + "/api",
      user: '',
      userDetail: ''
		}
	},
	methods: {
    getUserFromToken: async function() {
			let token = localStorage.getItem('token')
			const res = await fetch(`${this.host}/me`,{
				method: "GET",
				headers: {
						"Authorization": token,
					},
			})
			if (res.ok) {
				const user = await res.json()
        return user;
			}
		},

    async fetchAdmin() {
      const response = await fetch(`${this.host}/admin/${this.$route.params.id}`,{method: "GET"})
      return response.json();
    },

    async fetchCreator() {
      const response = await fetch(`${this.host}/creator/${this.$route.params.id}`,{method: "GET"})
      return response.json();
    },
	},
	async created() {
    if (localStorage.getItem('token') == "") {
      this.$router.push("/")
    }
    this.user = await this.getUserFromToken();
    // this.userDetail = await this.fetchAdmin();
	}
};
</script>