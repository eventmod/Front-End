<template>
  <div class="welcome pt-36 pl-40 h-screen">
    <div class="grid grid-cols-6 grid-rows-6 w-12 h-12 gap-1 mb-8">
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
      <div class="w-1 h-1" style="background-color: #564AA0"></div>
    </div>
    <div class="font-bold text-6xl">
      <p class="mb-4">Welcome back</p>
      <p class="mt-4">to <span class="x1">EventMod</span></p>
    </div>
    <div class="mt-8">
      <p class="text-sm">Sign in to your account below</p>
    </div>
    <div class="my-8">
      <input type="text" v-model="username" placeholder="Username" :class="inputClass" class="bg-white w-96 h-10 mb-2 placeholder:text-sm"/> <br />
      <input type="password" v-model="password" placeholder="Password" :class="inputClass" class="bg-white w-96 h-10 mt-2 placeholder:text-sm"/>
    </div>
    <div class="">
      <input type="button" class="text-white bg-gradient-to-r from-orange-400 to-orange-300 w-44 py-2 rounded-full shadow-lg" value="Sign in" @click="signIn()">
    </div>
  </div>
</template>

<style>
.welcome{
  background-image: url("../assets/Vector2.png");
  background-color: #F5F5FE;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: right;
  background-size: auto;
  background-size: contain;
}
.x1{
  /* font-size: 10rem; */
  background: linear-gradient(to top, #564AA0, #302164, #301D4A);
  -webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
</style>

<script>
// @ is an alias to /src

export default {
  name: 'Welcome',
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

      host: process.env.VUE_APP_EVENTMOD_HOST + "/api",

      username: "",
      password: "",

      invalidUsername: false,
      invalidPassword: false,

		}
	},
	methods: {
    async signIn() {
      this.invalidUsername = this.username === "" ? true : false;
      this.invalidPassword = this.password === "" ? true : false;
      const loginData = {
        username: this.username,
        password: this.password
      }
      if (!this.invalidUsername && !this.invalidPassword) {
        const response = await fetch(`${this.host}/login`,{
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(loginData)
        })
        const tk = await response.json()
        if (response.ok) {
          // console.log(tk)
          localStorage.setItem('token',"Bearer " + tk.token)
          this.$router.push("/home")
        } else {
          throw console.log(ErrorEvent)
        }
        
      }
    },
	},
	async created() {
    // console.log(localStorage.getItem('token') != null)
    if(window.innerWidth < 1024) {
      this.$router.push("/notsupport")
    } else {
      if (localStorage.getItem('token') != null) {
        this.$router.push("/home")      
      }
    }
	}
}
</script>
