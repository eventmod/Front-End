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
              <input id="title" type="text" v-model="eventName" placeholder="" :class="inputClass"/>
              <span v-if="this.invalideventName" :class="errorText">**Please enter Title**</span>
            </div>
            <!-- Title -->
            <!-- College Year -->
            <div id="college_year" class="flex flex-col gap-y-2">
              <label for="college" class="" :class="labelInput">College Year</label>
              <input id="college" type="text" v-model="eventYear" placeholder="" class="" :class="inputClass" />
              <span v-if="this.invalideventYear" :class="errorText">**Please enter College Year**</span>
            </div>
            <!-- College Year -->
            <!-- Number Of Participant -->
            <div id="noOfPar" class="flex flex-col gap-y-2">
              <label for="nop" class="" :class="labelInput">Number of Participants</label>
              <input id="nop" type="number" v-model="eventNumberOfPeople" placeholder="" class="" :class="inputClass"/>
              <span v-if="this.invalideventNumberOfPeople" :class="errorText">**Please enter Number of Participants**</span>
            </div>
            <!-- Number Of Participant -->
          </div>
          <!-- Left Side -->

          <!-- Right Side -->
          <div id="right" class="flex flex-col gap-y-4">
            <!-- Description -->
            <div id="description" class="flex flex-col gap-y-2">
              <label for="description" class="" :class="labelInput">Event Description</label>
              <textarea id="description" v-model="eventDescription" placeholder="" class="resize-none h-36 rounded-md focus:outline-none py-1 px-2 shadow-md bg-gray-100" maxlength="599" />
              <span v-if="this.invalideventDescription" :class="errorText">**Please enter Long Description**</span>
            </div>
            <!-- Description -->
            <!-- Short Description -->
            <div id="shortdes" class="flex flex-col gap-y-2">
              <label for="shortdes" class="" :class="labelInput">Short Description</label>
              <input id="shortdes" type="text" v-model="eventShortDesc" placeholder="" class="" :class="inputClass" maxlength="60" />
              <span v-if="this.invalideventShortDesc" :class="errorText">**Please enter Short Description**</span>
            </div>
            <!-- Short Description -->
            
          </div>
          <!-- Right Side -->

          <!-- Cover -->
          <div id="cover" class="flex flex-col gap-y-2 col-span-2">
            <label for="cover" class="" :class="labelInput">Event Cover</label>
            <div class='flex items-center justify-center w-full my-auto'>
              <label class='cursor-pointer flex flex-col border-3 border-dashed rounded-xl w-full h-60 hover:bg-gray-100'>
                <div v-if="!eventCover" class='flex flex-col items-center justify-center py-20'>
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
            <span v-if="this.invalideventCover" :class="errorText">**Please enter Cover**</span>
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
                <select class="" :class="inputClass" v-model="eventType">
                  <option class="">Online</option>
                  <option class="">On-Site</option>
                </select>
                <span v-if="this.invalideventType" :class="errorText">**Please select Type**</span>
              </div>
              <!-- Type Of Event -->
              <!-- First Day Recruitment -->
              <div id="first_recruitment" class="flex flex-col gap-y-2">
                <label for="firstdtre" class="" :class="labelInput">First Day For Recruitment</label>
                <input id="firstdtre" type="datetime-local" v-model="eventStartRegis" placeholder="" class="" :class="inputClass" />
                <span v-if="this.invalideventStartRegis" :class="errorText">**Please choose First Day Recruitment**</span>
              </div>
              <!-- First Day Recruitment -->
              <!-- Last Day Recruitment -->
              <div id="last_recruitment" class="flex flex-col gap-y-2">
                <label for="lastdtre" class="" :class="labelInput">Last Day For Recruitment</label>
                <input id="lastdtre" type="datetime-local" v-model="eventEndRegis" placeholder="" class="" :class="inputClass" />
                <span v-if="this.invalideventEndRegis" :class="errorText">**Please choose Last Day Recruitment**</span>
              </div>
              <!-- Last Day Recruitment -->
              <!-- Cost -->
              <div id="cost" class="flex flex-col gap-y-2">
                <label for="cost" class="" :class="labelInput">Cost (Baht)</label>
                <input id="cost" type="number" v-model="eventCost" placeholder="" class="" :class="inputClass" min="0" />
                <span v-if="this.invalideventCost" :class="errorText">**Please enter Cost**</span>
              </div>
              <!-- Cost -->
              <!-- Contact 1 -->
              <div id="contact1" class="flex flex-col gap-y-2">
                <label for="contact1" class="" :class="labelInput">Contact 1</label>
                <div class="grid grid-cols-2 gap-x-2 gap-y-2">
                  <input id="cname1" type="text" v-model="cname1" placeholder="Name" :class="inputClass" />
                  <input id="cphone1" type="text" v-model="cphone1" placeholder="Mobile Phone" :class="inputClass" />
                  <span v-if="this.invalidCname1" :class="errorText">**Please Enter Contact Name**</span>
                  <span v-if="this.invalidCphone1" :class="errorText">**Please Enter Contact Phone No.**</span>
                </div>
                <input id="cmail1" type="text" v-model="cmail1" placeholder="Email" :class="inputClass" />
                <span v-if="this.invalidCmail1" :class="errorText">**Please Enter Contact Mail**</span>
                <input id="crole1" type="text" v-model="crole1" placeholder="Role" :class="inputClass" />
                <span v-if="this.invalidCrole1" :class="errorText">**Please Enter Contact Role**</span>
              </div>
              <!-- Contact 1 -->
              <!-- Contact 2 -->
              <div id="contact2" class="flex flex-col gap-y-2">
                <label for="contact2" class="" :class="labelInput">Contact 2 (Fill "-" if not)</label>
                <div class="grid grid-cols-2 gap-x-2 gap-y-2">
                  <input id="cname2" type="text" v-model="cname2" placeholder="Name" :class="inputClass" />
                  <input id="cphone2" type="text" v-model="cphone2" placeholder="Mobile Phone" :class="inputClass" />
                  <span v-if="this.invalidCname2" :class="errorText">**Please Enter Contact Name**</span>
                  <span v-if="this.invalidCphone2" :class="errorText">**Please Enter Contact Phone No.**</span>
                </div>
                <input id="cmail2" type="text" v-model="cmail2" placeholder="Email" :class="inputClass" />
                <span v-if="this.invalidCmail2" :class="errorText">**Please Enter Contact Mail**</span>
                <input id="crole2" type="text" v-model="crole2" placeholder="Role" :class="inputClass" />
                <span v-if="this.invalidCrole2" :class="errorText">**Please Enter Contact Role**</span>
              </div>
              <!-- Contact 2 -->
            </div>
            <!-- Left Side -->

            <!-- Right Side -->
            <div id="right" class="flex flex-col gap-y-4">
              <!-- Location -->
              <div id="location" class="flex flex-col gap-y-2">
                <label for="location" class="" :class="labelInput">Location</label>
                <input id="location" type="text" v-model="eventLocation" placeholder="Location" :class="inputClass" />
                <span v-if="this.invalideventLocation" :class="errorText">**Please select Location**</span>
              </div>
              <!-- Location -->

              <!-- Start -->
              <div class="flex flex-col gap-y-2">
                <label for="start" class="" :class="labelInput">Start Event</label>
                <div class="grid grid-cols-2 gap-x-4">
                  <div class="flex flex-col gap-y-2">
                    <input id="startdate" type="date" v-model="eventStartDate" placeholder="dd-mm-yyyy" class="" :class="inputClass" />
                    <span v-if="this.invalideventStartDate" :class="errorText">**Please choose Start Event Date**</span>
                  </div>
                  <div class="flex flex-col gap-y-2">
                    <input id="starttime" type="time" v-model="eventStartTime" placeholder="dd-mm-yyyy" class="" :class="inputClass" />
                    <span v-if="this.invalideventStartTime" :class="errorText">**Please choose Start Event Time**</span>
                  </div>
                </div>
              </div>
              <!-- Start -->

              <!-- End -->
              <div id="end" class="flex flex-col gap-y-2">
                <label for="end" class="" :class="labelInput">End Event</label>
                <div class="grid grid-cols-2 gap-x-4">
                  <div class="flex flex-col gap-y-2">
                    <input id="enddate" type="date" v-model="eventEndDate" placeholder="" class="" :class="inputClass" />
                    <span v-if="this.invalideventEndDate" :class="errorText">**Please choose End Event Date**</span>
                  </div>
                  <div class="flex flex-col gap-y-2">
                    <input id="endtime" type="time" v-model="eventEndTime" placeholder="" class="" :class="inputClass" />
                    <span v-if="this.invalideventEndTime" :class="errorText">**Please choose End Event Time**</span>
                  </div>
                </div>
              </div>
                <!-- End -->
              
              <!-- Note -->
              <div id="note" class="flex flex-col gap-y-2">
                <label for="note" class="" :class="labelInput">Note ...</label>
                <textarea id="note" v-model="eventNote" placeholder=". . . . . . . . ." class="resize-none rounded-md focus:outline-none py-1 px-2 shadow-md bg-gray-100" style="height: 29rem;" />
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
      users: null,

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
      eventName: '',
      eventCover: null,
      eventDescription: '',
      eventShortDesc: '',
      eventCost: 0,
      eventLocation: '',
      eventType: '',
      eventGender: '',
      eventNumberOfPeople: 0,
      eventYear: '',
      eventStartRegis: '',
      eventEndRegis: '',
      eventStartDate: '',
      eventStartTime: '',
      eventEndDate: '',
      eventEndTime: '',
      eventNote: null,

      accountID: 0,

      cname1: '',
      cphone1: '',
      cmail1: '',
      crole1: '',

      cname2: '',
      cphone2: '',
      cmail2: '',
      crole2: '',

      /** v-model */

      invalideventName: false,
      invalideventCover: false,
      invalideventDescription: false,
      invalideventShortDesc: false,
      invalideventCost: false,
      invalideventLocation: false,
      invalideventType: false,
      invalideventNumberOfPeople: false,
      invalideventYear: false,
      invalideventStartRegis: false,
      invalideventEndRegis: false,
      invalideventStartDate: false,
      invalideventStartTime: false,
      invalideventEndDate: false,
      invalideventEndTime: false,

      invalidCname1: false,
      invalidCphone1:false,
      invalidCmail1: false,
      invalidCrole1: false,

      invalidCname2: false,
      invalidCphone2:false,
      invalidCmail2: false,
      invalidCrole2: false,

      host: process.env.VUE_APP_EVENTMOD_HOST + "/api"
		}
	},
	methods: {
    
    async submitForm() {

      this.invalideventName = this.eventName === "" ? true : false;
      this.invalideventCover = this.eventCover === null ? true : false;
      this.invalideventDescription = this.eventDescription === "" ? true : false;
      this.invalideventShortDesc = this.eventShortDesc === "" ? true : false;
      this.invalideventCost = this.eventCost < 0 ? true : false;
      this.invalideventLocation = this.eventLocation === "" ? true : false;
      this.invalideventType = this.eventType === "" ? true : false;
      this.invalideventNumberOfPeople = this.eventNumberOfPeople === 0 ? true : false;
      this.invalideventYear = this.eventYear === "" ? true : false;
      this.invalideventStartRegis = this.eventStartRegis === "" ? true : false;
      this.invalideventEndRegis = this.eventEndRegis === "" ? true : false;
      this.invalideventStartDate = this.eventStartDate === "" ? true : false;
      this.invalideventStartTime = this.eventStartTime === "" ? true : false;
      this.invalideventEndDate = this.eventEndDate === "" ? true : false;
      this.invalideventEndTime = this.eventEndTime === "" ? true : false;

      this.invalidCname1 = this.cname1 === "" || this.cname1 === "-" ? true : false;
      this.invalidCphone1 = this.cphone1 === "" || this.cphone1 === "-" ? true : false;
      this.invalidCmail1 = this.cmail1 === "" || this.cmail1 === "-" ? true : false;
      this.invalidCrole1 = this.crole1 === "" || this.crole1 === "-" ? true : false;

      this.invalidCname2 = this.cname2 === "" ? true : false;
      this.invalidCphone2 = this.cphone2 === "" ? true : false;
      this.invalidCmail2 = this.cmail2 === "" ? true : false;
      this.invalidCrole2 = this.crole2 === "" ? true : false;

      const checkForm = !(this.invalideventName || this.invalideventCover || this.invalideventDescription || this.invalideventShortDesc || this.invalideventCost || this.invalideventLocation || 
                          this.invalideventType || this.invalideventNumberOfPeople || this.invalideventYear || this.invalideventStartRegis || 
                          this.invalideventEndRegis ||this.invalideventStartDate || this.invalideventStartTime || this.invalideventEndDate || this.invalideventEndTime ||
                          this.invalidCname1 || this.invalidCphone1 || this.invalidCmail1 || this.invalidCrole1 ||
                          this.invalidCname2 || this.invalidCphone2 || this.invalidCmail2 || this.invalidCrole2)
      
      if (checkForm) {

        const stDate = new Date(this.eventStartDate)
        const stDateString = stDate.getFullYear() + "-" + (stDate.getMonth()+1) + "-" + stDate.getDate()

        const eDate = new Date(this.eventEndDate)
        const eDateString = eDate.getFullYear() + "-" + (eDate.getMonth()+1) + "-" + eDate.getDate()

        const stRegis = new Date(this.eventStartRegis)
        const stRegisString = stRegis.getFullYear() + "-" + (stRegis.getMonth()+1) + "-" + stRegis.getDate() + " " + this.hours(stRegis) + ":" + this.minutes(stRegis)

        const eRegis = new Date(this.eventEndRegis)
        const eRegisString = eRegis.getFullYear() + "-" + (eRegis.getMonth()+1) + "-" + eRegis.getDate() + " " + this.hours(eRegis) + ":" + this.minutes(eRegis)

        const data = {
          eventTitle: this.eventName,
          eventCover: "Event-Cover-" + this.eventCover.name,
          eventShortDescription: this.eventShortDesc,
          eventLongDescription: this.eventDescription,
          eventLocation: this.eventLocation,
          eventNumberOfPeople: this.eventNumberOfPeople,
          eventStartDate: stDateString,
          eventStartTime: this.eventStartTime,
          eventEndDate: eDateString,
          eventEndTime: this.eventEndTime,
          eventStartRegis: stRegisString,
          eventEndRegis: eRegisString,
          eventCost: this.eventCost,
          eventYear: this.eventYear,
          eventType: this.eventType,
          eventNote: this.eventNote,
          accountID: this.accountID
        }

      console.log(data)
      this.addEvent(data)

      }
    },

    hours(x) {
      var hour = x.getHours()
      hour = hour <=9 ? '0' + hour : hour;
      return hour
    },

    minutes(x) {
      var minute = x.getMinutes()
      minute = minute <=9 ? '0' + minute : minute;
      return minute
    },

    async addEvent(data) {

      let formData = new FormData()
      formData.append("file", this.eventCover, "Event-Cover-" + this.eventCover.name);
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
          const respo = await fetch(`${this.host}/getEventByTitle/${this.eventName}`,{method: "GET", headers: {"Content-type": "application/json",}})
          const x = await respo.json()
          console.log(data)
          console.log(x)
          const dataContact1 = {
            contactName: this.cname1,
            contactPhone: this.cphone1,
            contactEmail: this.cmail1,
            contactRole: this.crole1,
            eventID: x.eventID
          }
          const resContact = await fetch(`${this.host}/addContact`,{
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(dataContact1)
          })
          if(resContact.ok) {
            // ใส่ข้อมูล
            const dataContact2 = {
              contactName: this.cname2,
              contactPhone: this.cphone2,
              contactEmail: this.cmail2,
              contactRole: this.crole2,
              eventID: x.eventID
            }
            const resContact1 = await fetch(`${this.host}/addContact`,{
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(dataContact2)
            })
            if (resContact1.ok) {
              this.$router.push("/home")
            } else {
              alert(resContact1.status + "\n" + resContact1.statusText)
            }
          } else {
            alert(resContact.status + "\n" + resContact.statusText)
          }
        } else {
          alert(resp.status + "\n" + resp.statusText)
        }
      } else {
        alert(res.status + "\n" + res.statusText)
      }
    },

    async uploadPhoto(e) {
			this.eventCover = e.target.files[0];
			this.imageshow = e.target.files[0];
			var reader = new FileReader();
			reader.onload = (e) => {
				this.imageshow = e.target.result;
			};
			reader.readAsDataURL(this.imageshow);
			console.log(this.eventCover);
			console.log(this.eventCover.name);
		},

    async getAccountIDFromToken() {
			let token = localStorage.getItem('token')
			const res = await fetch(`${this.host}/me`,{
				method: "GET",
				headers: {
						"Authorization": token,
					},
			})
			if (res.ok) {
				const user = await res.json()
        this.users = user
        this.accountID = user.accountID
			}
		},
	},
  
	async created() {
    await this.getAccountIDFromToken();
    if (localStorage.getItem('token') === null && await this.users.creators === null) {
      this.$router.push("/")
    }
	}
}
</script>
