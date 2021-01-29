<template>
  <div id="app">
    <v-app id="inspire">
      <v-main class="grey lighten-3">
        <v-sheet style="height: 100%">
          <transition
            name="fade"
            mode="out-in"
          >
            <router-view/>
          </transition>
        </v-sheet>
      </v-main>
    </v-app>
  </div>
</template>

<style scoped>

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

</style>

