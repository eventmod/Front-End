<template>
  <div id="aa" class="Each Event pt-52">
    <NavBar class="overflow-hidden fixed top-0 w-full z-10" />
    <div class="flex flex-col bg-white mx-80 z-20 rounded-lg shadow-lg px-10 py-12 gap-y-8">
      <div class="flex">
        <span class="font-bold text-4xl">{{ event.eventTitle }}</span>
        <span v-if="isOwnEvent" class="ml-auto text-4xl space-x-4 my-auto">
          <span class="ri-edit-line text-gray-500 hover:text-green-500" @click="edit()"/>
          <span class="ri-delete-bin-6-line text-gray-500 hover:text-red-500" @click="deleteEvent()"/>
        </span>
      </div>
      <!-- <span class="font-normal text-sm text-gray-400 -mt-4">3 May 2022</span> -->
      <img :src="this.imageCover" class="w-full rounded-lg mx-auto object-cover" />
      <div class="text-justify">
        {{ event.eventLongDescription }}
      </div>
      <!-- Date & Time (Start event - end event) -->
      <div class="flex flex-col">
        <span class="font-bold">Date & Time (Start event - end event)</span>
        <div class="flex flex-row">
          <span class="">{{ day(new Date(event.eventStartDate)) }},&nbsp;</span>
          <span class="">{{ month(new Date(event.eventStartDate)) }}&nbsp;</span>
          <span class="">{{ date(new Date(event.eventStartDate)) }}</span>
          <span class="">&nbsp;-&nbsp;</span>
          <span class="">{{ day(new Date(event.eventEndDate)) }},&nbsp;</span>
          <span class="">{{ month(new Date(event.eventEndDate)) }}&nbsp;</span>
          <span class="">{{ date(new Date(event.eventEndDate)) }}</span>
          <span class="">&nbsp;|&nbsp;</span>
          <span class="">{{ hours(new Date(event.eventStartDate + " " + event.eventStartTime)) }}</span>
          <span class="">:</span>
          <span class="">{{ minutes(new Date(event.eventStartDate + " " + event.eventStartTime)) }}&nbsp;</span>
          <!-- <span class="">{{ ampm(new Date(event.eventStartDate + " " + event.eventStartTime)) }}</span> -->
          <span class="">&nbsp;-&nbsp;</span>
          <span class="">{{ hours(new Date(event.eventEndDate + " " + event.eventEndTime)) }}</span>
          <span class="">:</span>
          <span class="">{{ minutes(new Date(event.eventEndDate + " " + event.eventEndTime)) }}&nbsp;</span>
          <!-- <span class="">{{ ampm(new Date(event.eventEndDate + " " + event.eventEndTime)) }}</span> -->
        </div>
      </div>
      <!-- Date & Time (Start event - end event) -->

      <div class="grid grid-cols-2 gap-y-8">
        <!-- Type Of Event -->
        <div class="flex flex-col">
          <span class="font-bold">Type Of Event</span>
          <span class="">{{ event.eventType }}</span>
        </div>
        <!-- Type Of Event -->
        <!-- Location -->
        <div class="flex flex-col">
          <span class="font-bold">Location</span>
          <span class="">{{ event.eventLocation }}</span>
        </div>
        <!-- Location -->
      </div>

      <div class="grid grid-cols-2 gap-y-8">
        <!-- College Years -->
        <div class="grid grid-cols-3">
          <span class="font-bold">College Years</span>
          <span class="">{{ event.eventYear }}</span>
        </div>
        <!-- College Years -->

        <!-- Number of Participant -->
        <div class="grid grid-cols-2">
          <span class="font-bold">Number of Participant</span>
          <span class="">{{ event.eventNumberOfPeople }}&nbsp;participants.</span>
        </div>
        <!-- Number of Participant -->
        
      </div>

      <div class="grid grid-cols-2 gap-y-8">
        <!-- First day for Recruitment -->
        <div class="flex flex-col">
          <span class="font-bold">First day for Recruitment</span>
          <div class="flex flex-row">
            <span class="">{{ day(new Date(event.eventStartRegis)) }},&nbsp;</span>
            <span class="">{{ month(new Date(event.eventStartRegis)) }}&nbsp;</span>
            <span class="">{{ date(new Date(event.eventStartRegis)) }}&nbsp;</span>
            <span class="">{{ year(new Date(event.eventStartRegis)) }}&nbsp;</span>
            <span class="">|&nbsp;</span>
            <span class="">{{ hours(new Date(event.eventStartRegis)) }}</span>
            <span class="">:</span>
            <span class="">{{ minutes(new Date(event.eventStartRegis)) }}&nbsp;</span>
            <!-- <span class="">{{ ampm(new Date(event.eventStartRegis)) }}</span> -->
          </div>
        </div>
        <!-- First day for Recruitment -->

        <!-- Last day for Recruitment -->
        <div class="flex flex-col">
          <span class="font-bold">Last day for Recruitment</span>
          <div class="flex flex-row">
            <span class="">{{ day(new Date(event.eventEndRegis)) }},&nbsp;</span>
            <span class="">{{ month(new Date(event.eventEndRegis)) }}&nbsp;</span>
            <span class="">{{ date(new Date(event.eventEndRegis)) }}&nbsp;</span>
            <span class="">{{ year(new Date(event.eventEndRegis)) }}&nbsp;</span>
            <span class="">|&nbsp;</span>
            <span class="">{{ hours(new Date(event.eventEndRegis)) }}</span>
            <span class="">:</span>
            <span class="">{{ minutes(new Date(event.eventEndRegis)) }}&nbsp;</span>
            <!-- <span class="">{{ ampm(new Date(event.eventEndRegis)) }}</span> -->
          </div>
        </div>
        <!-- Last day for Recruitment -->
      </div>

      <!-- Contact -->
      <div class="flex flex-col gap-y-2">
        <span class="font-bold">Contact (Name and Phone Number)</span>
        <div v-for="c in contact" :key="c.contactID" class="grid grid-cols-12 gap-x-2">
          <span class="col-span-3">{{ c.contactName }}</span>
          <span class="col-span-3">({{ c.contactPhone }})</span>
          <span class="col-span-6">Email: {{ c.contactEmail }}</span>

        </div>
      </div>
      <!-- Contact -->
      
    </div>
    <Footer class="mt-40 w-full" />
  </div>
  <div v-if="showModal">
    <confirm-modal @confirm="confirm" />
    <div class="opacity-50 fixed inset-0 z-40 bg-black"></div>
  </div>

  <div v-if="showStatusModal">
    <status-modal :status="this.status" />
    <div class="opacity-50 fixed inset-0 z-40 bg-black"></div>
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
// @ is an alias to /src

