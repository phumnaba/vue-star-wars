import { GetterTree } from "vuex";
import {
  GET_CATEGORIES,
  IS_CATEGORIES_LOADING,
  GET_SELECTED_CATEGORY,
  IS_ALL_ENTITIES_EMPTY,
  GET_CATEGORY_DATA,
  GET_SELECTED_CHARACTER,
} from "./getter-types";
import { starWarsState } from "../iStarWarsState";

export const getters: GetterTree<starWarsState, Record<string, never>> = {
  [GET_CATEGORIES](state) {
    return state.categories;
  },
  [IS_CATEGORIES_LOADING](state) {
    return state.isCategoriesLoading;
  },
  [GET_SELECTED_CATEGORY](state) {
    return state.selectedCategory;
  },
  [IS_ALL_ENTITIES_EMPTY](state) {
    return state.isAllEntitiesEmpty;
  },
  [GET_CATEGORY_DATA](state) {
    return state.selectedCategoryData;
  },
  [GET_SELECTED_CHARACTER](state) {
    return state.selectedCharacter;
  },
};
