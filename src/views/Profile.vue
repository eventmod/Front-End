<template>
	<div id="aa" class="pt-52">
    <NavBar class="overflow-hidden fixed top-0 w-full z-10" />
    <div class="flex flex-col bg-white mx-80 z-20 rounded-lg shadow-lg px-10 py-12 gap-y-8">
			<div v-if="isShowDetail" class="flex flex-col space-y-6">
				<span class="font-bold text-4xl">{{ userDetail.creatorName }}'s Profile</span>
				<div class="flex flex-row text-lg">
					<span class="font-semibold">Username:&nbsp;</span>
					<span class="">{{ user.username }}</span>
				</div>
				<div class="flex flex-row text-lg">
					<span class="font-semibold">Description:&nbsp;</span>
					<span class="">{{ userDetail.creatorDescription }}</span>
				</div>
				<div class="flex flex-row text-lg">
					<span class="font-semibold">Type:&nbsp;</span>
					<span class="">{{ userDetail.creatorType }}</span>
				</div>
				<div v-if="user.accountFaculty!=null" class="flex flex-row text-lg">
					<span class="font-semibold">Faculty:&nbsp;</span>
					<span class="">{{ user.accountFaculty }}</span>
				</div>
				<div class="flex flex-row text-lg">
					<span class="font-semibold">Lead Name:&nbsp;</span>
					<span class="">{{ userDetail.creatorLeadName }}</span>
				</div>
				<div class="flex flex-row text-lg">
					<span class="font-semibold">Lead Major:&nbsp;</span>
					<span class="">{{ userDetail.creatorLeadMajor }}</span>
				</div>
				<div class="flex flex-row text-lg">
					<span class="font-semibold">Advisor Name:&nbsp;</span>
					<span class="">{{ userDetail.creatorAdvName }}</span>
				</div>
				<div class="flex flex-row text-lg">
					<span class="font-semibold">Advisor Position:&nbsp;</span>
					<span class="">{{ userDetail.creatorAdvPosition }}</span>
				</div>
				<div id="EditProfileAndChangePassword" class="grid grid-cols-2 gap-x-8">
					<div id="EditProfileButton" class="">
						<button type="button" class="text-white w-full py-2 rounded-full shadow-lg text-lg uppercase" @click="showEditProfile()" style="background-color:#424874;">
							Edit Profile
						</button>
					</div>
					<div id="ChangePasswordButton" class="">
						<button type="button" class="text-white bg-gradient-to-r from-orange-400 to-orange-300 w-full py-2 rounded-full shadow-lg text-lg uppercase" @click="showChangePassword()" >
							Change Password
						</button>
					</div>
				</div>
			</div>

			<div v-if="isEdit">
				<span class="font-bold text-4xl">{{ userDetail.creatorName }}'s Profile</span>
				<form @submit.prevent="editProfile" class="mt-8">
					<div class="flex flex-col gap-y-4">
						<div class="grid grid-cols-12 text-lg">
							<label class="col-span-3 uppercase text-violet-900 font-semibold my-auto select-none">Username:&nbsp;</label>
							<input type="text" v-model="inputUsername" placeholder="Username" class="col-span-5" :class="inputClass" disabled/>
						</div>
						<div class="grid grid-cols-12 text-lg">
							<label class="col-span-3 uppercase text-violet-900 font-semibold my-auto select-none">Description:&nbsp;</label>
							<textarea id="description" v-model="inputDescription" placeholder="Description" class="col-span-5 resize-none h-36 rounded-md focus:outline-none py-1 px-2 shadow-md bg-gray-100" maxlength="599" />
						</div>
						<div class="grid grid-cols-12 text-lg">
							<label class="col-span-3 uppercase text-violet-900 font-semibold my-auto select-none">Type:&nbsp;</label>
							<input type="text" v-model="inputType" placeholder="Type" class="col-span-5" :class="inputClass" disabled/>
						</div>
						<div v-if="user.accountFaculty!=null" class="grid grid-cols-12 text-lg">
							<label class="col-span-3 uppercase text-violet-900 font-semibold my-auto select-none">Faculty:&nbsp;</label>
							<input type="text" v-model="inputFaculty" placeholder="Faculty" class="col-span-5" :class="inputClass" disabled/>
						</div>
						<div class="grid grid-cols-12 text-lg">
							<label class="col-span-3 uppercase text-violet-900 font-semibold my-auto select-none">Lead Name:&nbsp;</label>
							<input type="text" v-model="inputLeadName" placeholder="Lead Name" class="col-span-5" :class="inputClass"/>
						</div>
						<div class="grid grid-cols-12 text-lg">
							<label class="col-span-3 uppercase text-violet-900 font-semibold my-auto select-none">Lead Major:&nbsp;</label>
							<input type="text" v-model="inputLeadMajor" placeholder="Lead Major" class="col-span-5" :class="inputClass"/>
						</div>
						<div class="grid grid-cols-12 text-lg">
							<label class="col-span-3 uppercase text-violet-900 font-semibold my-auto select-none">Advisor Name:&nbsp;</label>
							<input type="text" v-model="inputAdvisorName" placeholder="Advisor Name" class="col-span-5" :class="inputClass"/>
						</div>
						<div class="grid grid-cols-12 text-lg">
							<label class="col-span-3 uppercase text-violet-900 font-semibold my-auto select-none">Advisor Position:&nbsp;</label>
							<input type="text" v-model="inputAdvisorPosition" placeholder="Advisor Position" class="col-span-5" :class="inputClass"/>
						</div>
						<div class="grid grid-cols-12 mt-4">
							<button type="submit" class="col-span-8 text-white bg-gradient-to-r from-orange-400 to-orange-300 w-2/3 py-2 rounded-full shadow-lg text-lg uppercase mx-auto">Submit</button>
						</div>
					</div>
				</form>
			</div>

			<div v-if="isShowChangePassword" class="">
				<span class="font-bold text-4xl">{{ userDetail.creatorName }}'s Profile</span>
				<form @submit.prevent="submitChange" class="mt-8">
					<div class="flex flex-col gap-y-4">
						<div class="grid grid-cols-3">
							<label class="" :class="labelInput">Old Password</label>
							<input type="password" v-model="inputOldPassword" placeholder="Old Password" :class="inputClass" />
						</div>
						<div class="grid grid-cols-3">
							<label class="" :class="labelInput">New Password</label>
							<input type="password" v-model="inputNewPassword" placeholder="New Password" :class="inputClass" />
						</div>
						<div class="grid grid-cols-3">
							<label class="" :class="labelInput">Confirm New Password</label>
							<input type="password" v-model="inputConfirmNewPassword" placeholder="Confirm New Password" :class="inputClass" />
						</div>
						<div class="grid grid-cols-3 mt-4">
							<button type="submit" class="col-span-2 text-white bg-gradient-to-r from-orange-400 to-orange-300 w-1/2 py-2 rounded-full shadow-lg text-lg uppercase mx-auto">Submit</button>
						</div>
					</div>
				</form>
			</div>
    </div>
		<div v-if="showModal">
			<status-modal :status="this.status" />
			<div class="opacity-50 fixed inset-0 z-40 bg-black"></div>
		</div>
    <Footer class="mt-40 w-full" />
  </div>
