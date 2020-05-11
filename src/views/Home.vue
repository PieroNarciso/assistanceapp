<template>
  <div class="home">
    <v-content>
      <v-container>
        <form-login></form-login>
      </v-container>
      <v-divider horizontal></v-divider>
      <v-container>
        <form-signup></form-signup>
      </v-container>
    </v-content>
  </div>
</template>

<script>
// @ is an alias to /src
import TheHeader from "@/components/layout/TheHeader.vue";
import TheFooter from "@/components/layout/TheFooter.vue";
import FormLogin from "@/components/FormLogin.vue";
import FormSignup from "@/components/FormSignup.vue";

export default {
  name: "Home",
  components: {
    TheHeader,
    TheFooter,
    FormLogin,
    FormSignup
  },
  beforeCreate() {
    document.title = this.$route.meta.title;
  }
};
</script>
