import { GetterTree } from "vuex";
import { snackbarState } from "../iSnackbarStates";
import { FETCH_SNACKBAR_DATA } from "./getter-types";

export const getters: GetterTree<snackbarState, Record<string, never>> = {
  [FETCH_SNACKBAR_DATA](state) {
    return state.snackbars;
  },
};
