<template>
  <div id="user-view">
    <the-header></the-header>

    <v-content>
      <v-container>
        <v-card flat>
          <v-container>
            <validation-error :visible="errorToken" :msg="msgErrorToken"></validation-error>
            <validation-success :visible="successToken" :msg="msgSuccessToken"></validation-success>

            <v-form @submit.prevent="createAssistance">
              <v-text-field
                color="blue"
                v-model="code"
                type="text"
                label="Enter the code"
                counter="6"
                outlined
                rounded
              ></v-text-field>
              <v-btn @click="createAssistance" color="success">Submit Code</v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-container>

      <v-divider></v-divider>

      <v-container>
        <assistances-list></assistances-list>
      </v-container>
    </v-content>
    <the-footer></the-footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import TheHeader from "@/components/layout/TheHeader.vue";
import TheFooter from "@/components/layout/TheFooter.vue";
import AssistancesList from "@/components/AssistancesList.vue";
import ValidationError from "@/components/messages/ValidationError.vue";
import ValidationSuccess from "@/components/messages/ValidationSuccess.vue";

export default Vue.extend({
  name: "user-view",
  components: {
    TheHeader,
    TheFooter,
    AssistancesList,
    ValidationError,
    ValidationSuccess
  },
  data() {
    return {
      code: ""
    };
  },
  methods: {
    createAssistance: function() {
      const data = {
        code: this.code,
        token: Vue.$cookies.get("token")
      };
      this.$store.dispatch("createAssistance", data);
      this.$store.dispatch("resetCode");
      this.$store.dispatch("getAssistances", data.token);
    },

    getAssistances: function() {
      const token = Vue.$cookies.get("token");
      this.$store.dispatch("getAssistances", token);
    }
  },
  computed: {
    userData() {
      return this.$store.state.user;
    },

    utilsData() {
      return this.$store.state.utils;
    },

    errorToken() {
      return this.$store.getters.isErrorToken;
    },

    msgErrorToken() {
      return this.$store.getters.msgErrorToken;
    },

    successToken() {
      return this.$store.getters.isSuccessToken;
    },

    msgSuccessToken() {
      return this.$store.getters.msgSuccessToken;
    },

    assistances() {
      return this.$store.state.assistances;
    }
  },
  beforeCreate: function() {
    const token: String | null = Vue.$cookies.get("token");
    if (token != null) {
      this.$store.dispatch("getUserData", token);
      this.$store.dispatch("resetCode");
      this.$store.commit("resetErrorToken");
      this.$store.commit("resetSuccessToken");
    } else {
      this.$router.push("/");
    }
    this.$store.dispatch("getAssistances", token);
    document.title = this.$route.meta.title;
  }
});
</script>