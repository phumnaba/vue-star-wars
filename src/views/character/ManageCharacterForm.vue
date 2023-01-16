<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-dialog v-model.lazy="isOpen" scrollable width="800" style="z-index: 1111">
    <v-card ref="manageCharacterForm">
      <v-card-title
        ><h4>{{ title }}</h4></v-card-title
      >
      <v-divider></v-divider>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                label="Name*"
                ref="name"
                v-model.lazy="selectedCharacter.name"
                placeholder="Luke Vader"
                :rules="[() => !!selectedCharacter.name || 'Name is required']"
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
                :rules="[() => !!selectedCharacter.mass || 'Mass is required']"
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
                    !!selectedCharacter.birth_year || 'Birth year is required',
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
        <small>*indicates required field</small>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions style="height: 70px">
        <v-spacer></v-spacer>
        <v-btn text width="200" @click.native="close"> CANCEL </v-btn>
        <v-btn width="200" color="primary" @click.native="submit">
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

export default Vue.extend({
  name: "ManageCharacterForm",
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
  },
  methods: {
    submit() {
      if (this.actionType === "Add") {
        this.$store.dispatch(CREATE_CHARACTER, this.selectedCharacter);
      } else if (this.actionType === "Edit") {
        this.$store.dispatch(UPDATE_CHARACTER, this.selectedCharacter);
      }
      this.$emit("update:isOpen", false);
    },
    close() {
      this.$emit("update:isOpen", false);
    },
  },
});
</script>
