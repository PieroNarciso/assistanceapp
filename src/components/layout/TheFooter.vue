<template>
  <div id="the-footer">
    <v-footer absolute class="font-weight-medium blue accent-3 white--text" app>
      <v-col class="text-center" cols="12">
        <v-icon class="white--text">mdi-copyright</v-icon>
        {{ new Date().getFullYear() }} —
        <strong>CECATA</strong>
      </v-col>
    </v-footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "TheFooter"
});
</script>