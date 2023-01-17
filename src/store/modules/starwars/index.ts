import { Module } from "vuex";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { starWarsState } from "./iStarWarsState";
import { initialCharacterState } from "@/utilities";

const StarWarsState: Module<starWarsState, Record<string, never>> = {
  state: {
    categories: [],
    isCategoriesLoading: false,
    selectedCategory: [],
    isAllEntitiesEmpty: false,
    selectedCategoryData: [],
    selectedCharacter: { ...initialCharacterState },
    isCharacterActionLoading: false,
    isCharacterDeleteLoading: false,
  },
  actions,
  getters,
  mutations,
};

export default StarWarsState;
