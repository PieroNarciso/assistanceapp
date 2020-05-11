<template>
  <div id="assistance-list">
    <v-card>
      <v-toolbar flat color="primary" dark>
        <v-spacer>
          <v-toolbar-title class="text-center">Today Assistances</v-toolbar-title>
        </v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-list>
          <v-list-item-group color="primary">
            <template v-if="assistances.length > 0">
              <v-list-item v-for="(assistance, index) in assistances" :key="index">
                <div>
                  <span class="font-weight-bold">{{ assistance.user }}</span>
                  - {{ getTimeZoneDate(assistance.check_time) }}
                </div>
              </v-list-item>
            </template>

            <template v-else>
              <v-list-item>No assistances today yet</v-list-item>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";

export default Vue.extend({
  name: "AssistancesList",

  beforeCreate: function() {
    this.$store.dispatch("getAssistances", Vue.$cookies.get("token"));
  },

  methods: {
    getTimeZoneDate: function(datetime: Date) {
      const date = new Date(datetime);
      return moment(date).format("MMMM DD YYYY HH:mm:ss");
    }
  },

  computed: {
    assistances() {
      return this.$store.getters.getTodayAssistances;
    }
  }
});
</script>