import ConfirmModal from '../components/ConfirmModal.vue';
import StatusModal from '../components/StatusModal.vue';


export default {
  name: 'Each Event',
  components: {
    ConfirmModal,
    StatusModal,
  },
	props: {

	},
	emits: [
	],
	data() {
		return {
      event: [],
      contact: [],
      users: {},

      imageCover: '',

      host: process.env.VUE_APP_EVENTMOD_HOST + "/api",

      showModal: false,

      showStatusModal: false,
      status: 0,

      isOwnEvent: true,
		}
	},
	methods: {

    async confirm(ans) {
      if(ans == false) {
        this.showModal = false
      } else {
        const res = await fetch(`${this.host}/deleteevents/${this.$route.params.id}`, {
          method: "DELETE",
        })
        if(res.ok) {
          this.showStatusModal = true
          this.status = 1
          setTimeout( () => this.$router.push("/home"), 1000);
        }
      }
    },

    async fetchEvent() {
      const res = await fetch(`${this.host}/events/${this.$route.params.id}`, {
        method: "GET",
      });
      const data = await res.json();
      return data;
    },

    async fetchContact() {
      const res = await fetch(`${this.host}/eventcontact/${this.$route.params.id}`, {
        method: "GET",
      });
      const data = await res.json();
      return data;
    },

    async edit() {
      this.$router.push("/edit/" + this.$route.params.id)
    },

    async deleteEvent() {
      this.showModal = true
    },

    day(x) {
      const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return dayOfWeek[x.getDay()];
    },

    month(x) {
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return monthNames[x.getMonth()];
    },

    year(x) {
      return x.getFullYear();
    },

    date(x) {
      var date = x.getDate()
      date = date <=9 ? '0' + date : date;
      return date
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

    ampm(x) {
      var ampm = x.getHours() >= 12 ? 'pm' : 'am';
      return ampm
    },

    getAccountIDFromToken: async function() {
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
			}
		},
	},
  
	async created() {
    await this.getAccountIDFromToken();
    if (localStorage.getItem('token') === null) {
      await this.$router.push("/")
    } else {
      this.event = await this.fetchEvent();
      this.contact = await this.fetchContact();
      this.imageCover = `${this.host}/Files/${this.event.eventCover}`
      if (await this.users.admins === null) {
        if (await this.users.creators.creatorID !== await this.event.accountID) {
          await this.$router.push("/home")
        }
      }
    }
    
	}
}
</script>