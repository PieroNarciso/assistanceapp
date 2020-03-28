<template>
  <div class="about">
    <the-header></the-header>
    <v-content>
      <h1>This is an about page</h1>
    </v-content>
    <the-footer></the-footer>
  </div>
</template>


<script lang="ts">
import Vue from "vue";

import TheHeader from "@/components/layout/TheHeader.vue";
import TheFooter from "@/components/layout/TheFooter.vue";

export default Vue.extend({
  name: "About",
  components: {
    TheHeader,
    TheFooter
  }
});
</script>