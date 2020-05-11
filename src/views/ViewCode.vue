<template>
  <div id="code-view">
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <h2 class="display-4 text-center">{{ utilsData.code }}</h2>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row justify="center">
        <v-col cols="6">
          <div class="text-center">
            <v-btn color="success" @click="createCode">Create New Code</v-btn>
          </div>
        </v-col>
      </v-row>

      <v-row justify="center" no-gutters>
        <v-col cols="8" sm="6" md="4" lg="3">
          <v-select label="Select interval time" @change="setCreateCodeInterval" :items="times"></v-select>
          <p class="text-center">{{ intervalValue }} min interval</p>
        </v-col>
      </v-row>
    </v-container>
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
    document.title = this.$route.meta.title;
  }
});
</script>