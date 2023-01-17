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
  SET_CHARACTER_ACTION_LOADING,
  SET_CHARACTER_DELETE_LOADING,
} from "./mutation-types";
import { starWarsState } from "../iStarWarsState";
import { iCharacter } from "@/interface/iCharacter";

export const mutations: MutationTree<starWarsState> = {
  [SET_CATEGORIES](state, categories: Array<any>) {
    state.categories = categories;
  },
  [SET_IS_CATEGORIES_LOADING](state, isLoading: boolean) {
    state.isCategoriesLoading = isLoading;
  },
  [SET_SELECTED_CATEGORY](state, category: object) {
    state.selectedCategory = category;
  },
  [SET_IS_ALL_ENTITIES_EMPTY](state, isEmpty: boolean) {
    state.isAllEntitiesEmpty = isEmpty;
  },
  [SET_CATEGORY_DATA](state, ctegoryData: Array<any>) {
    state.selectedCategoryData = ctegoryData;
  },
  [SET_SELECTED_CHARACTER](state, character: iCharacter) {
    state.selectedCharacter = character;
  },
  [ADD_CHARACTER](state, character: iCharacter) {
    state.selectedCategoryData = [...state.selectedCategoryData, character];
  },
  [SET_CHARACTER_ACTION_LOADING](state, isLoading: boolean) {
    state.isCharacterActionLoading = isLoading;
  },
  [EDIT_CHARACTER](state, updatedCharacter: iCharacter) {
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
  [DELETE_CHARACTER](state, characterId: string) {
    const selectedCategoryData = [...state.selectedCategoryData];
    const index = selectedCategoryData.findIndex(
      (category) => category.id === characterId
    );
    selectedCategoryData.splice(index, 1);
    state.selectedCategoryData = selectedCategoryData;
  },
  [SET_CHARACTER_DELETE_LOADING](state, isLoading: boolean) {
    state.isCharacterDeleteLoading = isLoading;
  },
};
