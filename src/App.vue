<template>
  <div class="container">
    <EADashboard v-on:alert="alert" />
  </div>
  <div
    v-if="displayAlert"
    @click="displayAlert = false"
    :class="`alert alert-${alertColor}`"
    role="alert"
  >
    {{ alertMessage }}
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
    },
  },
};
</script>