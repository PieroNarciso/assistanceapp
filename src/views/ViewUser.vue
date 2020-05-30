<template>
  <div id="user-view">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" lg="6" md="8" sm="10">
          <form-user-code></form-user-code>
        </v-col>
      </v-row>
    </v-container>

    <v-divider></v-divider>

    <v-container>
      <v-row justify="center">
        <v-col cols="12" lg="6" md="8" sm="10">
          <assistances-list></assistances-list>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import TheHeader from "@/components/layout/TheHeader.vue";
import TheFooter from "@/components/layout/TheFooter.vue";
import AssistancesList from "@/components/AssistancesList.vue";
import FormUserCode from "@/components/FormUserCode.vue";

export default Vue.extend({
  name: "user-view",
  components: {
    TheHeader,
    TheFooter,
    AssistancesList,

    FormUserCode
  },
  data() {
    return {
      code: ""
    };
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
    this.$store.dispatch("getTodayAssistances", token);
    document.title = this.$route.meta.title;
  }
});
</script>