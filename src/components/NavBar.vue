<template>
	<div class="navbar">
    <div class="bg-gradient-to-r from-purple-900 to-purple-700 py-2 px-44 flex">
      <a href="/home" class="flex flex-row">
        <img src="../assets/logo.png" class="mr-1 w-6 h-6" />
				<span class="text-white font-bold align-middle select-none">Eventmod</span>
      </a>
      <div class=" ml-auto">
        <a v-if="this.userLogin.creators != null" href="/create" class="text-white select-none">New Event</a>
				<a v-if="this.userLogin.admins != null" href="/manage" class="text-white select-none">Manage Account</a>
        <span class="text-white bg-gradient-to-r from-orange-500 to-orange-300 select-none rounded-full px-2 ml-3 align-middle">
					<a :href="`/profile/${this.userLogin.accountID}`">{{ this.username }}</a>
				</span>
				<button type="button" @click="logout()" class="text-white bg-gradient-to-r from-orange-500 to-orange-300 select-none rounded-full px-1 ml-3 align-middle">
					<i class="ri-logout-box-line align-middle"></i>
				</button>
      </div>
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
	],
	data() {
		return {
			host: process.env.VUE_APP_EVENTMOD_HOST + "/api",
			userLogin: Object,
			username: ""
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
      // console.log(res)
      // console.log(res.ok)
			if (res.ok) {
				const user = await res.json()
        // console.log(user)
        return user;
				// this.userLogin = user
        // const username = await user.username
        // this.username = username
			}
		},

		logout () {
			localStorage.removeItem("token")
			setTimeout(this.$router.push("/"), 500)
		},
	},
	async created() {
		if (localStorage.getItem('token') === null) {
      this.$router.push("/")
    }
    this.userLogin = await this.getUserFromToken();
		this.username = await this.userLogin.username
	}
};
</script>