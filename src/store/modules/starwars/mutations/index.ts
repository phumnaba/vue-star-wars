import { MutationTree } from "vuex";
import {
  SET_CATEGORIES,
  SET_IS_CATEGORIES_LOADING,
  SET_SELECTED_CATEGORY,
  SET_IS_ALL_ENTITIES_EMPTY,
  ADD_CHARACTER,
  SET_CATEGORY_DATA,
  EDIT_CHARACTER,
  DELETE_CHARACTER,
  SET_SELECTED_CHARACTER,
} from "./mutation-types";
import { starWarsState } from "../iStarWarsState";

export const mutations: MutationTree<starWarsState> = {
  [SET_CATEGORIES](state, payload) {
    state.categories = payload;
  },
  [SET_IS_CATEGORIES_LOADING](state, flag: boolean) {
    state.isCategoriesLoading = flag;
  },
  [SET_SELECTED_CATEGORY](state, payload) {
    state.selectedCategory = payload;
  },
  [SET_IS_ALL_ENTITIES_EMPTY](state, flag: boolean) {
    state.isAllEntitiesEmpty = flag;
  },
  [SET_CATEGORY_DATA](state, payload) {
    state.selectedCategoryData = payload;
  },
  [SET_SELECTED_CHARACTER](state, payload) {
    state.selectedCharacter = payload;
  },
  [ADD_CHARACTER](state, payload) {
    state.selectedCategoryData = [...state.selectedCategoryData, payload];
  },
  [EDIT_CHARACTER](state, updatedCharacter) {
    const selectedCategoryData = [...state.selectedCategoryData];
    const index = selectedCategoryData.findIndex(
      (category) => category.id === updatedCharacter.id
    );
    selectedCategoryData[index] = {
      ...selectedCategoryData[index],
      ...updatedCharacter,
    };
    state.selectedCategoryData = selectedCategoryData;
  },
  [DELETE_CHARACTER](state, id) {
    const selectedCategoryData = [...state.selectedCategoryData];
    const index = selectedCategoryData.findIndex(
      (category) => category.id === id
    );
    selectedCategoryData.splice(index, 1);
    state.selectedCategoryData = selectedCategoryData;
  },
};
