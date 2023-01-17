<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-btn @click="goToSearch" color="lightgrey"
          ><v-icon left> mdi-arrow-left-bold </v-icon>Back to Search</v-btn
        >
      </v-col>
    </v-row>
    <v-row align="center" class="spacer" no-gutters>
      <v-col cols="4" sm="2" md="1">
        <div class="category-header-wrapper mt-7">
          <v-avatar color="secondary" size="36">
            <v-icon
              color="yellow darken-2"
              v-text="entitiesIconsMap[category.groupTitle]"
            ></v-icon>
          </v-avatar>
          <h2 class="ml-3">{{ categoryHeader }}</h2>
        </div>
      </v-col>
    </v-row>
    <div class="mt-7" v-if="category.groupTitle === 'characters'">
      <v-row>
        <v-col cols="8">
          <CharactersTable :character="category" />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import CharactersTable from "@/components/CharactersTable.vue";
import { GET_SELECTED_CATEGORY } from "@/store/modules/starwars/getters/getter-types";
import { entitiesIconsMap } from "@/utilities";
import { iCategory } from "@/interface/iCategory";

export default Vue.extend({
  name: "EntityList",
  data: () => ({
    entitiesIconsMap,
  }),
  components: { CharactersTable },
  methods: {
    goToSearch(): void {
      this.$router.push("/");
    },
  },
  computed: {
    category(): iCategory {
      return this.$store.getters[GET_SELECTED_CATEGORY];
    },
    categoryHeader(): string {
      return this.category?.groupTitle?.toUpperCase();
    },
  },
});
</script>
<style>
.category-header-wrapper {
  display: flex;
  justify-content: space-between;
}
</style>
