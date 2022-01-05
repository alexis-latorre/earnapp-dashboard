<template>
  <div class="m-6">
    <button
      v-if="canRefresh"
      @click="getProcesses"
      type="button"
      class="btn btn-success"
    >
      <i class="fas fa-sync-alt"></i>
    </button>
    <button v-else type="button" class="btn btn-success" disabled>
      <i class="fas fa-spin fa-sync-alt"></i>
    </button>
    <table class="table">
      <thead>
        <th>Action</th>
        <th>PID</th>
        <th>Command</th>
        <th>Arguments</th>
        <th>PPID</th>
      </thead>
      <tbody v-if="processes && processes.length > 0">
        <tr v-for="process of processes" :key="process.pid">
          <td class="align-middle">
            <button class="btn btn-success">Reload</button>
          </td>
          <td class="align-middle">{{ process.pid }}</td>
          <td class="align-middle">{{ process.command }}</td>
          <td class="align-middle">{{ process.arguments }}</td>
          <td class="align-middle">{{ process.ppid }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <th colspan="4">No process found</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      processes: null,
      canRefresh: true,
    };
  },
  emits: ["alert"],
  methods: {
    getProcesses() {
      if (!this.canRefresh) return;

      this.processes = null;
      this.canRefresh = false;
      this.axios
        .get("https://wl1th.sse.codesandbox.io/earnapp")
        .then((res) => {
          this.processes = res.data;
          this.canRefresh = true;
        })
        .catch((e) => {
          this.$emit("alert", e.message);
          this.canRefresh = true;
        });
    },
  },
  mounted() {
    this.getProcesses();
  },
};
</script>