<template>
  <div id="validation-error">
    <v-alert :value="visible" border="left" dense type="warning">{{ msg }}</v-alert>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ValidationError",
  props: {
    msg: String,
    visible: Boolean
  }
});
</script>