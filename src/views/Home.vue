<template>
  <div class="home" style="background-color: #F5F5FE;">
    <NavBar class="overflow-hidden fixed top-0 w-full" />
    <div class="pt-20 mx-72">
      <span class="text-violet-900 font-bold text-2xl">Hi, <span class="text-violet-700 font-semibold">{{ userLogin.username }}</span></span>
      <div class="flex flex-row bg-yellow-50 my-12 px-16 py-12">
        <div class="flex flex-col gap-y-4 mr-auto">
          <span class="text-violet-900 font-bold text-2xl">Welcome to EventMod</span>
          <span class="text-violet-900">Lorem Ipsum is simply dummy text of the printing and typeseng industry.</span>
          <a v-if="this.userLogin.creators != null" href="/create" class="text-white bg-gradient-to-r from-orange-400 to-orange-300 py-2 px-4 rounded-full shadow-lg text-lg capitalize w-5/12 text-center">New Event</a>
          <a v-if="this.userLogin.admins != null" href="/manage" class="text-white bg-gradient-to-r from-orange-400 to-orange-300 py-2 px-4 rounded-full shadow-lg text-lg capitalize w-5/12 text-center">Manage Account</a>
        </div>
        <div class="ml-auto mr-16">
          <img src="../assets/event.png" class="w-80" />
        </div>
      </div>
      
      <!-- Search Box -->
      <div class="grid grid-cols-12 w-full gap-y-6 gap-x-4">
        <!-- First Row -->
        <div class="col-span-2 justify-self-start">
          <select class="h-12 w-36" :class="inputClass" v-model="status">
            <option class="">Activate</option>
            <option class="">Deactivate</option>
          </select>
        </div>
        <div class="col-span-8 flex flex-row rounded-md shadow-md bg-white justify-self-center w-full h-12 px-2">
          <i class="ri-search-line text-lg self-center text-gray-400"></i>
          <input id="searchText" type="text" v-model="inputSearchText" placeholder="Search Event" class="rounded-md focus:outline-none py-1 px-2 w-full placeholder-gray-400" />
        </div>
        <div class="col-span-2 justify-self-end">
          <button type="button" :class="inputClass" class="h-12 w-36 space-x-1">
            <span class="ri-equalizer-line"></span>
            <span class="" @click="this.showFilters = !this.showFilters">Filters</span>
          </button>
        </div>
        <!-- First Row -->

        <!-- Second Row -->
        <div v-if="showFilters" class="col-span-3">
          <label class="" :class="labelInput">Creator Name</label>
          <select class="h-8 w-full" :class="inputClass" v-model="cname">
            <option class="">ชมรมติว</option>
            <option class="">ชมรมสันทนาการและเชียร์</option>
            <option class="">ชมรมไฟฟ้าวิชาการ</option>
            <option class="">ชมรมอนุรักษ์</option>
          </select>
        </div>
        <div v-if="showFilters" class="col-span-6">
          <label class="" :class="labelInput">Tag</label>
        </div>
        <div v-if="showFilters" class="col-span-3">
          <label class="" :class="labelInput">Type of Event</label>
          <select class="h-8 w-full" :class="inputClass" v-model="toe">
            <option class="">Online</option>
            <option class="">Onsite</option>
          </select>
        </div>
        <!-- Second Row -->
      </div>
      <!-- Search Box-->

      <!-- Each Event Component -->
      <div v-for="e in events" :key="e.eventID" class="">
        <a :href="`/each/${e.eventID}`">
          <div class="rounded-md shadow-md my-16 bg-slate-50 py-4 px-6">
            <div class="flex flex-row gap-x-16">
              <div class="flex flex-col gap-y-8 w-full">
                <div class="font-bold text-xl select-none">{{ e.eventTitle }}</div>
                <div class="select-none text-justify">{{ e.eventLongDescription }}</div>
              </div>
              <img :src="`${host}/Files/${e.eventCover}`" class="object-cover h-56 w-56 ml-auto" />
            </div>
            <div class="text-sm text-right mt-5 pt-3 border-t-2" style="color: #606367;">
              <span class="font-medium">Date &amp; Time: </span>
              <span class="">{{ day(new Date(e.eventStartDate)) }},&nbsp;</span>
              <span class="">{{ month(new Date(e.eventStartDate)) }}&nbsp;</span>
              <span class="">{{ date(new Date(e.eventStartDate)) }}</span>
              <span class=""> - </span>
              <span class="">{{ day(new Date(e.eventEndDate)) }},&nbsp;</span>
              <span class="">{{ month(new Date(e.eventEndDate)) }}&nbsp;</span>
              <span class="">{{ date(new Date(e.eventEndDate)) }}</span>
              <span class=""> | </span>
              <span class="">{{ hours(new Date(e.eventStartDate + " " + e.eventStartTime)) }}</span>
              <span class="">:</span>
              <span class="">{{ minutes(new Date(e.eventStartDate + " " + e.eventStartTime)) }}&nbsp;</span>
              <!-- <span class="">{{ ampm(new Date(e.eventStartDate + " " + e.eventStartTime)) }}</span> -->
              <span class=""> - </span>
              <span class="">{{ hours(new Date(e.eventEndDate + " " + e.eventEndTime)) }}</span>
              <span class="">:</span>
              <span class="">{{ minutes(new Date(e.eventEndDate + " " + e.eventEndTime)) }}&nbsp;</span>
              <!-- <span class="">{{ ampm(new Date(e.eventEndDate + " " + e.eventEndTime)) }}</span> -->
            </div>
          </div>
        </a>
      </div>
      <!-- Each Event Component -->

      

    </div>

    <Footer class="mt-40 w-full" />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    
  },
	props: {

	},
	emits: [
	],
	data() {
		return {
      inputClass: {
        "rounded-md focus:outline-none py-1 px-2 shadow-md bg-white": true,
      },
      labelInput: {
        "capitalize text-violet-900 font-semibold select-none text-sm": true,
      },
      errorText: {
        "text-red-500 text-sm text-left italic": true
      },

      showFilters: false,

      events: [],

      host: process.env.VUE_APP_EVENTMOD_HOST + "/api",

      status: "",
      cname: "",
      toe: "",

      userLogin: null,

		}
	},
	methods: {
    async fetchEvent() {
      const res = await fetch(`${this.host}/events`, {
        method: "GET",
      });
      const data = await res.json();
      const sortReverse = await data.sort().reverse();
      return sortReverse;
    },

    async fetchCreatorEvent() {
      const res = await fetch(`${this.host}/eventsbyaccount/${this.userLogin.accountID}`, {
        method: "GET",
      });
      const data = await res.json();
      const sortReverse = await data.sort().reverse();
      return sortReverse;
    },

    day(x) {
      const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return dayOfWeek[x.getDay()];
    },

    month(x) {
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return monthNames[x.getMonth()];
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
    
    getUserFromToken: async function() {
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
        // console.log(user)
        return user;
				// this.userLogin = user
        // const username = await user.username
        // this.username = username
			}
		},

	},
	async created() {
    if (localStorage.getItem('token') === null) {
      this.$router.push("/")
    }
    this.userLogin = await this.getUserFromToken();
    // console.log(await this.userLogin)
    if (await this.userLogin.admins != null) {
      this.events = await this.fetchEvent();
    } else if (await this.userLogin.creators != null) {
      this.events = await this.fetchCreatorEvent();
    }
	}
}
</script>
