<template>
  <div id="the-footer">
    <v-footer app color="blue accent-3 white--text">
      <v-card-text>
        <v-icon color="white">mdi-copyright</v-icon>
        {{ new Date().getFullYear() }} —
        <strong>CECATA</strong>
      </v-card-text>
    </v-footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "TheFooter"
});
</script>