import Vue from "vue";
import Vuex from "vuex";
import StarWarsState from "@/store/modules/starwars";
import SnackbarState from "@/store/modules/snackbar";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    StarWarsState,
    SnackbarState,
  },
});
