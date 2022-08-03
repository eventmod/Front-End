<template>
  <div id="aa" class="Each Event pt-52">
    <NavBar class="overflow-hidden fixed top-0 w-full z-10" />
    <div class="flex flex-col bg-white mx-80 z-20 rounded-lg shadow-lg px-10 py-12 gap-y-8">
      <span class="font-bold text-4xl">{{ event.eventTitle }}</span>
      <!-- <span class="font-normal text-sm text-gray-400 -mt-4">3 May 2022</span> -->
      <img :src="`${host}/Files/${event.eventCover}`" class="w-full rounded-lg mx-auto object-cover" />
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
          <span class="">{{ ampm(new Date(event.eventStartDate + " " + event.eventStartTime)) }}</span>
          <span class="">&nbsp;-&nbsp;</span>
          <span class="">{{ hours(new Date(event.eventEndDate + " " + event.eventEndTime)) }}</span>
          <span class="">:</span>
          <span class="">{{ minutes(new Date(event.eventEndDate + " " + event.eventEndTime)) }}&nbsp;</span>
          <span class="">{{ ampm(new Date(event.eventEndDate + " " + event.eventEndTime)) }}</span>
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
            <span class="">{{ ampm(new Date(event.eventStartRegis)) }}</span>
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
            <span class="">{{ ampm(new Date(event.eventEndRegis)) }}</span>
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
      return x.getDate()
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
	},
	async created() {
    this.event = await this.fetchEvent();
	}
}
</script>