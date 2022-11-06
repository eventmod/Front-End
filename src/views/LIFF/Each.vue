<template>
  <div>
    <h1>create-liff-app</h1>
    <p v-if="param">{{ param }}</p>
    <p v-if="error">
      {{ error }}
    </p>
    <a href="https://developers.line.biz/ja/docs/liff/" target="_blank" rel="noreferrer">
      LIFF Documentation
    </a>
  </div>
  <!-- <div>Hello World</div> -->
</template>

<script>
import liff from "@line/liff";

export default {
  data() {
    return {
      param: "",
      error: ""
    };
  },
  methods: {

  },
  async created() {
    await liff.init({ liffId: '1657618262-bmwyAAVo' });

    const urlParams = new URLSearchParams(window.location.search);
    this.param = urlParams.get('param')
  },
};
</script>
