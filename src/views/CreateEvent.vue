<template>
  <div class="">
    <NavBar class="overflow-hidden fixed top-0 w-full" />
    <div class="text-center my-12 mt-20">
      <span class="text-violet-900 font-bold text-2xl">Add Event</span>
    </div>
    <form @submit.prevent="submitForm">
      <div class="-mt-3 mx-72 px-4 py-3 bg-gray-50 grid grid-cols-2 gap-x-8 rounded-xl">
        <!-- Left Side -->
        <div id="left" class="flex flex-col gap-y-4">
          <!-- Title -->
          <div id="title" class="flex flex-col gap-y-2">
            <label for="title" class="uppercase text-violet-900 font-semibold select-none">Event Title</label>
            <input id="title" type="text" v-model="Ev_Name" placeholder="" :class="inputClass"/>
            <span v-if="this.invalidEv_Name" :class="errorText">**Please enter Title**</span>
          </div>
          <!-- Title -->
          <!-- Description -->
          <div id="description" class="flex flex-col gap-y-2">
            <label for="description" class="uppercase text-violet-900 font-semibold select-none">Event Description</label>
            <textarea id="description" v-model="Ev_Description" placeholder="" class="resize-none h-52" :class="inputClass" />
            <span v-if="this.invalidEv_Description" :class="errorText">**Please enter Description**</span>
          </div>
          <!-- Description -->
          <!-- Location -->
          <div id="location" class="flex flex-col gap-y-2">
            <label for="location" class="uppercase text-violet-900 font-semibold select-none">Location</label>
            <select class="" :class="inputClass" v-model="Ev_Location">
              <option class="">อาคารพระจอมเกล้าราชานุสรณ์ 190 ปี</option>
              <option class="">อาคารเรียนรวม 1</option>
              <option class="">อาคารเรียนรวม 2</option>
              <option class="">อาคารเรียนรวม 3</option>
              <option class="">อาคารเรียนรวม 4</option>
              <option class="">อาคารเรียนรวม 5</option>
              <option class="">อาคารคณะเทคโนโลยีสารสนเทศ</option>
              <option class="">อาคารคณะวิทยาศาสตร์</option>
              <option class="">อาคารวิศวะวัฒนะ</option>
            </select>
            <span v-if="this.invalidEv_Location" :class="errorText">**Please select Location**</span>
          </div>
          <!-- Location -->
          <!-- Number Of Participant -->
          <div id="noOfPar" class="flex flex-col gap-y-2">
            <label for="nop" class="" :class="labelInput">Number of Participants</label>
            <input id="nop" type="number" v-model="Ev_NumberOfPeople" placeholder="" class="" :class="inputClass"/>
            <span v-if="this.invalidEv_NumberOfPeople" :class="errorText">**Please enter Number of Participants**</span>
          </div>
          <!-- Number Of Participant -->
          <!-- College Year -->
          <div id="college_year" class="flex flex-col gap-y-2">
            <label for="college" class="" :class="labelInput">College Year</label>
            <input id="college" type="text" v-model="Ev_Year" placeholder="" class="" :class="inputClass" />
            <span v-if="this.invalidEv_Year" :class="errorText">**Please enter College Year**</span>
          </div>
          <!-- College Year -->
          <!-- Contact -->
          <div id="contact" class="flex flex-col gap-y-2">
            <div class="flex flex-row">
              <label for="contact" class="" :class="labelInput">Contact (Name and Phone Number)</label>
              <i class="ri-add-circle-line font-semibold text-gray-700 ml-auto"></i>
            </div>
            <div class="flex flex-row gap-x-2">
              <div class="flex flex-col gap-y-2">
                <div class="flex flex-row gap-x-4">
                  <label class="align-middle">Name</label>
                  <input id="contname" type="text" v-model="C_Name" placeholder="" class="" :disabled="true" :class="inputClass" />
                </div>
                <div class="flex flex-row gap-x-4">
                  <label class="align-middle">Phone</label>
                  <input id="contphone" type="text" v-model="C_Phone" placeholder="" class="" :disabled="true" :class="inputClass" />
                </div>
              </div>
              <div class="bg-green-400 text-center w-16 py-4 rounded-lg">
                <i class="ri-check-line text-3xl text-white"></i>
              </div>
              <div class="bg-red-400 text-center w-16 py-4 rounded-lg">
                <i class="ri-delete-bin-line text-3xl text-white"></i>
              </div>
            </div>
          </div>
          <!-- Contact -->
        </div>
        <!-- Left Side -->

        <!-- Right Side -->
        <div id="right" class="flex flex-col gap-y-4">
          <!-- Cover -->
          <div id="cover" class="flex flex-col gap-y-2">
            <label for="cover" class="" :class="labelInput">Event Cover</label>
            <div class='flex items-center justify-center w-full my-auto'>
              <label class='cursor-pointer flex flex-col border-3 border-dashed rounded-xl w-full h-60 hover:bg-gray-100'>
                <div v-if="!Ev_Cover" class='flex flex-col items-center justify-center py-20'>
                  <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <p class='uppercase text-sm text-gray-400 pt-1 tracking-wider select-none'>Select Photo</p>
                </div>
                <div id="preview" class="my-auto" v-else>
                  <img :src="imageshow" class="object-cover w-auto max-h-56 mx-auto rounded-xl"/>
                </div>
                <input id="image" type="file" class="hidden" @change="uploadPhoto($event)" />
              </label>
            </div>
            <span v-if="this.invalidEv_Cover" :class="errorText">**Please enter Cover**</span>
          </div>
          <!-- Cover -->
          <!-- Gender -->
          <div id="gender" class="flex flex-col gap-y-2">
            <label for="gender" class="" :class="labelInput">Gender</label>
            <select class="" :class="inputClass" v-model="Ev_Gender">
              <option class="">MALE</option>
              <option class="">FEMALE</option>
              <option class="">BOTH</option>
            </select>
            <span v-if="this.invalidEv_Gender" :class="errorText">**Please select Gender**</span>
          </div>
          <!-- Gender -->
          <!-- Date & Time (Start - End Event) -->
          <div id="dt" class="flex flex-col gap-y-2">
            <label for="" class="" :class="labelInput">Date & Time (Start event - End Event)</label>
            <input id="dt" type="datetime-local" v-model="D_SDate" placeholder="" class="" :disabled="true" :class="inputClass" />
            <input id="dt" type="datetime-local" v-model="D_StDate" placeholder="" class="" :disabled="true" :class="inputClass" />
          </div>
          <!-- Date & Time (Start - End Event) -->
          
          <!-- First Day Recruitment -->
          <div id="first_recruitment" class="flex flex-col gap-y-2">
            <label for="firstdtre" class="" :class="labelInput">First Day For Recruitment</label>
            <input id="firstdtre" type="datetime-local" v-model="Ev_StartRegis" placeholder="" class="" :class="inputClass" />
            <span v-if="this.invalidEv_StartRegis" :class="errorText">**Please choose First Day Recruitment**</span>
          </div>
          <!-- First Day Recruitment -->
          <!-- Last Day Recruitment -->
          <div id="last_recruitment" class="flex flex-col gap-y-2">
            <label for="lastdtre" class="" :class="labelInput">Last Day For Recruitment</label>
            <input id="lastdtre" type="datetime-local" v-model="Ev_EndRegis" placeholder="" class="" :class="inputClass" />
            <span v-if="this.invalidEv_EndRegis" :class="errorText">**Please choose Last Day Recruitment**</span>
          </div>
          <!-- Last Day Recruitment -->

        </div>
        <!-- Right Side -->
      
        <div id="SubmitButton" class="my-4 mt-40 col-span-2">
          <button type="submit" class="text-white bg-gradient-to-r from-orange-400 to-orange-300 w-full py-2 rounded-2xl shadow-lg text-lg uppercase">
            Submit
          </button>
        </div>
      </div>
    </form>

    <Footer class="mt-40 w-full" />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Create Event',
  components: {
    
  },
	props: {

	},
	emits: [
	],
	data() {
		return {
      inputClass: {
        "rounded-md focus:outline-none py-1 px-2 shadow-md": true,
      },
      labelInput: {
        "uppercase text-violet-900 font-semibold select-none": true,
      },
      errorText: {
        "text-red-500 text-sm text-left italic": true
      },
      // image: null,
			imageshow: '',

      /** v-model */
      Ev_Name: '',
      Ev_Cover: null,
      Ev_Description: '',
      Ev_Location: '',
      Ev_Gender: '',
      Ev_NumberOfPeople: 0,
      Ev_Year: '',
      Ev_StartRegis: '',
      Ev_EndRegis: '',

      Ac_ID: '',

      // D_StartEvent: '',
      // D_EndEvent: '',
      // C_Name: '',
      // C_Phone: '',

      /** v-model */

      invalidEv_Name: false,
      invalidEv_Cover: false,
      invalidEv_Description: false,
      invalidEv_Location: false,
      invalidEv_Gender: false,
      invalidEv_NumberOfPeople: false,
      invalidEv_Year: false,
      invalidEv_StartRegis: false,
      invalidEv_EndRegis: false,

      host: process.env.VUE_APP_EVENTMOD_HOST
		}
	},
	methods: {
    async submitForm() {

      this.invalidEv_Name = this.Ev_Name === "" ? true : false;
      this.invalidEv_Cover = this.Ev_Cover === null ? true : false;
      this.invalidEv_Description = this.Ev_Description === "" ? true : false;
      this.invalidEv_Location = this.Ev_Location === "" ? true : false;
      this.invalidEv_Gender = this.Ev_Gender === "" ? true : false;
      this.invalidEv_NumberOfPeople = this.Ev_NumberOfPeople === 0 ? true : false;
      this.invalidEv_Year = this.Ev_Year === "" ? true : false;
      this.invalidEv_StartRegis = this.Ev_StartRegis === "" ? true : false;
      this.invalidEv_EndRegis = this.Ev_EndRegis === "" ? true : false;

      const checkForm = !(this.invalidEv_Name || this.invalidEv_Cover || this.invalidEv_Description || this.invalidEv_Location || this.invalidEv_Gender || this.invalidEv_NumberOfPeople || this.invalidEv_Year || this.invalidEv_StartRegis || this.invalidEv_EndRegis)

      if (checkForm) {
        const data = {
          eventName: this.Ev_Name,
          eventCover: this.Ev_Cover.name,
          eventDescription: this.Ev_Description,
          eventLocation: this.Ev_Location,
          eventGender: this.Ev_Gender,
          eventNumberOfPeople: this.Ev_NumberOfPeople,
          eventYear: this.Ev_Year,
          eventStartRegis: new Date(this.Ev_StartRegis),
          eventEndRegis: new Date(this.Ev_EndRegis),
          accountID: 2
        }

      console.log(data)
      this.addEvent(data)

      }
    },

    async addEvent(data) {

      let formData = new FormData();

      formData.append("event",JSON.stringify(data))
      formData.append("file", this.Ev_Cover, data.ev_Cover)

      const res = await fetch(`${this.host}/addEventWithImage`,{
        method: "POST",
        body: formData
      })

      if (res.ok) {
        console.log("Success")
        this.$router.push("/")
      }

    },

    async uploadPhoto(e) {
			this.Ev_Cover = e.target.files[0];
			this.imageshow = e.target.files[0];
			var reader = new FileReader();
			reader.onload = (e) => {
				this.imageshow = e.target.result;
			};
			reader.readAsDataURL(this.imageshow);
			console.log(this.Ev_Cover);
			console.log(this.Ev_Cover.name);
		},
	},
	async created() {
    
	}
}
</script>
