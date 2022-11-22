<template>
	<div id="aa" class="pt-52">
    <NavBar class="overflow-hidden fixed top-0 w-full z-10" />
    <div class="flex flex-col bg-white mx-80 z-20 rounded-lg shadow-lg px-10 py-12 gap-y-8">
      <div v-if="isAdmin" class="flex flex-col">
				<span class="font-bold text-4xl">{{ userDetail.adminName }}'s Profile</span>
				<div class="">
					<span class="">Username: </span>
					<span class="">{{ user.username }}</span>
				</div>
			</div>
			<div v-if="isCreator">
				<span>Creator</span>
				<span>{{ userDetail.username }}</span>
			</div>
    </div>
    <Footer class="mt-40 w-full" />
  </div>
</template>

<style>
#aa{
  background-image: url(../assets/Group1.png);
  background-repeat: no-repeat;
  background-size: 100% 28rem;
}
</style>

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
      const admin = await response.json();
			return admin
    },

    async fetchCreator() {
      const response = await fetch(`${this.host}/creator/${this.$route.params.id}`,{method: "GET"})
      const creator = response.json();
			return creator
    },
	},

	async created() {
    if (localStorage.getItem('token') === null) {
      await this.$router.push("/")
    } else {
			await this.getUserFromToken();
			if (await this.user.creators !== null && await this.user.admins === null) {
				this.isCreator = true
				this.isAdmin = false
				this.userDetail = await this.fetchCreator()
			} else if (await this.user.admins !== null && await this.user.creators === null) {
				this.isAdmin = true
				this.isCreator = false
				this.userDetail = await this.fetchAdmin()
			}
		}
	}
};
</script>