<template>
  <div class="h-screen my-auto">
    <div class="h-full flex flex-col space-y-8 justify-center w-3/4 mx-auto">
      <div class="text-2xl text-center font-extrabold text-violet-900">Verify KMUTT Student</div>
      <div class="">
        <label for="inputStudentId" class="uppercase text-violet-900 font-semibold select-none">KMUTT Student ID</label>
        <span v-if="this.validInputStudentId" :class="errorText" class="ri-alert-line"></span>
        <input id="inputStudentId" type="text" v-model="inputStudentId" placeholder="Student Id 11 digits..." minlength="11" maxlength="11" 
          class="rounded-md focus:outline-none h-12 py-1 px-2 shadow-md bg-gray-100 w-full" :class="{'shadow-red-400 outline outline-1 outline-red-600 focus:outline-red-600': validInputStudentId}" />
      </div>
      <div class="">
        <label for="inputStudentMail" class="uppercase text-violet-900 font-semibold select-none">KMUTT Student Mail</label>
        <span v-if="this.validInputStudentMail" :class="errorText" class="ri-alert-line"></span>
        <input id="inputStudentMail" type="email" v-model="inputStudentMail" placeholder="@mail.kmutt.ac.th / @kmutt.ac.th"
          class="rounded-md focus:outline-none h-12 py-1 px-2 shadow-md bg-gray-100 w-full" :class="{'shadow-red-400 outline outline-1 outline-red-600 focus:outline-red-600': validInputStudentMail}" />
        <button type="button" class="text-sm" @click="sendOTPToKMUTTMail()" :disabled="isDisable">Send OTP</button>
        <span v-if="showCountDown" class="mx-2 text-slate-400 text-xs">{{ countDown }}</span>
      </div>
      <div class="">
        <label for="inputOTP" class="uppercase text-violet-900 font-semibold select-none">OTP Validation</label>
        <span v-if="this.validInputOTP" :class="errorText" class="ri-alert-line"></span>
        <input id="inputOTP" type="text" v-model="inputOTP" placeholder="OTP"
          class="rounded-md focus:outline-none h-12 py-1 px-2 shadow-md bg-gray-100 w-full" :class="{'shadow-red-400 outline outline-1 outline-red-600 focus:outline-red-600': validInputOTP}" />
      </div>
      <div class="">
        <input type="button" class="text-white bg-gradient-to-r from-orange-400 to-orange-300 w-full py-2 rounded-full shadow-lg" value="Verify" @click="collectAccount()">
      </div>
    </div>
    
  </div>
</template>

<script>
import liff from "@line/liff";
import otpGenerator from "otp-generators";

export default {
  data() {
    return {

      errorText: {
        "text-red-500 text-sm text-left italic mx-1": true
      },

      host: process.env.VUE_APP_EVENTMOD_HOST + "/api",

      userId: "",
      inputStudentId: "",
      inputStudentMail: "",
      otp: "",
      inputOTP: "",
      isAuthen: false,
      verifyStatus: "",

      isDisable: false,
      countDown: 60,
      showCountDown: false,

      validInputStudentId: false,
      validInputStudentMail: false,
      validInputOTP: false,
    };
  },
  methods: {
    async sendOTPToKMUTTMail() {
      
      this.validInputStudentMail = this.inputStudentMail === "" || !this.inputStudentMail.includes("kmutt.ac.th") ? true : false;


      if(!this.validInputStudentMail) {

        this.otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChar: false });

        let formData = new FormData()
        formData.append("toEmail", this.inputStudentMail)
        formData.append("subject", "OTP from EventMod")
        formData.append("content", "Your OTP is... " + this.otp)

        const res = await fetch(`${this.host}/sendEmail`, {
          method: "POST",
          body: formData
        })
        if (res.ok) {
          this.countDownTimer()
        } else {
          throw console.error();
        }

      }
      
    },

    countDownTimer () {
      if (this.countDown > 0) {
        this.isDisable = true
        this.showCountDown = true
        setTimeout(() => {
            this.countDown -= 1
            this.countDownTimer()
        }, 1000)
      } else {
        this.showCountDown = false
        this.isDisable = false
      }
    },

    async collectAccount() {

      this.validInputStudentId = this.inputStudentId === "" ? true : false;
      this.validInputStudentMail = this.inputStudentMail === "" ? true : false;
      this.validInputOTP = this.inputOTP === "" ? true : false;

      const validationOTP = this.inputOTP == this.otp ? true : false;
      const validationInput = (!this.validInputStudentId && !this.validInputStudentMail && !this.validInputOTP)

      if(validationOTP && validationInput) {
        const data = {
          lineaccUserID: this.userId,
          lineaccStudentID: this.inputStudentId,
          lineaccKmuttMail: this.inputStudentMail,
          lineaccVerify: "Verified"
        }
        const res = await fetch(`${this.host}/newLineaccount`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data)
        })
        if(res.ok) {
          liff.closeWindow()
        }
      }
    },
    async checkVerify() {
      const res = await fetch(`${this.host}/lineByUserID/${this.userId}`, {
        method: "GET",
      })
      const data = await res.json()
      console.log(data)
      console.log(data.lineaccVerify)
      const isVerify = await data.lineaccVerify === "Verified" ? true : false;

      if(isVerify) {
        liff.closeWindow()
      }
    }
  },
  async created() {
    await liff.init({ liffId: '1657624777-ZRExJL7b' });
    if (!liff.isLoggedIn()) {
      liff.login()
    }
    this.userId = (await liff.getProfile()).userId
    await this.checkVerify()    
  },
};
</script>
