<template>
  <div id="app">
    <v-app>
      <the-header></the-header>
      <v-content>
        <router-view />
      </v-content>
      <the-footer></the-footer>
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TheHeader from "@/components/layout/TheHeader.vue";
import TheFooter from "@/components/layout/TheFooter.vue";

export default Vue.extend({
  name: "App",
  data: () => ({
    //
  }),
  components: {
    TheHeader,
    TheFooter
  }
});
</script>
