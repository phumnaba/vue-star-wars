<template>
  <div class="snackbar-wrapper">
    <v-snackbar
      v-for="(snackbar, index) in openedSnackbars"
      :key="snackbar.message + index"
      :timeout="6000"
      :color="snackbar.color"
      :style="`top: ${index * 60}px`"
      v-model="snackbar.show"
      transition="fab-transition"
      tile
      top
      right
    >
      <span class="snackbar-msg">{{ snackbar.message }}</span>
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click.native="snackbar.show = false">
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { FETCH_SNACKBAR_DATA } from "@/store/modules/snackbar/getters/getter-types";
import { iSnackbar } from "@/interface";

export default Vue.extend({
  name: "SnackBar",
  computed: {
    snackbars(): Array<iSnackbar> {
      return this.$store.getters[FETCH_SNACKBAR_DATA];
    },
    openedSnackbars(): Array<iSnackbar> {
      return this.snackbars.filter(
        (snackbar: { show: boolean }) => snackbar.show
      );
    },
  },
});
</script>
<style lang="scss">
.snackbar-msg {
  font-size: 15px;
  font-weight: bold;
}
</style>
