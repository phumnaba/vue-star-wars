<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-dialog v-model="isOpen" persistent width="600">
    <v-card>
      <v-card-title><h4>Delete character</h4></v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="12" class="pa-7">
              <p>
                Do you really want to delete character record of
                <span class="font-weight-bold">{{
                  selectedCharacter.name
                }}</span
                >?
              </p>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions style="height: 70px">
        <v-spacer></v-spacer>
        <v-btn text width="200" @click.native="close"> No </v-btn>
        <v-btn width="200" color="error" @click.native="submit"> Yes </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import Vue from "vue";
import { REMOVE_CHARACTER } from "@/store/modules/starwars/actions/action-types";

export default Vue.extend({
  name: "DeleteCharacterModal",
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    selectedCharacter: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    submit() {
      this.$store.dispatch(REMOVE_CHARACTER, this.selectedCharacter.id);
      this.$emit("update:isOpen", false);
    },
    close() {
      this.$emit("update:isOpen", false);
    },
  },
});
</script>
