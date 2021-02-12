<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-app >
    <v-content class="default-content">
      <v-container
        fluid
        class="overflow-hidden"
      >
        <transition>
          <router-view />
        </transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

  export default {
    name: 'App',
    components: {
    },
    data () {
      return {
      }
    },
    computed: {

    },
    watch: {

    },
    async created () {

    },
    methods: {

    },
  }
</script>

<style lang="scss">
.default-content {
  background-color: var(--v-backGround-base);
}
.top-bar-icons {
  height: 48px;
  overflow: hidden;
  .v-btn {
    height: 48px !important;
    padding: 0 10px !important;
    min-width: 65px !important;
    border-radius: 0;
    margin-right: 0;

    .v-badge__wrapper {
        .primary {
          i {
            margin-left: 0;
            margin-right: 0;
          }
        }
    }
    &-icons {
      font-size: 18px;
    }
  }

}
</style>
