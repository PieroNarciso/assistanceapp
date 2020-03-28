<template>
  <div id="code-view">
    <the-header></the-header>
    <v-content>
      <v-container>
        <h3 class="display-4">{{ utilsData.code }}</h3>
      </v-container>
      <hr />
      <v-container>
        <v-btn color="success" @click="createCode">Create New Code</v-btn>
        <v-container>
          <v-select label="Select interval time" @change="setCreateCodeInterval" :items="times"></v-select>
          {{ intervalValue }} min interval
        </v-container>
      </v-container>
    </v-content>
    <the-footer></the-footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import router from "../router";

import { AppTime } from "@/interfaces/interfaces";

import TheHeader from "@/components/layout/TheHeader.vue";
import TheFooter from "@/components/layout/TheFooter.vue";

export default Vue.extend({
  name: "code-view",
  data() {
    return {
      times: [
        {
          id: 1,
          value: 1,
          text: "1 min"
        },
        {
          id: 2,
          value: 3,
          text: "3 min"
        },
        {
          id: 3,
          value: 5,
          text: "5 min"
        },
        {
          id: 4,
          value: 10,
          text: "10 min"
        },
        {
          id: 5,
          value: 15,
          text: "15 min"
        }
      ],

      interval: 0
    };
  },
  components: {
    TheHeader,
    TheFooter
  },
  methods: {
    createCode: function() {
      const token: String | null = Vue.$cookies.get("token");
      const res = this.$store.dispatch("createCode", token);
    },

    setCreateCodeInterval: function(time: number) {
      this.$store.dispatch("setIntervalValue", time);
      clearInterval(this.interval);
      this.interval = setInterval(this.createCode, time * 1000 * 60);
    }
  },
  computed: {
    utilsData() {
      return this.$store.state.utils;
    },

    userData() {
      return this.$store.state.user;
    },

    intervalValue() {
      return this.$store.getters.getIntervalValue;
    }
  },
  beforeCreate() {
    const token: String | null = Vue.$cookies.get("token");
    if (token != null) {
      this.$store.dispatch("getUserData", token);
      this.$store.dispatch("getCode", token);
    } else {
      this.$router.push("/");
    }
  }
});
</script>