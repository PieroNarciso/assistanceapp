<template>
  <div id="the-header">
    <v-app-bar app elevate-on-scroll color="blue accent-3 white--text">
      <v-app-bar-nav-icon color="white" @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Assistance App</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" v-if="userData.is_staff" max-width="600">
        <template v-slot:activator="{ on }">
          <v-btn text class="white--text" v-on="on">
            download
            <v-icon right>mdi-file-export-outline</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>Download Data</v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-2 text-center">
            <v-date-picker v-model="selectedDates" range></v-date-picker>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              large
              text
              class="success--text"
              :loading="loadingDownload"
              @click="getDownloadAssistanceData"
            >
              <v-icon left>mdi-file-export-outline</v-icon>Download
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn large text color="error" @click="dialog = !dialog">
              <v-icon left>mdi-close</v-icon>Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-btn v-if="userData.login" class="white--text" text>
        {{ userData.username }}
        <v-icon color="white">mdi-account</v-icon>
      </v-btn>

      <v-navigation-drawer app v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group active-class="deep-purple--text text--accent-4">
            <v-list-item to="/">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>

            <v-list-item v-if="userData.login" to="/user">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Account</v-list-item-title>
            </v-list-item>

            <v-list-item v-if="userData.login && userData.is_staff" to="/code-view">
              <v-list-item-icon>
                <v-icon>mdi-lock</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Code</v-list-item-title>
            </v-list-item>

            <v-list-item v-if="userData.login" @click="logout">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-app-bar>

    <v-snackbar v-model="snackbar.status">
      {{ snackbar.msg }}
      <v-btn text>Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import router from "../../router";

export default Vue.extend({
  name: "TheHeader",

  data() {
    return {
      dialog: false,
      drawer: false,
      selectedDates: [] as string[],
      loadingDownload: false,
      snackbar: {
        status: false,
        msg: ""
      }
    };
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout");
    },

    getDownloadAssistanceData() {
      if (this.selectedDates.length == 0) {
        this.snackbar.status = true;
        this.snackbar.msg = "You have to select at least 1 date.";
        return;
      }
      const data = {
        date_range: this.selectedDates.sort()
      };
      this.$store.dispatch("downloadAssistances", data);
    }
  },

  computed: {
    userData() {
      return this.$store.state.user;
    }
  }
});
</script>