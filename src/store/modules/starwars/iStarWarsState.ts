import { iCharacter } from "@/interface/iCharacter";

export interface starWarsState {
  categories: Array<any>;
  isCategoriesLoading: boolean;
  selectedCategory: object;
  isAllEntitiesEmpty: boolean;
  selectedCategoryData: Array<any>;
  selectedCharacter: iCharacter;
  isCharacterActionLoading: boolean;
  isCharacterDeleteLoading: boolean;
}
