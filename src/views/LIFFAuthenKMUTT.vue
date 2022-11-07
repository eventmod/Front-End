<template>
  <div class="h-screen flex flex-col space-y-8 justify-center place-items-center">
    <!-- <div class="h-screen"> -->
      <div class="w-3/4">
        <label for="inputStudentId" class="">KMUTT Student ID</label>
        <input id="inputStudentId" type="text" v-model="inputStudentId" placeholder="Student Id 11 digits..." minlength="11" maxlength="11" 
          class="rounded-md focus:outline-none h-12 py-1 px-2 shadow-md bg-gray-100 w-full" />
      </div>
      <div class="w-3/4">
        <label for="inputStudentMail" class="">KMUTT Student Mail</label>
        <input id="inputStudentMail" type="text" v-model="inputStudentMail" placeholder="@mail.kmutt.ac.th / @kmutt.ac.th"
          class="rounded-md focus:outline-none h-12 py-1 px-2 shadow-md bg-gray-100 w-full" />
      </div>
    <!-- </div> -->
  </div>
</template>

<script>
import liff from "@line/liff";

export default {
  data() {
    return {
      userId: "",
      inputStudentId: "",
      inputStudentMail: "",
    };
  },
  methods: {

  },
  async created() {
    await liff.init({ liffId: '1657624777-GQkya04l' });
    // if (!liff.isLoggedIn()) {
    //   liff.login()
    // }
    this.userId = (await liff.getProfile()).userId
  },
};
</script>
