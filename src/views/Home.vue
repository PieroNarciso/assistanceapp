<template>
  <div class="home">
    <v-container fluid>
      <v-card flat>
        <v-row justify-lg="center" no-gutters>
          <v-col cols="12" md="6" lg="4">
            <v-card-text>
              <form-login></form-login>
            </v-card-text>
          </v-col>
          <v-col cols="12" md="6" lg="4">
            <v-card-text>
              <form-signup></form-signup>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
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
