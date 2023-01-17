<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-dialog v-model.lazy="isOpen" scrollable width="800" style="z-index: 999">
    <v-card ref="manageCharacterForm">
      <v-card-title
        ><h4>{{ title }}</h4></v-card-title
      >
      <v-divider></v-divider>
      <v-card-text>
        <v-form v-model="isFormValid">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Name*"
                  ref="name"
                  v-model.lazy="selectedCharacter.name"
                  placeholder="Luke Vader"
                  :rules="[
                    () => !!selectedCharacter.name || 'Name is required',
                  ]"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Gender*"
                  ref="gender"
                  v-model.lazy="selectedCharacter.gender"
                  placeholder="Male"
                  :rules="[
                    () => !!selectedCharacter.gender || 'Gender is required',
                  ]"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Height (In cm)*"
                  ref="height"
                  v-model.lazy="selectedCharacter.height"
                  placeholder="165"
                  :rules="[
                    () => !!selectedCharacter.height || 'Height is required',
                  ]"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Mass (In kg)*"
                  ref="mass"
                  v-model.lazy="selectedCharacter.mass"
                  placeholder="84"
                  :rules="[
                    () => !!selectedCharacter.mass || 'Mass is required',
                  ]"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Birth year*"
                  ref="birthYear"
                  v-model.lazy="selectedCharacter.birth_year"
                  placeholder="19BBY"
                  :rules="[
                    () =>
                      !!selectedCharacter.birth_year ||
                      'Birth year is required',
                  ]"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Home world"
                  v-model.lazy="selectedCharacter.homeworld"
                  placeholder="https://swapi.dev/api/planets/1/"
                  :disabled="isEditMode"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="URL"
                  v-model.lazy="selectedCharacter.url"
                  placeholder="https://swapi.dev/api/people/1/"
                  :disabled="isEditMode"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Hair color"
                  v-model.lazy="selectedCharacter.hair_color"
                  placeholder="Blond"
                  :disabled="isEditMode"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Skin color"
                  v-model.lazy="selectedCharacter.skin_color"
                  placeholder="Fair"
                  :disabled="isEditMode"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Eye color"
                  v-model.lazy="selectedCharacter.eye_color"
                  placeholder="Blue"
                  :disabled="isEditMode"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <small>*indicates required field</small>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions style="height: 70px">
        <v-spacer></v-spacer>
        <v-btn text width="200" @click.native="close"> CANCEL </v-btn>
        <v-btn
          width="200"
          @click.native="submit"
          :loading="isCharacterActionLoading"
          :disabled="!isFormValid"
          :color="isEditMode ? 'warning' : 'success'"
        >
          {{ title }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import Vue from "vue";
import {
  CREATE_CHARACTER,
  UPDATE_CHARACTER,
} from "@/store/modules/starwars/actions/action-types";
import { IS_CHARACTER_ACTION_LOADING } from "@/store/modules/starwars/getters/getter-types";
import { SET_CHARACTER_ACTION_LOADING } from "@/store/modules/starwars/mutations/mutation-types";
import { SET_SNACKBAR_DATA } from "@/store/modules/snackbar/mutations/mutation-types";
import { delay } from "@/utilities/helper";

export default Vue.extend({
  name: "ManageCharacterForm",
  data: () => ({
    isFormValid: false,
  }),
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    selectedCharacter: {
      type: Object,
      default: () => ({}),
    },
    title: {
      type: String,
      default: "",
    },
    actionType: {
      type: String,
      default: "Add",
    },
  },
  computed: {
    isEditMode(): boolean {
      return this.actionType === "Edit";
    },
    isCharacterActionLoading(): boolean {
      return this.$store.getters[IS_CHARACTER_ACTION_LOADING];
    },
  },
  methods: {
    submit(): void {
      this.isEditMode
        ? this.asyncSubmitCharacter(
            UPDATE_CHARACTER,
            "Character updated successfully"
          )
        : this.asyncSubmitCharacter(
            CREATE_CHARACTER,
            "Character added successfully"
          );
    },
    async asyncSubmitCharacter(action: string, message: string): Promise<any> {
      this.$store.commit(SET_CHARACTER_ACTION_LOADING, true);
      await delay(2000);
      this.$store.dispatch(action, this.selectedCharacter);
      this.$store.commit(SET_CHARACTER_ACTION_LOADING, false);
      this.showSuccessNotification(message);
      this.close();
    },
    showSuccessNotification(message: string): void {
      const characterSubmitSuccess = {
        show: true,
        message,
        color: "success",
      };
      this.$store.commit(SET_SNACKBAR_DATA, characterSubmitSuccess);
    },
    close(): void {
      this.$emit("update:isOpen", false);
    },
  },
});
</script>
