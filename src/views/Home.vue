<template>
  <div class="home">
    <NavBar class="overflow-hidden fixed top-0 w-full" />
    <div class="mt-20 mx-72">
      <span class="text-violet-900 font-bold text-2xl">Hi, EventmodAdmin</span>
      <div class="flex flex-row bg-yellow-50 my-12 px-16 py-12">
        <div class="flex flex-col gap-y-4 mr-auto">
          <span class="text-violet-900 font-bold text-2xl">Welcome to EventMod</span>
          <span class="text-violet-900">Lorem Ipsum is simply dummy text of the printing and typeseng industry.</span>
          <a href="/create" class="text-white bg-gradient-to-r from-orange-400 to-orange-300 py-2 px-4 rounded-md shadow-lg text-lg capitalize w-fit">New Activity</a>
        </div>
        <div class="ml-auto mr-16">
          <img src="../assets/event.png" class="w-80" />
        </div>
      </div>
      
      <!-- Search Box -->
      <div class="flex flex-row rounded-md shadow-md w-full px-2">
        <i class="ri-search-line text-lg self-center text-gray-400"></i>
        <input id="searchText" type="text" v-model="inputSearchText" placeholder="Search" class="rounded-md focus:outline-none py-1 px-2 w-full placeholder-gray-400" />
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
