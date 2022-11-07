<template>
  <div class="h-screen my-auto">
    <div class="h-full flex flex-col space-y-8 justify-center w-3/4 mx-auto">
      <div class="text-2xl text-center font-extrabold text-violet-900">Verify KMUTT Student</div>
      <div class="">
        <label for="inputStudentId" class="uppercase text-violet-900 font-semibold select-none">KMUTT Student ID</label>
        <input id="inputStudentId" type="text" v-model="inputStudentId" placeholder="Student Id 11 digits..." minlength="11" maxlength="11" 
          class="rounded-md focus:outline-none h-12 py-1 px-2 shadow-md bg-gray-100 w-full" />
      </div>
      <div class="">
        <label for="inputStudentMail" class="uppercase text-violet-900 font-semibold select-none">KMUTT Student Mail</label>
        <input id="inputStudentMail" type="text" v-model="inputStudentMail" placeholder="@mail.kmutt.ac.th / @kmutt.ac.th"
          class="rounded-md focus:outline-none h-12 py-1 px-2 shadow-md bg-gray-100 w-full" />
        <button type="button" class="text-sm" @click="sendOTPToKMUTTMail()">Send OTP</button><p v-if="showCountDown" class="">{{ countDown }}</p>
      </div>
      <div class="">
        <label for="inputOTP" class="uppercase text-violet-900 font-semibold select-none">OTP Validation</label>
        <input id="inputOTP" type="text" v-model="inputOTP" placeholder="OTP"
          class="rounded-md focus:outline-none h-12 py-1 px-2 shadow-md bg-gray-100 w-full" />
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
      host: process.env.VUE_APP_EVENTMOD_HOST + "/api",

      userId: "",
      inputStudentId: "",
      inputStudentMail: "",
      otp: "",
      inputOTP: "",
      isAuthen: false,
      verifyStatus: "",

      countDown: 60,
      showCountDown: false,

      validInputStudentId: false,
      validInputStudentMail: false,
      validInputOTP: false,
    };
  },
  methods: {
    async sendOTPToKMUTTMail() {
      
      this.validInputStudentMail = this.inputStudentMail === "" ? true : false;

      if(!this.validInputStudentMail) {

        this.otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChar: false });

        let formData = new FormData()
        formData.append("toEmail",this.inputStudentMail)
        formData.append("subject","OTP from EventMod")
        formData.append("content",`Your OTP is... ${this.otp}`)

        await fetch(`${this.host}/sendEmail`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: formData
        })

      }
      this.countDownTimer()
    },

    countDownTimer () {
      this.showCountDown = true
      if (this.countDown > 0) {
        setTimeout(() => {
            this.countDown -= 1
            this.countDownTimer()
        }, 1000)
      } else {
        this.showCountDown = false
      }
    },

    async collectAccount() {

      this.validInputStudentId = this.inputStudentId === "" ? true : false;
      this.validInputStudentMail = this.inputStudentMail === "" ? true : false;
      this.validInputOTP = this.inputOTP === "" ? true : false;

      const validationOTP = (this.inputOTP === this.otp)
      const validationInput = (!this.validInputStudentId && !this.validInputStudentMail && !this.validInputOTP)

      if(validationOTP && validationInput) {
        const data = {
          lineaccUserID: this.userId,
          lineaccStudentID: this.inputStudentId,
          lineaccKmuttMail: this.inputStudentMail,
          lineaccVerify: this.verifyStatus
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
    }
  },
  async created() {
    await liff.init({ liffId: '1657624777-ZRExJL7b' });
    if (!liff.isLoggedIn()) {
      // liff.login()
    }
    this.userId = (await liff.getProfile()).userId
  },
};
</script>
