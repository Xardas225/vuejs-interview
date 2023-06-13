<script>
import { defineComponent } from "vue";
import TheContentBlock from "./components/TheContentBlock.vue";
import TheFooter from "./components/TheFooter.vue";

export default defineComponent({
  components: {
    TheContentBlock,
    TheFooter,
  },
});
</script>

<template>
  <v-app>
    <v-main>
      <TheContentBlock />
    </v-main>

    <v-footer>
      <TheFooter />
    </v-footer>
  </v-app>
</template>

<style></style>
