<template>
  <div class="m-6">
    <button @click="getProcesses" type="button" class="btn btn-success">
      Refresh
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
    };
  },
  emits: ["alert"],
  methods: {
    getProcesses() {
      this.axios
        .get("https://wl1th.sse.codesandbox.io/earnapp")
        .then((res) => (this.processes = res.data))
        .catch((e) => this.$emit("alert", e.message));
    },
  },
  mounted() {
    this.getProcesses();
  },
};
</script>