</template>

<style>
#aa{
  background-image: url(../assets/Group1.png);
  background-repeat: no-repeat;
  background-size: 100% 24rem;
}
</style>

<script>
import StatusModal from '../components/StatusModal.vue'

export default {
	components: {
		StatusModal,
	},
	props: {

	},
	emits: [
	],
	data() {
		return {

			inputClass: {
        "rounded-md focus:outline-none h-12 py-1 px-2 shadow-md bg-gray-100": true,
      },
      labelInput: {
        "uppercase text-violet-900 font-semibold my-auto select-none": true,
      },
      errorText: {
        "text-red-500 text-xs text-left italic": true
      },

			showModal: false,
      status: 0,

      host: process.env.VUE_APP_EVENTMOD_HOST + "/api",
      user: '',
      userDetail: '',

			isShowDetail: true,
			isEdit: false,
			isShowChangePassword: false,

			inputOldPassword: '',
			inputNewPassword: '',
			inputConfirmNewPassword: '',

			inputUsername: '',
			inputDescription: '',
			inputType: '',
			inputFaculty: '',
			inputLeadName: '',
			inputLeadMajor: '',
			inputAdvisorName: '',
			inputAdvisorPosition: '',

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

		async cancelAll() {
			this.isShowDetail = true
			this.isEdit = false
			this.isShowChangePassword = false
		},

		async showEditProfile() {
			this.isShowDetail = false
			this.isEdit = true
			this.isShowChangePassword = false
			this.inputUsername = this.user.username
			this.inputDescription = this.userDetail.creatorDescription
			this.inputType = this.userDetail.creatorType
			this.inputFaculty = this.user.accountFaculty
			this.inputLeadName = this.userDetail.creatorLeadName
			this.inputLeadMajor = this.userDetail.creatorLeadMajor
			this.inputAdvisorName = this.userDetail.creatorAdvName
			this.inputAdvisorPosition = this.userDetail.creatorAdvPosition
		},

		async showChangePassword() {
			this.isShowDetail = false
			this.isEdit = false
			this.isShowChangePassword = true
		},

		async editProfile() {
			const creatorData = {
				creatorID: this.userDetail.creatorID,
				creatorName: this.userDetail.creatorName,
				creatorDescription: this.inputDescription ,
				creatorType: this.inputType ,
				creatorLeadName: this.inputLeadName,
				creatorLeadMajor: this.inputLeadMajor,
				creatorAdvName: this.inputAdvisorName,
				creatorAdvPosition: this.inputAdvisorPosition,
			}

			const response = await fetch(`${this.host}/updateCreatorDetail`,{
				method: "PUT", 
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(creatorData)
			})

			if (response.ok) {
				this.showModal = true
				this.status = 1
				setTimeout( () => location.reload(), 1000);
			} else {
				this.showModal = true
				this.status = 0
				setTimeout( () => location.reload(), 1000);
			}

		},

		async submitChange() {
			if (this.inputOldPassword != '' && this.inputNewPassword != '' && this.inputConfirmNewPassword != '' && this.inputNewPassword == this.inputConfirmNewPassword) {
				let formData = new FormData()
				formData.append("id", this.user.accountID)
				formData.append("oldpassword", this.inputOldPassword)
				formData.append("newpassword", this.inputNewPassword)
				const response = await fetch(`${this.host}/changePassword`,{method: "PUT", body: formData})
				if (response.ok) {
					this.showModal = true
					this.status = 1
					setTimeout( () => localStorage.removeItem("token"), 1000);
					setTimeout( () => this.$router.push("/"), 1000);
				} else {
					this.showModal = true
					this.status = 0
				}
			} else {
				alert("Please complete the information.")
			}
		}
	},

	async created() {
    if (localStorage.getItem('token') === null) {
      await this.$router.push("/")
    } else {
			await this.getUserFromToken();
			if (await this.user.creators !== null && await this.user.admins === null) {
				this.userDetail = await this.fetchCreator()
			} else if (await this.user.admins !== null && await this.user.creators === null) {
				// this.userDetail = await this.fetchAdmin()
				this.$router.push("/home")
			}
		}
	}
};
</script>