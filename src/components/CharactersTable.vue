<template>
  <div class="entity-table-wrapper">
    <v-data-table
      :headers="CHARACTER_TABLE_HEADERS"
      :items="items"
      :items-per-page="10"
      class="elevation-3"
    >
      <template v-slot:body="{ items }">
        <tbody v-if="items.length > 0">
          <tr
            v-for="item in items"
            :key="item.id"
            @mouseover="selectCharacter(item)"
            @mouseleave="deSelectCharacter()"
          >
            <td>
              {{ item.name }}
            </td>
            <td>
              {{ item.gender }}
            </td>
            <td>
              {{ item.birth_year }}
            </td>
            <td>
              {{ `${item.height} cm` }}
            </td>
            <td>
              {{
                item.mass && item.mass !== "unknown"
                  ? `${item.mass} kg`
                  : item.mass
              }}
            </td>
            <td width="15%">
              <div v-if="item === selectedCharacter && isActionActive">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      fab
                      small
                      color="secondary"
                      v-bind="attrs"
                      v-on="on"
                      class="mr-2"
                      @click="editCharacter(item)"
                    >
                      <v-icon small dark>mdi-pencil</v-icon>
                    </v-btn>
                  </template>
                  <span>Edit character</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      fab
                      small
                      color="secondary"
                      v-bind="attrs"
                      v-on="on"
                      class="mr-2"
                      @click="deleteCharacter(item)"
                    >
                      <v-icon small dark>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                  <span>Delete character</span>
                </v-tooltip>
              </div>
            </td>
          </tr>
        </tbody>
      </template>
      <template v-slot:no-data> No characters found. </template>`
    </v-data-table>
    <v-row class="mt-4">
      <v-col cols="12">
        <div class="d-flex">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                @click="addCharacter"
                ><v-icon left> mdi-plus-box </v-icon>
                <span>Add character</span></v-btn
              >
            </template>
            <span>Add new character</span>
          </v-tooltip>
        </div>
      </v-col>
    </v-row>
    <ManageCharacterForm
      title="Add Character"
      :isOpen.sync="showAddCharacterDialog"
      :selectedCharacter="selectedCharacter"
      :key="'add-character-' + showAddCharacterDialog"
    />
    <ManageCharacterForm
      title="Edit Character"
      actionType="Edit"
      :isOpen.sync="showEditCharacterDialog"
      :selectedCharacter="selectedCharacter"
      :key="'edit-character-' + showEditCharacterDialog"
    />
    <DeleteCharacterModal
      :isOpen.sync="showDeleteCharacterDialog"
      :selectedCharacter="selectedCharacter"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { CHARACTER_TABLE_HEADERS, initialCharacterState } from "@/utilities";
import { SET_SELECTED_CHARACTER } from "@/store/modules/starwars/mutations/mutation-types";
import ManageCharacterForm from "@/views/character/ManageCharacterForm.vue";
import DeleteCharacterModal from "@/views/character/DeleteCharacterModal.vue";
import {
  GET_CATEGORY_DATA,
  GET_SELECTED_CHARACTER,
} from "@/store/modules/starwars/getters/getter-types";

export default Vue.extend({
  name: "CharactersTable",
  props: {
    character: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    isShown: false,
    showAddCharacterDialog: false,
    showEditCharacterDialog: false,
    showDeleteCharacterDialog: false,
    isActionActive: false,
    CHARACTER_TABLE_HEADERS,
  }),
  components: { ManageCharacterForm, DeleteCharacterModal },
  computed: {
    items() {
      return this.$store.getters[GET_CATEGORY_DATA];
    },
    selectedCharacter() {
      return this.$store.getters[GET_SELECTED_CHARACTER];
    },
  },
  methods: {
    selectCharacter(character: never[]) {
      this.isActionActive = true;
      this.$store.commit(SET_SELECTED_CHARACTER, character);
    },
    deSelectCharacter() {
      this.isActionActive = false;
    },
    addCharacter() {
      this.showAddCharacterDialog = true;
      this.$store.commit(SET_SELECTED_CHARACTER, initialCharacterState);
    },
    editCharacter(character: never[]) {
      this.showEditCharacterDialog = true;
      this.$store.commit(SET_SELECTED_CHARACTER, character);
    },
    deleteCharacter(character: never[]) {
      this.showDeleteCharacterDialog = true;
      this.$store.commit(SET_SELECTED_CHARACTER, character);
    },
    closeModal() {
      this.showAddCharacterDialog = false;
    },
  },
});
</script>
