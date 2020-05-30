<template>
  <div id="login-form">
    <v-card outlined>
      <v-toolbar dense flat color="cyan lighten-1">
        <v-toolbar-title>Login Form</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-form v-model="valid" lazy-validation ref="form">
            <validation-error :visible="msgErrors.login.error" :msg="msgErrors.login.msg"></validation-error>
            <validation-success :visible="msgSuccess.login.success" :msg="msgSuccess.login.msg"></validation-success>
            <v-text-field
              @keyup.enter="login"
              v-model="loginData.username"
              type="text"
              label="Username"
              outlined
              required
              append-icon="mdi-account"
              :rules="usernameRules"
            ></v-text-field>
            <v-text-field
              @keyup.enter="login"
              v-model="loginData.password"
              type="password"
              label="Password"
              outlined
              required
              append-icon="mdi-lock"
              :rules="passwordRules"
            ></v-text-field>
            <v-progress-linear
              v-if="showLoader"
              color="cyan darken-2"
              indeterminate
              rounded
              height="6"
              class="mb-3"
            ></v-progress-linear>
            <v-btn color="primary" @click="login">
              Login
              <v-icon right>mdi-login</v-icon>
            </v-btn>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

import ValidationError from "@/components/messages/ValidationError.vue";
import ValidationSuccess from "@/components/messages/ValidationSuccess.vue";

export default Vue.extend({
  name: "login-form",
  components: {
    ValidationSuccess,
    ValidationError
  },
  data() {
    return {
      loginData: {
        username: "",
        email: "",
        password: ""
      },
      valid: true
    };
  },
  methods: {
    login: function() {
      if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
        const data = {
          username: this.loginData.username,
          password: this.loginData.password
        };
        this.$store.dispatch("updateShowLoaderFormLogin", true);
        this.$store.dispatch("login", data);
      }
    }
  },

  computed: {
    userData() {
      return this.$store.state.user;
    },

    msgErrors() {
      return this.$store.getters.getMsgErrors;
    },

    msgSuccess() {
      return this.$store.getters.getMsgSuccess;
    },

    showLoader() {
      return this.$store.getters.getShowLoaderFormLogin;
    },

    usernameRules() {
      return this.$store.getters.getUsernameRules;
    },

    passwordRules() {
      return this.$store.getters.getPasswordRules;
    }
  },
  beforeCreate: function() {
    const token: String | null = Vue.$cookies.get("token");
    if (token != null) {
      this.$store.dispatch("getUserData", token);
      this.$router.push("user");
    }
  }
});
</script>