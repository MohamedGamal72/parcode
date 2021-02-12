<template lang="html">
  <div v-if="loading" @click="finish">
    <v-progress-circular
      indeterminate
      size="24"
      class="loading-progress-circular"
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
    fail(error) {
      this.loading = false
    },
    increase(num) {
      console.log(num)
    },
  },
}
</script>

<style lang="scss">
.loading-progress-circular {
  z-index: 6;
  position: fixed !important;
  top: 10px;
  left: 88px;
  color: white;
}
</style>
