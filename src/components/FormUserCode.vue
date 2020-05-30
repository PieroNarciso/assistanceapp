<template>
  <div id="form-user-code">
    <v-card flat>
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
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ValidationError from "@/components/messages/ValidationError.vue";
import ValidationSuccess from "@/components/messages/ValidationSuccess.vue";

export default Vue.extend({
  name: "FormUserCode",
  components: {
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
  }
});
</script>