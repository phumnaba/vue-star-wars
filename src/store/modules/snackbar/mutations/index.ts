import { MutationTree } from "vuex";
import { snackbarState } from "../iSnackbarStates";
import { SET_SNACKBAR_DATA } from "./mutation-types";

export const mutations: MutationTree<snackbarState> = {
  [SET_SNACKBAR_DATA](state, snackbar) {
    state.snackbars = state.snackbars.concat(snackbar);
  },
};
