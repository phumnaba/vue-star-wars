import { ActionTree } from "vuex";
import StarWarsService from "@/services/StarWarsService";
import { starWarsState } from "../iStarWarsState";
import {
  FETCH_STAR_WARS_ENTITIES,
  CREATE_CHARACTER,
  REMOVE_CHARACTER,
  UPDATE_CHARACTER,
} from "./action-types";
import {
  SET_IS_CATEGORIES_LOADING,
  SET_CATEGORIES,
  SET_IS_ALL_ENTITIES_EMPTY,
  ADD_CHARACTER,
  EDIT_CHARACTER,
  DELETE_CHARACTER,
} from "../mutations/mutation-types";
import { SET_SNACKBAR_DATA } from "@/store/modules/snackbar/mutations/mutation-types";

export const actions: ActionTree<starWarsState, Record<string, never>> = {
  async [FETCH_STAR_WARS_ENTITIES]({ commit }, query: string) {
    let starWarsEntities = [];
    commit(SET_IS_CATEGORIES_LOADING, true);
    commit(SET_CATEGORIES, []);
    // eslint-disable-next-line no-useless-catch
    try {
      const results = await StarWarsService.discoverStarWarEntities(query);
      const entities = results.map((resp) =>
        (resp as PromiseFulfilledResult<any>).value
          ? (resp as PromiseFulfilledResult<any>).value
          : []
      );
      starWarsEntities = [
        { characters: entities[0]?.data?.results },
        { films: entities[1]?.data?.results },
        { planets: entities[2]?.data?.results },
        { species: entities[3]?.data?.results },
        { starships: entities[4]?.data?.results },
        { vehicles: entities[5]?.data?.results },
      ];
      commit(SET_CATEGORIES, starWarsEntities);
      commit(SET_IS_CATEGORIES_LOADING, false);

      let isAllEmpty = false;
      for (const entity of entities) {
        isAllEmpty = entity?.data?.results.length === 0 ? true : false;
        if (!isAllEmpty) break;
      }
      commit(SET_IS_ALL_ENTITIES_EMPTY, isAllEmpty);
      if (isAllEmpty) {
        const noEntitiesObj = {
          show: true,
          message: `Resources or entities with search term ${query} not found`,
          color: "error",
        };
        commit(SET_SNACKBAR_DATA, noEntitiesObj);
      }

      const rejectedEntities = results
        .filter((res) => res.status === "rejected")
        .map((resp) => (resp as PromiseRejectedResult).reason);

      rejectedEntities.forEach((error) => {
        const entityErrorObj = {
          show: true,
          message: error,
          color: "error",
        };
        commit(SET_SNACKBAR_DATA, entityErrorObj);
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const genericError = {
        show: true,
        message: errorMessage,
        color: "error",
      };
      commit(SET_SNACKBAR_DATA, genericError);
      commit(SET_IS_CATEGORIES_LOADING, false);
      commit(SET_CATEGORIES, []);
      throw error;
    }
  },
  [CREATE_CHARACTER]({ commit }, payload) {
    commit(ADD_CHARACTER, payload);
  },
  [UPDATE_CHARACTER]({ commit }, payload) {
    commit(EDIT_CHARACTER, payload);
  },
  [REMOVE_CHARACTER]({ commit }, id) {
    commit(DELETE_CHARACTER, id);
  },
};
