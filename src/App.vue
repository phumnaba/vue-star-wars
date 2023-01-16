<template>
  <v-app>
    <v-main>
      <v-container fill-height fluid>
        <v-layout>
          <router-view v-slot="{ Component, route }">
            <transition :name="route.meta.transition || 'fade'">
              <component :is="Component" />
            </transition>
          </router-view>
        </v-layout>
      </v-container>
    </v-main>
    <SnackBar />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import SnackBar from "@/components/SnackBar.vue";

export default Vue.extend({
  name: "App",
  components: { SnackBar },
});
</script>
