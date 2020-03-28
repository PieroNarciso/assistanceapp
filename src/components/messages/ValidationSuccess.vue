<template>
  <div id="validation-error">
    <v-alert :value="visible" border="left" dense type="success">{{ msg }}</v-alert>
  </div>
</template>


<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ValidationSuccess",
  props: {
    msg: String,
    visible: Boolean
  }
});
</script>
</template>