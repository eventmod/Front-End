<template>
  <div class="home" style="background-color: #F5F5FE;">
    <NavBar class="overflow-hidden fixed top-0 w-full" />
    <div class="pt-20 mx-72">
      <span class="text-violet-900 font-bold text-2xl">Hi, Eventmod Admin</span>
      <div class="flex flex-row bg-yellow-50 my-12 px-16 py-12">
        <div class="flex flex-col gap-y-4 mr-auto">
          <span class="text-violet-900 font-bold text-2xl">Welcome to EventMod</span>
          <span class="text-violet-900">Lorem Ipsum is simply dummy text of the printing and typeseng industry.</span>
          <a href="/create" class="text-white bg-gradient-to-r from-orange-400 to-orange-300 py-2 px-4 rounded-full shadow-lg text-lg capitalize w-5/12 text-center">New Event</a>
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
          <select class="h-8 w-full" :class="inputClass">
            <option selected disabled></option>
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
          <select class="h-8 w-full" :class="inputClass">
            <option selected disabled></option>
            <option class="">Online</option>
            <option class="">Onsite</option>
          </select>
        </div>
        <!-- Second Row -->
      </div>
      <!-- Search Box-->

      <!-- Each Event Component -->
      <div v-for="e in events" :key="e.eventID" class="">
        <a :href="`/each/${ e.eventID }`">
          <div class="flex flex-row rounded-md shadow-md my-16 bg-slate-50 py-4 px-6 gap-x-16">
            <div class="flex flex-col gap-y-8">
              <div class="font-bold text-xl select-none">{{ e.eventName }}</div>
              <span class="select-none text-justify">{{ e.eventDescription }}</span>
            </div>
            <img :src="`${host}/Files/${e.eventCover}`" class="object-cover h-56 w-56" />
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

      host: process.env.VUE_APP_EVENTMOD_HOST
		}
	},
	methods: {
    async fetchEvent() {
      const res = await fetch(`${this.host}/events`, {
        method: "GET",
      });
      const data = await res.json();
      return data;
    }
	},
	async created() {
    this.events = await this.fetchEvent();
	}
}
</script>
