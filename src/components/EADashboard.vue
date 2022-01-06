<template>
  <div class="mt-2">
    <button
      v-if="canRefresh"
      @click="getServers"
      type="button"
      class="btn btn-success btn-sm"
    >
      <i class="fas fa-sync-alt"></i>
    </button>
    <button v-else type="button" class="btn btn-success btn-sm" disabled>
      <i class="fas fa-spin fa-sync-alt"></i>
    </button>
    <table class="table table-bordered mt-4">
      <thead>
        <tr>
          <th>Host</th>
          <th>Action</th>
          <th>PID</th>
          <th>Command</th>
          <th>Arguments</th>
          <th>PPID</th>
        </tr>
      </thead>
      <tbody v-if="servers && servers.length > 0">
        <tr
          v-for="server of servers"
          :key="server.pid"
          :class="server.status === 'up' ? 'table-success' : 'table-danger'"
        >
          <td class="align-middle">
            {{ server.host }}<br />
            <span class="small">{{ server.address }}</span>
          </td>
          <td class="align-middle">
            <template v-if="!server.reachable">
              <span class="text-danger"
                ><i class="fas fa-satellite-dish"></i> Offline</span
              >
            </template>
            <template v-else>
              <template v-if="server.status === 'down'">
                <button
                  v-if="server.starting"
                  class="btn btn-success btn-sm"
                  disabled
                >
                  <i class="fas fa-play"></i>
                </button>
                <button
                  v-else
                  class="btn btn-success btn-sm"
                  @click="startServer(server)"
                >
                  <i class="fas fa-play"></i>
                </button>
              </template>
              <template v-else>
                <template v-if="server.stopping">
                  <button class="btn btn-warning btn-sm" disabled>
                    <i
                      v-if="server.restarting"
                      class="fas fa-spin fa-sync-alt"
                    ></i>
                    <i v-else class="fas fa-sync-alt"></i>
                  </button>
                  <button class="btn btn-danger btn-sm mx-2" disabled>
                    <i class="fas fa-stop"></i>
                  </button>
                </template>
                <template v-else>
                  <button
                    class="btn btn-warning btn-sm"
                    @click="restartServer(server)"
                  >
                    <i class="fas fa-sync-alt"></i>
                  </button>
                  <button
                    class="btn btn-danger btn-sm mx-2"
                    @click="stopServer(server)"
                  >
                    <i class="fas fa-stop"></i>
                  </button>
                </template>
              </template>
            </template>
          </td>
          <td class="align-middle">{{ server.pid }}</td>
          <td class="align-middle">{{ server.command }}</td>
          <td class="align-middle">{{ server.arguments }}</td>
          <td class="align-middle">{{ server.ppid }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-if="canRefresh">
          <td colspan="6">No host found</td>
        </tr>
        <tr v-else>
          <td colspan="6">Fetching data...</td>
        </tr>
      </tbody>
    </table>
  </div>
  <button @click="test">test</button>
</template>

<script>
export default {
  data() {
    return {
      servers: null,
      canRefresh: true,
    };
  },
  emits: ["alert"],
  methods: {
    test() {
      this.axios
        .get("https://82.64.246.23")
        .then((res) => console.log(res))
        .catch((e) => {
          this.$emit("alert", e.message);
          this.canRefresh = true;
        });
    },
    getServers() {
      if (!this.canRefresh) return;

      this.servers = null;
      this.canRefresh = false;
      this.axios
        .get("https://wl1th.sse.codesandbox.io/earnapp")
        .then((res) => {
          this.servers = res.data;
          this.canRefresh = true;
        })
        .catch((e) => {
          this.$emit("alert", e.message);
          this.canRefresh = true;
        });
    },
    startServer(server) {
      server.starting = true;
      server.restarting = false;
      this.axios
        .post("https://wl1th.sse.codesandbox.io/earnapp/start/" + server.id)
        .then((res) => {
          this.servers = res.data;
          this.canRefresh = true;
          server.starting = false;
        })
        .catch((e) => {
          this.$emit("alert", e.message);
          this.canRefresh = true;
          server.starting = false;
        });
    },
    stopServer(server) {
      server.stopping = true;
      server.restarting = false;
      this.axios
        .post("https://wl1th.sse.codesandbox.io/earnapp/stop/" + server.id)
        .then((res) => {
          this.servers = res.data;
          this.canRefresh = true;
          server.stopping = false;
        })
        .catch((e) => {
          this.$emit("alert", e.message);
          this.canRefresh = true;
          server.stopping = false;
        });
    },
    restartServer(server) {
      server.stopping = true;
      server.starting = true;
      server.restarting = true;
      this.axios
        .post("https://wl1th.sse.codesandbox.io/earnapp/stop/" + server.id)
        .then((_) => {
          this.axios
            .post("https://wl1th.sse.codesandbox.io/earnapp/start/" + server.id)
            .then((res) => {
              this.servers = res.data;
              this.canRefresh = true;
              server.starting = false;
              server.stopping = false;
              server.restarting = false;
            })
            .catch((e) => {
              this.$emit("alert", e.message);
              this.canRefresh = true;
              server.starting = false;
              server.stopping = false;
              server.restarting = false;
            });
        })
        .catch((e) => {
          this.$emit("alert", e.message);
          this.canRefresh = true;
        });
    },
  },
  mounted() {
    this.getServers();
  },
};
</script>