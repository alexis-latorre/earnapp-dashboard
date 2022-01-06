<template>
  <div class="app">
    <div class="header"></div>
    <div class="content">
      <div class="container">
        <EADashboard v-on:alert="alert" />
      </div>
      <div class="container">
        <div
          v-if="displayAlert"
          @click="displayAlert = false"
          :class="`alert alert-${alertColor}`"
          role="alert"
        >
          {{ alertMessage }}
        </div>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
import EADashboard from "@/components/EADashboard";
export default {
  components: {
    EADashboard,
  },
  data() {
    return {
      displayAlert: false,
      alertMessage: "",
      alertColor: "danger",
    };
  },
  methods: {
    alert(msg, type) {
      switch (type) {
        case "I":
          this.alertColor = "info";
          break;
        case "W":
          this.alertColor = "warning";
          break;
        case "S":
          this.alertColor = "success";
          break;
        default:
          this.alertColor = "danger";
          break;
      }

      this.alertMessage = msg;
      this.displayAlert = true;
      setTimeout(() => {
        this.displayAlert = false;
      }, 5000);
    },
  },
};
</script>

<style lang="scss">
.app {
  display: grid;
  height: 100vh;
  grid-template-columns: 1fr 80% 1fr;
  grid-template-rows: 50px 1fr auto;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.header {
  grid-area: 1 / 1 / 2 / 4;
}
.content {
  grid-area: 2 / 1 / 3 / 4;
}
.footer {
  grid-area: 3 / 1 / 4 / 4;
}
.small {
  font-size: 0.6em;
}
</style>