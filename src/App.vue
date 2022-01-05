<template>
  <button @click="test">TEST</button>
</template>

<script>
export default {
  methods: {
    test() {
      console.log("test");
      this.axios.get("https://wl1th.sse.codesandbox.io/").then((res) => {
        console.log(res);
      });
    },
  },
};
</script>