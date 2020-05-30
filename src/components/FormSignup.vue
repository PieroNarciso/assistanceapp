<template>
  <div id="form-signup">
    <v-card outlined>
      <v-toolbar dense flat color="cyan lighten-1">
        <v-toolbar-title>Signup Form</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-form>
            <v-text-field
              @keyup.enter="signup"
              v-model="user.first_name"
              type="text"
              label="Firstname"
              required
              outlined
            ></v-text-field>
            <v-text-field
              @keyup.enter="signup"
              v-model="user.last_name"
              type="text"
              label="Lastname"
              required
              outlined
            ></v-text-field>
            <v-text-field
              @keyup.enter="signup"
              v-model="user.username"
              type="text"
              label="Username"
              required
              outlined
              append-icon="mdi-account"
            ></v-text-field>
            <v-text-field
              @keyup.enter="signup"
              v-model="user.email"
              type="email"
              label="Email"
              required
              outlined
              append-icon="mdi-email"
            ></v-text-field>
            <v-text-field
              @keyup.enter="signup"
              v-model="user.password"
              type="password"
              label="Password"
              required
              outlined
              append-icon="mdi-lock"
            ></v-text-field>
            <v-text-field
              @keyup.enter="signup"
              v-model="user.check_password"
              type="password"
              label="Password"
              required
              outlined
              append-icon="mdi-lock"
            ></v-text-field>
            <v-progress-linear
              v-if="showLoader"
              color="cyan darken-2"
              indeterminate
              rounded
              height="6"
              class="mb-3"
            ></v-progress-linear>
            <v-btn color="success" @click="signup">
              Signup
              <v-icon right>mdi-login-variant</v-icon>
            </v-btn>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { User } from "@/interfaces/interfaces";

export default Vue.extend({
  name: "FormSignup",
  data() {
    return {
      user: {} as User
    };
  },
  computed: {
    showLoader() {
      return this.$store.getters.getShowLoaderFormSignup;
    }
  },
  methods: {
    signup: function() {
      this.$store.dispatch("updateShowLoaderFormSignup", true);
      this.$store.dispatch("signup", this.user);
    }
  }
});
</script>