import { Module } from "vuex";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { snackbarState } from "./iSnackbarStates";

const SnackbarState: Module<snackbarState, Record<string, never>> = {
  state: {
    snackbars: [],
  },
  getters,
  mutations,
};

export default SnackbarState;
