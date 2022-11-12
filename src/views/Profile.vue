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
      userDetail: '',

			isAdmin: false,
			isCreator: false,
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
        this.user = user
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
		await this.getUserFromToken();
    if (localStorage.getItem('token') === null) {
      await this.$router.push("/")
    } else {
			if (await this.user.creators !== null && await this.user.admins === null) {
				this.isCreator = true
				this.isAdmin = false
				this.userDetail = this.fetchCreator()
			} else if (await this.user.admins !== null && await this.user.creators === null) {
				this.isAdmin = true
				this.isCreator = false
				this.userDetail = this.fetchAdmin()
			}
		}
	}
};
</script>