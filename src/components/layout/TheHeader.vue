<template>
  <div id="the-header">
    <v-app-bar app fixed elevate-on-scroll color="blue accent-3 white--text">
      <v-app-bar-nav-icon color="white" @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Assistance App</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn depressed v-if="userData.login" color="blue accent-3 white--text">
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
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import router from "../../router";

export default Vue.extend({
  name: "TheHeader",
  data() {
    return {
      drawer: false
    };
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout");
    }
  },
  computed: {
    userData() {
      return this.$store.state.user;
    }
  }
});
</script>