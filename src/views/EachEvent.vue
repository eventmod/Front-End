<template>
  <div id="aa" class="Each Event pt-52">
    <NavBar class="overflow-hidden fixed top-0 w-full z-10" />
    <div class="flex flex-col bg-white mx-80 z-20 rounded-lg shadow-lg px-10 py-12 gap-y-8">
      <span class="font-bold text-4xl">{{ event.eventName }}</span>
      <!-- <span class="font-normal text-sm text-gray-400 -mt-4">3 May 2022</span> -->
      <img :src="`${host}/Files/${event.eventCover}`" class="w-full rounded-lg mx-auto object-cover" />
      <div class="text-justify">
        {{ event.eventDescription }}
      </div>
      <!-- Date & Time (Start event - end event) -->
      <div class="flex flex-col">
        <span class="font-bold">Date & Time (Start event - end event)</span>
        <div class="flex flex-row gap-x-4">
          <span class="">Tuesday, May 3</span>
          <span class="">9:30 am - 12:00 pm</span>
        </div>
      </div>
      <!-- Date & Time (Start event - end event) -->

      <!-- Location -->
      <div class="flex flex-col">
        <span class="font-bold">Location</span>
        <span class="">{{ event.eventLocation }}</span>
      </div>
      <!-- Location -->

      <div class="grid grid-cols-2 gap-y-8">
        <!-- College Years -->
        <div class="grid grid-cols-3">
          <span class="font-bold">College Years</span>
          <span class="">{{ event.eventYear }}</span>
        </div>
        <!-- College Years -->

        <!-- Number of Participant -->
        <div class="grid grid-cols-6">
          <span class="font-bold col-span-3">Number of Participant</span>
          <span class="">{{ event.eventNumberOfPeople }}</span>
          <span class="col-span-2">participants.</span>
        </div>
        <!-- Number of Participant -->
        
        <!-- Gender -->
        <div class="grid grid-cols-3">
          <span class="font-bold">Gender</span>
          <span class="">{{ event.eventGender }}</span>
        </div>
        <!-- Gender -->
      </div>

      <div class="grid grid-cols-2 gap-y-8">
        <!-- First day for Recruitment -->
        <div class="flex flex-col">
          <span class="font-bold">First day for Recruitment</span>
          <div class="flex flex-row gap-x-4">
            <span class="">{{ this.eventFirstRegis.day }}, {{ this.eventFirstRegis.month }} {{this.eventFirstRegis.date}} {{ this.eventFirstRegis.year }}</span>
            <span class="">{{ this.eventFirstRegis.hour }}:{{ this.eventFirstRegis.minute }} {{ this.eventFirstRegis.ampm }}</span>
          </div>
        </div>
        <!-- First day for Recruitment -->

        <!-- Last day for Recruitment -->
        <div class="flex flex-col">
          <span class="font-bold">Last day for Recruitment</span>
          <div class="flex flex-row gap-x-4">
            <span class="">{{ this.eventLastRegis.day }}, {{ this.eventLastRegis.month }} {{this.eventLastRegis.date}} {{ this.eventLastRegis.year }}</span>
            <span class="">{{ this.eventLastRegis.hour }}:{{ this.eventLastRegis.minute }} {{ this.eventLastRegis.ampm }}</span>
          </div>
        </div>
        <!-- Last day for Recruitment -->
      </div>

      <!-- Contact -->
      <div class="flex flex-col gap-y-2">
        <span class="font-bold">Contact (Name and Phone Number)</span>
        <div class="flex flex-row gap-x-2">
          <span class="">P'Win</span>
          <span class="">(064-163-2345)</span>
        </div>
      </div>
      <!-- Contact -->
      
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
// @ is an alias to /src

export default {
  name: 'Each Event',
  components: {
    
  },
	props: {

	},
	emits: [
	],
	data() {
		return {
      event: [],
      eventFirstRegis: {
        year: '',
        day: '',
        month: '',
        date: '',
        hour: '',
        minute: '',
        ampm: ''
      },
      eventLastRegis: {
        year: '',
        day: '',
        month: '',
        date: '',
        hour: '',
        minute: '',
        ampm: ''
      },

      host: process.env.VUE_APP_EVENTMOD_HOST,
		}
	},
	methods: {
    async fetchEvent() {
      const res = await fetch(`${this.host}/events/${this.$route.params.id}`, {
        method: "GET",
      });
      const data = await res.json();
      return data;
    },

    async splitDate() {

      var dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      const firstRegis = new Date(this.event.eventStartRegis)
      const lastRegis = new Date(this.event.eventEndRegis)

      this.eventFirstRegis.year = firstRegis.getFullYear()
      this.eventFirstRegis.day = dayOfWeek[firstRegis.getDay()]
      this.eventFirstRegis.month = monthNames[firstRegis.getMonth()]
      this.eventFirstRegis.date = firstRegis.getDate()
      this.eventFirstRegis.hour = firstRegis.getHours()
      this.eventFirstRegis.minute = firstRegis.getMinutes()

      this.eventFirstRegis.ampm = this.eventFirstRegis.hour >= 12 ? 'pm' : 'am';
      this.eventFirstRegis.hour = this.eventFirstRegis.hour % 12;
      this.eventFirstRegis.hour = this.eventFirstRegis.hour ? this.eventFirstRegis.hour : 12;
      this.eventFirstRegis.hour = this.eventFirstRegis.hour <=9 ? '0' + this.eventFirstRegis.hour : this.eventFirstRegis.hour;
      this.eventFirstRegis.minute = this.eventFirstRegis.minute <=9 ? '0' + this.eventFirstRegis.minute : this.eventFirstRegis.minute;

      this.eventLastRegis.year = lastRegis.getFullYear()
      this.eventLastRegis.day = dayOfWeek[lastRegis.getDay()]
      this.eventLastRegis.month = monthNames[lastRegis.getMonth()]
      this.eventLastRegis.date = lastRegis.getDate()
      this.eventLastRegis.hour = lastRegis.getHours()
      this.eventLastRegis.minute = lastRegis.getMinutes()

      this.eventLastRegis.ampm = this.eventLastRegis.hour >= 12 ? 'pm' : 'am';
      this.eventLastRegis.hour = this.eventLastRegis.hour % 12;
      this.eventLastRegis.hour = this.eventLastRegis.hour ? this.eventLastRegis.hour : 12;
      this.eventLastRegis.hour = this.eventLastRegis.hour <=9 ? '0' + this.eventLastRegis.hour : this.eventLastRegis.hour;
      this.eventLastRegis.minute = this.eventLastRegis.minute <=9 ? '0' + this.eventLastRegis.minute : this.eventLastRegis.minute;

    }
	},
	async created() {
    this.event = await this.fetchEvent();
    this.splitDate();
	}
}
</script>