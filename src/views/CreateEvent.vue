<template>
  <div class="">
    <NavBar class="overflow-hidden fixed top-0 w-full" />
    <div class="my-11 pt-12 mx-72">
      <span class="text-violet-900 font-bold text-2xl">Add Event</span>
    </div>
    <form @submit.prevent="submitForm">
      <div class="-mt-3 mx-72 px-4 py-3 bg-white rounded-xl shadow-xl">
        <!-- Step & Progress Bar -->
        <div class="mb-8 space-y-2">
          <div class="text-center">
            <p class="text-violet-900 font-medium">- Step {{ stepPage }} of 2 -</p>
          </div>
          <div class="mx-12 h-2 bg-gray-200 rounded-full">
            <div v-if="stepPage === 1" class="grid grid-cols-2 h-2">
              <div class="bg-orange-400 rounded-full"></div>
              <div class="rounded-full"></div>
            </div>
            <div v-else class="grid grid-cols-2 h-2">
              <div class="rounded-full"></div>
              <div class="bg-orange-400 rounded-full"></div>
            </div>
          </div>
        </div>
        <!-- Step & Progress Bar -->

        <!-- Form Step 1 -->
        <div v-if="stepPage === 1" class="grid grid-cols-2 gap-x-8 gap-y-4">
          <!-- Left Side -->
          <div id="left" class="flex flex-col gap-y-4">
            <!-- Title -->
            <div id="title" class="flex flex-col gap-y-2">
              <label for="title" class="" :class="labelInput">Event Title</label>
              <input id="title" type="text" v-model="Ev_Name" placeholder="" :class="inputClass"/>
              <span v-if="this.invalidEv_Name" :class="errorText">**Please enter Title**</span>
            </div>
            <!-- Title -->
            <!-- College Year -->
            <div id="college_year" class="flex flex-col gap-y-2">
              <label for="college" class="" :class="labelInput">College Year</label>
              <input id="college" type="text" v-model="Ev_Year" placeholder="" class="" :class="inputClass" />
              <span v-if="this.invalidEv_Year" :class="errorText">**Please enter College Year**</span>
            </div>
            <!-- College Year -->
            <!-- Number Of Participant -->
            <div id="noOfPar" class="flex flex-col gap-y-2">
              <label for="nop" class="" :class="labelInput">Number of Participants</label>
              <input id="nop" type="number" v-model="Ev_NumberOfPeople" placeholder="" class="" :class="inputClass"/>
              <span v-if="this.invalidEv_NumberOfPeople" :class="errorText">**Please enter Number of Participants**</span>
            </div>
            <!-- Number Of Participant -->
          </div>
          <!-- Left Side -->

          <!-- Right Side -->
          <div id="right" class="flex flex-col gap-y-4">
            <!-- Description -->
            <div id="description" class="flex flex-col gap-y-2">
              <label for="description" class="" :class="labelInput">Event Description</label>
              <textarea id="description" v-model="Ev_Description" placeholder="" class="resize-none h-36 rounded-md focus:outline-none py-1 px-2 shadow-md bg-gray-100" />
              <span v-if="this.invalidEv_Description" :class="errorText">**Please enter Long Description**</span>
            </div>
            <!-- Description -->
            <!-- Short Description -->
            <div id="shortdes" class="flex flex-col gap-y-2">
              <label for="shortdes" class="" :class="labelInput">Short Description</label>
              <input id="shortdes" type="text" v-model="Ev_ShortDesc" placeholder="" class="" :class="inputClass" />
              <span v-if="this.invalidEv_ShortDesc" :class="errorText">**Please enter Short Description**</span>
            </div>
            <!-- Short Description -->
            
          </div>
          <!-- Right Side -->

          <!-- Cover -->
          <div id="cover" class="flex flex-col gap-y-2 col-span-2">
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

          <div id="NextButton" class="my-4 mt-12 col-span-2">
            <button type="button" class="text-white bg-gradient-to-r from-orange-400 to-orange-300
            w-full py-2 rounded-full shadow-lg text-lg uppercase" @click="stepPage += 1">
              Next
            </button>
          </div>
        </div>
        <!-- Form Step 1 -->

        <!-- Form Step 2 -->
        <div v-if="stepPage === 2" class="">
          <div class="grid grid-cols-2 gap-x-8">
            <!-- Left Side -->
            <div id="left" class="flex flex-col gap-y-4">
              <!-- Type Of Event -->
              <div id="toe" class="flex flex-col gap-y-2">
                <label for="toe" class="" :class="labelInput">Type Of Event</label>
                <select class="" :class="inputClass" v-model="Ev_Type">
                  <option class="">Online</option>
                  <option class="">On-Site</option>
                </select>
                <span v-if="this.invalidEv_Type" :class="errorText">**Please select Type**</span>
              </div>
              <!-- Type Of Event -->
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
              <!-- Cost -->
              <div id="cost" class="flex flex-col gap-y-2">
                <label for="cost" class="" :class="labelInput">Cost</label>
                <input id="cost" type="number" v-model="Ev_Cost" placeholder="" class="" :class="inputClass" />
                <span v-if="this.invalidEv_Cost" :class="errorText">**Please enter Cost**</span>
              </div>
              <!-- Cost -->
              <!-- Contact 1 -->
              <div id="contact1" class="flex flex-col gap-y-2">
                <label for="contact1" class="" :class="labelInput">Contact 1</label>
                <div class="flex flex-row gap-x-2">
                  <input id="cname1" type="text" v-model="cname1" placeholder="Name" :class="inputClass" />
                  <span v-if="this.invalidCname1" :class="errorText">**Please Enter Contact Name**</span>
                  <input id="cphone1" type="text" v-model="cphone1" placeholder="Mobile Phone" :class="inputClass" />
                  <span v-if="this.invalidCphone1" :class="errorText">**Please Enter Contact Phone Number**</span>
                </div>
                <input id="cmail1" type="text" v-model="cmail1" placeholder="Email" :class="inputClass" />
                <span v-if="this.invalidCmail1" :class="errorText">**Please Enter Contact Mail**</span>
              </div>
              <!-- Contact 1 -->
              <!-- Contact 2 -->
              <div id="contact2" class="flex flex-col gap-y-2">
                <label for="contact2" class="" :class="labelInput">Contact 2</label>
                <div class="flex flex-row gap-x-2">
                  <input id="cname2" type="text" v-model="cname2" placeholder="Name" :class="inputClass" />
                  <input id="cphone2" type="text" v-model="cphone2" placeholder="Mobile Phone" :class="inputClass" />
                </div>
                <input id="cmail2" type="text" v-model="cmail2" placeholder="Email" :class="inputClass" />
              </div>
              <!-- Contact 2 -->
            </div>
            <!-- Left Side -->

            <!-- Right Side -->
            <div id="right" class="flex flex-col gap-y-4">
              <!-- Location -->
              <div id="location" class="flex flex-col gap-y-2">
                <label for="location" class="" :class="labelInput">Location</label>
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

              <!-- Start -->
              <div class="flex flex-col gap-y-2">
                <label for="start" class="" :class="labelInput">Start Event</label>
                <div class="grid grid-cols-2 gap-x-4">
                  <div class="flex flex-col gap-y-2">
                    <input id="startdate" type="date" v-model="Ev_StartDate" placeholder="" class="" :class="inputClass" />
                    <span v-if="this.invalidEv_StartDate" :class="errorText">**Please choose Start Event Date**</span>
                  </div>
                  <div class="flex flex-col gap-y-2">
                    <input id="starttime" type="time" v-model="Ev_StartTime" placeholder="" class="" :class="inputClass" />
                    <span v-if="this.invalidEv_StartTime" :class="errorText">**Please choose Start Event Time**</span>
                  </div>
                </div>
              </div>
              <!-- Start -->

              <!-- End -->
              <div id="end" class="flex flex-col gap-y-2">
                <label for="end" class="" :class="labelInput">End Event</label>
                <div class="grid grid-cols-2 gap-x-4">
                  <div class="flex flex-col gap-y-2">
                    <input id="enddate" type="date" v-model="Ev_EndDate" placeholder="" class="" :class="inputClass" />
                    <span v-if="this.invalidEv_EndDate" :class="errorText">**Please choose End Event Date**</span>
                  </div>
                  <div class="flex flex-col gap-y-2">
                    <input id="endtime" type="time" v-model="Ev_EndTime" placeholder="" class="" :class="inputClass" />
                    <span v-if="this.invalidEv_EndTime" :class="errorText">**Please choose End Event Time**</span>
                  </div>
                </div>
              </div>
                <!-- End -->
              
              <!-- Note -->
              <div id="note" class="flex flex-col gap-y-2">
                <label for="note" class="" :class="labelInput">Note ...</label>
                <textarea id="note" v-model="Ev_Note" placeholder=". . . . . . . . ." class="resize-none rounded-md focus:outline-none py-1 px-2 shadow-md bg-gray-100" style="height: 22rem;" />
              </div>
              <!-- Note -->
            </div>
            <!-- Right Side -->
          </div>
          <!-- Button -->
          <div id="BackAndSubmit" class="my-4 mt-12 grid grid-cols-2 gap-x-8">
            <div id="BackButton" class="">
              <button type="button" class="text-white w-full py-2 rounded-full shadow-lg text-lg uppercase" 
              @click="stepPage -= 1" style="background-color:#424874;">
                Back
              </button>
            </div>
            <div id="SubmitButton" class="">
              <button type="submit" class="text-white bg-gradient-to-r from-orange-400 to-orange-300 
              w-full py-2 rounded-full shadow-lg text-lg uppercase" >
                Submit
              </button>
            </div>
          </div>
          <!-- Button -->
        </div>
        <!-- Form Step 2 -->
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
      stepPage: 1,
      users: '',

      inputClass: {
        "rounded-md focus:outline-none h-12 py-1 px-2 shadow-md bg-gray-100": true,
      },
      labelInput: {
        "uppercase text-violet-900 font-semibold select-none": true,
      },
      errorText: {
        "text-red-500 text-xs text-left italic": true
      },
      // image: null,
			imageshow: '',

      /** v-model */
      Ev_Name: '',
      Ev_Cover: null,
      Ev_Description: '',
      Ev_ShortDesc: '',
      Ev_Cost: 0,
      Ev_Location: '',
      Ev_Type: '',
      Ev_Gender: '',
      Ev_NumberOfPeople: 0,
      Ev_Year: '',
      Ev_StartRegis: '',
      Ev_EndRegis: '',
      Ev_StartDate: '',
      Ev_StartTime: '',
      Ev_EndDate: '',
      Ev_EndTime: '',
      Ev_Note: null,

      accountID: 0,

      cname1: '',
      cphone1: '',
      cmail1: '',

      cname2: '',
      cphone2: '',
      cmail2: '',

      /** v-model */

      invalidEv_Name: false,
      invalidEv_Cover: false,
      invalidEv_Description: false,
      invalidEv_ShortDesc: false,
      invalidEv_Cost: false,
      invalidEv_Location: false,
      invalidEv_Type: false,
      invalidEv_NumberOfPeople: false,
      invalidEv_Year: false,
      invalidEv_StartRegis: false,
      invalidEv_EndRegis: false,
      invalidEv_StartDate: false,
      invalidEv_StartTime: false,
      invalidEv_EndDate: false,
      invalidEv_EndTime: false,

      invalidCname1: false,
      invalidCphone1: false,
      invalidCmail1: false,

      host: process.env.VUE_APP_EVENTMOD_HOST
		}
	},
	methods: {
    // submitForm(){
    //   alert("1")
    // },
    submitForm() {

      this.invalidEv_Name = this.Ev_Name === "" ? true : false;
      this.invalidEv_Cover = this.Ev_Cover.name === "" ? true : false;
      this.invalidEv_Description = this.Ev_Description === "" ? true : false;
      this.invalidEv_ShortDesc = this.Ev_ShortDesc === "" ? true : false;
      this.invalidEv_Cost = this.Ev_Cost === 0 ? true : false;
      this.invalidEv_Location = this.Ev_Location === "" ? true : false;
      this.invalidEv_Type = this.Ev_Type === "" ? true : false;
      this.invalidEv_NumberOfPeople = this.Ev_NumberOfPeople === 0 ? true : false;
      this.invalidEv_Year = this.Ev_Year === "" ? true : false;
      this.invalidEv_StartRegis = this.Ev_StartRegis === "" ? true : false;
      this.invalidEv_EndRegis = this.Ev_EndRegis === "" ? true : false;
      this.invalidEv_StartDate = this.Ev_StartDate === "" ? true : false;
      this.invalidEv_StartTime = this.Ev_StartTime === "" ? true : false;
      this.invalidEv_EndDate = this.Ev_EndDate === "" ? true : false;
      this.invalidEv_EndTime = this.Ev_EndTime === "" ? true : false;

      this.invalidCname1 = this.cname1 === "" ? true : false;
      this.invalidCphone1 = this.cphone1 === "" ? true : false;
      this.invalidCmail1 = this.cmail1 === "" ? true : false;

      const checkForm = !(this.invalidEv_Name || this.invalidEv_Cover || this.invalidEv_Description || this.invalidEv_ShortDesc || this.invalidEv_Cost || this.invalidEv_Location || 
                          this.invalidEv_Type || this.invalidEv_NumberOfPeople || this.invalidEv_Year || this.invalidEv_StartRegis || 
                          this.invalidEv_EndRegis ||this.invalidEv_StartDate || this.invalidEv_StartTime || this.invalidEv_EndDate || this.invalidEv_EndTime ||
                          this.invalidCname1 || this.invalidCphone1 || this.invalidCmail1)
      
      if (checkForm) {
        const data = {
          eventTitle: this.Ev_Name,
          eventCover: this.Ev_Cover.name,
          eventShortDescription: this.Ev_ShortDesc,
          eventLongDescription: this.Ev_Description,
          eventLocation: this.Ev_Location,
          eventNumberOfPeople: this.Ev_NumberOfPeople,
          eventStartDate: new Date(this.Ev_StartDate),
          eventStartTime: this.Ev_StartTime,
          eventEndDate: new Date(this.Ev_EndDate),
          eventEndTime: this.Ev_EndTime,
          eventStartRegis: new Date(this.Ev_StartRegis),
          eventEndRegis: new Date(this.Ev_EndRegis),
          eventCost: this.Ev_Cost,
          eventYear: this.Ev_Year,
          eventType: this.Ev_Type,
          eventNote: this.Ev_Note,
          accountID: this.accountID
        }

      // console.log(data)
      this.addEvent(data)

      }
    },

    async addEvent(data) {

      // let formData = new FormData();

      // formData.append("event",JSON.stringify(data))
      // formData.append("file", this.Ev_Cover, this.Ev_Cover.name)

      // const res = await fetch(`${this.host}/addEventWithImage`,{
      //   method: "POST",
      //   body: formData
      // })
      let formData = new FormData()
      formData.append("file", this.Ev_Cover,this.Ev_Cover.name);
      const res = await fetch(`${this.host}/uploadImage`,{method: "POST", body: formData})
      if (res.ok) {
        const resp = await fetch(`${this.host}/addEvent`,{
          method: "POST", 
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data)
          })
        if (resp.ok) {
        // console.log(res)
        const r = await fetch(`${this.host}/getEventByTitle/${this.Ev_Name}`,{method: "GET"})
        const x = r.json()
        const dataContact = {
          contactName: this.cname1,
          contactPhone: this.cphone1,
          contactEmail: this.cmail1,
          eventID: x.eventID
        }
        // alert("addEvent" + res.status)
        const response = await fetch(`${this.host}/addContact`,{
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(dataContact)
        })
        console.log("response: "+response)
        if (response.ok) {
          alert("addContact" + response.status)
          this.$router.push("/home")
        }
      }
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
    async getAccountIDFromToken() {
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
        this.users = user
        // console.log(user)
        this.accountID = user.accountID
			}
		},
	},
  
	async created() {
    if (localStorage.getItem('token') != null && this.users.creators != null) {
      this.$router.push("/")
    }
    await this.getAccountIDFromToken();
	}
}
</script>
