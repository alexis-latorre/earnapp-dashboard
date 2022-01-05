<template>
  <button @click="test" type="button" class="btn btn-primary">TEST</button>
</template>

<script>
export default {
  emits: ["alert"],
  methods: {
    test() {
      console.log("test");
      this.axios
        .get("https://wl1th.sse.codesandbox.io/earnapp")
        .then((res) => {
          console.log(res);
        })
        .catch((e) => this.$emit("alert", e.message));
    },
  },
};
</script>