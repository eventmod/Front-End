<template>
	<div id="" class="pt-10">
    <NavBar class="overflow-hidden fixed top-0 w-full z-10" />
    <div class="bg-white px-44 py-8">
      <div class="mb-2">
        <span class="text-violet-900 font-semibold text-2xl">Admin System</span>
      </div>
      <div class="flex flex-row gap-x-8">
        <div class="flex flex-col">
          <span class="text-slate-500">Total number of creator accounts</span>
          <span class="text-orange-400 font-semibold">{{ this.creators.length }} Creator Accounts</span>
        </div>
        <div class="flex flex-col">
          <span class="text-slate-500">Add Creator account</span>
          <button class="border border-violet-800 text-violet-800 rounded-md py-1 mr-4" @click="showAddAccount = true"><span class="ri-add-fill align-middle"></span>Add Account</button>
        </div>
      </div>
    </div>
    <div class="mx-44 mt-4 border-b border-b-slate-400">
      <span class="text-violet-900 border-b-2 border-b-violet-900 select-none">All creator accounts</span>
    </div>
    <div class="col-span-8 flex flex-row rounded-md shadow-md bg-white justify-self-center w-1/3 my-4 h-12 px-2 mx-44">
      <i class="ri-search-line text-lg self-center text-gray-400"></i>
      <input id="searchCreator" type="text" v-model="inputSearchCreator" placeholder="Search for creator account" class="rounded-md focus:outline-none py-1 px-2 w-full placeholder-gray-400" />
    </div>
    <div v-for="a in accounts" :key="a.creatorID" class="mx-44 mb-4">
      <div v-if="a.creators != null" class="flex flex-col bg-white space-y-1 px-20 py-4">
        <div class="grid grid-cols-3">
          <span class="font-semibold">Creator name</span>
          <span class="">{{ a.creators.creatorName }}</span>
          <div class="text-right space-x-3">
            <button type="button" class="text-violet-900 border border-violet-900 rounded-md w-8 h-8" @click="deleteAccount(a.creators.creatorID, a.accountID)"><i class="ri-delete-bin-line"></i></button>
            <button type="button" class="text-violet-900 border border-violet-900 rounded-md w-8 h-8"><i class="ri-edit-2-line"></i></button>
          </div>
        </div>
        <div class="grid grid-cols-3">
          <span class="font-semibold">Username</span>
          <span class="">{{ a.username }}</span>
          <div class="text-right">
            <button type="button" class="text-violet-900 border-b border-b-violet-900" @click="resetPassword(a.accountID)">Reset Password</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showAddAccount" class="">
      <NewAccount class="" @close="this.showAddAccount = false" />
      <div class="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>

    <Footer class="mt-40 w-full" />
  </div>
</template>

<script>

import NewAccount from '../../components/NewAccountModal.vue'

export default {
	components: {
    NewAccount,
	},
	props: {

	},
	emits: [
	],
	data() {
		return {
      host: process.env.VUE_APP_EVENTMOD_HOST + "/api",
      showAddAccount: false,
      user: null,
      userDetail: '',
      accounts: '',
      admins: '',
      creators: '',

      inputSearchCreator: '',
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
      const response = await fetch(`${this.host}/admins`,{method: "GET"})
      return response.json();
    },

    async fetchCreator() {
      const response = await fetch(`${this.host}/creators`,{method: "GET"})
      return response.json();
    },

    async fetchAccount() {
      const response = await fetch(`${this.host}/accounts`,{method: "GET"})
      return response.json();
    },

    async resetPassword(accountID) {
      alert(accountID)
    },

    async deleteAccount(creatorID, accountID) {
      console.log(creatorID)
      console.log(accountID)
      const res = await fetch(`${this.host}/delCreator/${creatorID}`,{method: "DELETE"})
      if (res.ok) {
        const response = await fetch(`${this.host}/delAccount/${accountID}`,{method: "DELETE"})
        if (response.ok) {
					setTimeout( () => location.reload(), 1000);

        }
      }
    },
	},
	async created() {
    this.user = await this.getUserFromToken();
    if (localStorage.getItem('token') === null && await this.user.admins === null) {
      this.$router.push("/")
    }
    this.accounts = await this.fetchAccount()
    this.admins = await this.fetchAdmin()
    this.creators = await this.fetchCreator()
	}
};
</script>