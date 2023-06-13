<script>
import { defineComponent } from "vue";
import TheFilters from "./TheFilters.vue";
import TheUsers from "./TheUsers.vue";

export default defineComponent({
  components: {
    TheFilters,
    TheUsers,
  },
});
</script>

<template>
  <v-container>
    <v-row align="center" justify="center" class="ma-4">
      <v-col cols="12" md="4">
        <v-img
          :src="require('../assets/logo.png')"
          contain
          class="my-3"
          height="200"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" xxl="4" xl="4" lg="4" md="4">
        <TheFilters />
      </v-col>

      <v-col cols="12" xxl="8" xl="8" lg="8" md="8">
        <TheUsers />
      </v-col>
    </v-row>
  </v-container>
</template>

<style></style>
