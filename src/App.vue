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


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>