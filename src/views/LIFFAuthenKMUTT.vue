<template>
  <div class="h-screen my-auto">
    <div class="h-full flex flex-col space-y-8 justify-center w-3/4 mx-auto">
      <div class="text-3xl font-extrabold text-violet-900">Verify KMUTT Student</div>
      <div class="">
        <label for="inputStudentId" class="uppercase text-violet-900 font-semibold select-none">KMUTT Student ID</label>
        <input id="inputStudentId" type="text" v-model="inputStudentId" placeholder="Student Id 11 digits..." minlength="11" maxlength="11" 
          class="rounded-md focus:outline-none h-12 py-1 px-2 shadow-md bg-gray-100 w-full" />
      </div>
      <div class="">
        <label for="inputStudentMail" class="uppercase text-violet-900 font-semibold select-none">KMUTT Student Mail</label>
        <input id="inputStudentMail" type="text" v-model="inputStudentMail" placeholder="@mail.kmutt.ac.th / @kmutt.ac.th"
          class="rounded-md focus:outline-none h-12 py-1 px-2 shadow-md bg-gray-100 w-full" />
      </div>
      <div class="">
        <label for="inputOTP" class="uppercase text-violet-900 font-semibold select-none">OTP Validation</label>
        <input id="inputOTP" type="text" v-model="inputOTP" placeholder="OTP"
          class="rounded-md focus:outline-none h-12 py-1 px-2 shadow-md bg-gray-100 w-full" />
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
      userId: "",
      inputStudentId: "",
      inputStudentMail: "",
      inputOTP: "",
      isAuthen: false,
    };
  },
  methods: {
    async sendOTPToKMUTTMail() {
      const otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChar: false });
      console.log(otp)
    }
  },
  async created() {
    const liffId = '1657624777-ZRExJL7b'
    await liff.init({ liffId });
    // if (!liff.isLoggedIn()) {
    //   liff.login()
    // }
    this.userId = (await liff.getProfile()).userId
    await this.sendOTPToKMUTTMail()
    
  },
};
</script>
