<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-img src="star-wars-logo.png" class="my-3" contain height="200" />
      </v-col>
      <v-col cols="12">
        <div class="d-dropdown">
          <div class="d-dropdown--input-wrapper">
            <v-text-field
              label="Star wars"
              placeholder="Search star wars entities or resources"
              outlined
              v-model="searchEntityQuery"
              @input="onSearch"
              loader-height="3"
              :loading="isCategoriesLoading"
            >
            </v-text-field>
          </div>
          <div v-if="isValidSearch" class="d-dropdown--options-wrapper">
            <div
              class="d-dropdown-option"
              v-for="category in filteredCategories"
              :key="category._id"
            >
              <div v-if="category.options.length">
                <div class="d-dropdown-group-title">
                  {{ category.groupTitle }}
                </div>
                <ul>
                  <li
                    v-for="_item in category.options.slice(0, 3)"
                    :key="_item"
                    v-html="highlightTerm(_item)"
                    @click="onCategoryOptionClick(_item)"
                  ></li>
                </ul>
                <div class="view-all">
                  <v-btn text @click="viewAll(category, category.groupTitle)"
                    >view all</v-btn
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { FETCH_STAR_WARS_ENTITIES } from "@/store/modules/starwars/actions/action-types";
import { GET_CATEGORIES } from "@/store/modules/starwars/getters/getter-types";
import {
  IS_CATEGORIES_LOADING,
  IS_ALL_ENTITIES_EMPTY,
} from "@/store/modules/starwars/getters/getter-types";
import {
  SET_CATEGORY_DATA,
  SET_SELECTED_CATEGORY,
} from "@/store/modules/starwars/mutations/mutation-types";
import { v4 as uuidv4 } from "uuid";

export default Vue.extend({
  name: "Search",
  data: () => ({
    searchEntityQuery: "",
    isDropDownActive: false,
    timeoutId: 0,
  }),
  computed: {
    categories() {
      return this.$store.getters[GET_CATEGORIES];
    },
    isCategoriesLoading() {
      return this.$store.getters[IS_CATEGORIES_LOADING];
    },
    isAllEntitiesEmpty(): boolean {
      return this.$store.getters[IS_ALL_ENTITIES_EMPTY];
    },
    filteredCategories() {
      let entities: any[] = [];
      this.categories?.forEach((category: any) => {
        let options: any[] = [];
        const groupTitle = Object.keys(category)[0];
        for (const cat in category) {
          category[cat]?.forEach((entity: any) =>
            options.push(entity.name || entity.title)
          );
        }
        entities.push({
          groupTitle,
          _id: groupTitle,
          options,
          data: category[groupTitle],
        });
      });
      return entities;
    },
    isValidSearch(): boolean {
      return (
        this.searchEntityQuery.length > 0 &&
        this.isDropDownActive &&
        !this.isAllEntitiesEmpty
      );
    },
  },
  methods: {
    onSearch() {
      if (this.searchEntityQuery.trim() !== "") {
        this.isDropDownActive = true;
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
          this.$store.dispatch(
            FETCH_STAR_WARS_ENTITIES,
            this.searchEntityQuery
          );
        }, 1000);
      } else this.isDropDownActive = false;
    },
    onCategoryOptionClick(option: any) {
      this.searchEntityQuery = option;
      this.onSearch();
    },
    viewAll(category: any, categoryRoute: string) {
      const filteredDataList = category.data.map((data: any) => ({
        ...data,
        id: uuidv4(),
      }));
      category.data = filteredDataList;
      this.$store.commit(SET_SELECTED_CATEGORY, category);
      this.$store.commit(SET_CATEGORY_DATA, category.data);
      this.$router.push(`entity/${categoryRoute}`);
    },
    highlightTerm(text: string) {
      return text.replaceAll(
        this.searchEntityQuery,
        `<b><mark>${this.searchEntityQuery}</mark></b>`
      );
    },
  },
});
</script>
<style>
* {
  box-sizing: border-box;
}
.d-dropdown {
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: left;
  font-size: 16px;
}
.d-dropdown--options-wrapper {
  border: 1px solid #ddd;
  position: absolute;
  top: 63%;
  left: 0;
  right: 0;
}
.d-dropdown--options-wrapper .d-dropdown-option {
  border-top: 1px solid #ddd;
}
.d-dropdown--options-wrapper .d-dropdown-option:first-child {
  border-top: 0;
}

.d-dropdown-group-title {
  padding: 5px;
  font-weight: 500;
  background: #f9f9f9;
}

.d-dropdown-option ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

ul li {
  padding: 5px;
}

ul li:hover {
  background: #f9f9f9;
  cursor: pointer;
}
.view-all {
  text-align: right;
}
</style>
