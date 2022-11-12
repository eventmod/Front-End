<template>
  <div class="h-full py-16">
    <div class="flex flex-col bg-white w-11/12 rounded-lg justify-center mx-auto shadow-lg px-10 py-12 gap-y-4">
      <span class="font-extrabold text-2xl">{{ event.eventTitle }}</span>
      <!-- <span class="font-normal text-sm text-gray-400 -mt-4">3 May 2022</span> -->
      <img :src="`${host}/Files/${event.eventCover}`" class="w-full rounded-lg mx-auto object-cover" />
      <div class="text-justify text-sm">
        {{ event.eventLongDescription }}
      </div>
      <!-- Event Date Range -->
      <div class="">
        <span class="font-bold text-sm">Event Date Range</span>
        <div class="flex flex-row text-xs">
          <span class="">{{ day(new Date(event.eventStartDate)) }},&nbsp;</span>
          <span class="">{{ month(new Date(event.eventStartDate)) }}&nbsp;</span>
          <span class="">{{ date(new Date(event.eventStartDate)) }}</span>
          <span class="">&nbsp;-&nbsp;</span>
          <span class="">{{ day(new Date(event.eventEndDate)) }},&nbsp;</span>
          <span class="">{{ month(new Date(event.eventEndDate)) }}&nbsp;</span>
          <span class="">{{ date(new Date(event.eventEndDate)) }}</span>
        </div>
      </div>
      <!-- Event Date Range -->

      <!-- Event Time Range -->
      <div class="">
        <span class="font-bold text-sm">Event Date Range</span>
        <div class="flex flex-row text-xs">
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
      <!-- Event Time Range -->

      <!-- Type Of Event -->
      <div class="flex flex-col">
        <span class="font-bold text-sm">Type Of Event</span>
        <span class="text-xs">{{ event.eventType }}</span>
      </div>
      <!-- Type Of Event -->
      <!-- Location -->
      <div class="flex flex-col">
        <span class="font-bold text-sm">Location</span>
        <span class="text-xs">{{ event.eventLocation }}</span>
      </div>
      <!-- Location -->

      <!-- College Years -->
      <div class="flex flex-col">
        <span class="font-bold text-sm">College Years</span>
        <span class="text-xs">{{ event.eventYear }}</span>
      </div>
      <!-- College Years -->

      <!-- Number of Participant -->
      <div class="flex flex-col">
        <span class="font-bold text-sm">Number of Participant</span>
        <span class="text-xs">{{ event.eventNumberOfPeople }}&nbsp;participants.</span>
      </div>
      <!-- Number of Participant -->

      <!-- First day for Recruitment -->
      <div class="flex flex-col">
        <span class="font-bold text-sm">First day for Recruitment</span>
        <div class="flex flex-row text-xs">
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
        <span class="font-bold text-sm">Last day for Recruitment</span>
        <div class="flex flex-row text-xs">
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

      <!-- Contact -->
      <div class="flex flex-col gap-y-1">
        <span class="font-bold text-sm">Contact (Name and Phone Number)</span>
        <div v-for="c in contact" :key="c.contactID" class="flex flex-col text-xs">
          <div class=""><span class="font-semibold underline">Name:</span> {{ c.contactName }}</div>
          <div class=""><span class="font-semibold underline">Phone:</span> {{ c.contactPhone }}</div>
          <div class=""><span class="font-semibold underline">Email:</span> {{ c.contactEmail }}</div>
        </div>
      </div>
      <!-- Contact -->
      
    </div>
  </div>
</template>

<script>
import liff from "@line/liff";

export default {
  data() {
    return {
      host: process.env.VUE_APP_EVENTMOD_HOST + "/api",

      param: "",

      event: {},
      contact: [],
    };
  },
  methods: {
    async fetchEvent() {
      const res = await fetch(`${this.host}/events/${this.param}`, {
        method: "GET",
      });
      const data = await res.json();
      return data;
    },

    async fetchContact() {
      const res = await fetch(`${this.host}/eventcontact/${this.param}`, {
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
    await liff.init({ liffId: '1657618262-bmwyAAVo' });

    // if (!liff.isLoggedIn()) {
    //   liff.login()
    // }

    const urlParams = new URLSearchParams(window.location.search);
    this.param = urlParams.get('param')

    this.event = await this.fetchEvent();
    this.contact = await this.fetchContact();
  },
};
</script>
