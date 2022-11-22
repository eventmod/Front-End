<template>
	<div class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-end flex">
    <div class="relative w-full">
			<!--content-->
			<div class="bg-white outline-none focus:outline-none px-96 py-8">
				<!--body-->
				<div class="px-48 space-y-6">
					<div id="username" class="grid grid-cols-3">
						<label class="uppercase text-violet-900 font-semibold select-none my-auto">Username<span class="text-red-600 align-middle">*</span></label>
						<input type="text" v-model="inputUsername" class="col-span-2 rounded-md focus:outline-none h-12 py-1 px-2 shadow-md bg-gray-100" />
					</div>
					<div id="name" class="grid grid-cols-3">
						<label class="uppercase text-violet-900 font-semibold select-none my-auto">Creator Name<span class="text-red-600 align-middle">*</span></label>
						<input type="text" v-model="inputName" class="col-span-2 rounded-md focus:outline-none h-12 py-1 px-2 shadow-md bg-gray-100" />
					</div>
					<div id="type" class="grid grid-cols-3">
						<label class="uppercase text-violet-900 font-semibold select-none my-auto">Creator Type<span class="text-red-600 align-middle">*</span></label>
						<select class="col-span-2 rounded-md focus:outline-none h-12 py-1 px-2 shadow-md bg-gray-100" v-model="inputType">
							<option class=""></option>
						</select>
					</div>
					<div id="faculty" class="grid grid-cols-3">
						<div class="flex flex-col">
							<label class="uppercase text-violet-900 font-semibold select-none my-auto">Faculty</label>
							<span class=" text-xs uppercase text-violet-900 font-semibold select-none my-auto">(Optional)</span>
						</div>
						<input type="text" v-model="inputFaculty" class="col-span-2 rounded-md focus:outline-none h-12 py-1 px-2 shadow-md bg-gray-100" />
					</div>
					
					<div class="flex flex-row gap-4">
						<button type="button" class="text-white bg-gradient-to-r from-orange-400 to-orange-300
            w-full py-2 rounded-full shadow-lg text-lg uppercase" @click="newAccount()">Add Account</button>
						<button type="button" class="text-white w-full py-2 rounded-full shadow-lg text-lg uppercase"
						style="background-color:#424874;" @click="close()">Close</button>
					</div>
				</div>
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
      user: '',
      userDetail: '',
			inputUsername: '',
			inputName: '',
			inputType: '',
			inputFaculty: '',

      showModal: false,
      status: 0,
		}
	},
	methods: {

		newAccount: async function() {
			if (this.inputUsername != '' && this.inputName != '' && this.inputType != '') {
				let formData = new FormData()
				formData.append("username",this.inputUsername)
				formData.append("password","password")
				if (this.inputFaculty != '') {
					formData.append("faculty",this.inputFaculty)
				}
				const response = await fetch(`${this.host}/register`,{method: "POST", body: formData})
				if(response.ok) {
					const res = await fetch(`${this.host}/getID/${this.inputUsername}`,{
						method: "GET",
						headers: {
							"Content-type": "application/json",
						}})
					const ac = await res.json()
					// console.log(ac.accountID)
					const creatorData = {
						creatorID: ac.accountID,
						creatorName: this.inputName,
						creatorDescription: 'x',
						creatorType: this.inputType,
						creatorLeadName: 'x',
						creatorLeadMajor: 'x',
						creatorAdvName: 'x',
						creatorAdvPosition: 'x',
					}
					const resp = await fetch(`${this.host}/newCreator`,{
						method: "POST",
						headers: {
							"Content-type": "application/json",
						},
						body: JSON.stringify(creatorData)
					})
					if (resp.ok) {
						this.showModal = true
						this.status = 1
						setTimeout( () => location.reload(), 1000);	
					} else {
						this.showModal =true
						this.status = 0
						setTimeout( () => location.reload(), 1000);
					}
				} 
			}
		},

		close: async function() {
			this.inputUsername = ""
			this.inputFaculty = ""
			this.$emit("close");
		},

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
			} else {
				this.$router.push("/")
			}
		},
	},
	async created() {
    if (localStorage.getItem('token') == "") {
      this.$router.push("/")
    } else {
    this.user = await this.getUserFromToken();
		}
	}
};
</script>