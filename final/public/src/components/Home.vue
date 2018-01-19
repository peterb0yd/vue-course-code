<template lang="html">
  <div>
    <h1> Home </h1>
    <h2> Funds: {{ formatCurrency(portfolio.available) }}</h2>
    <h2> Value: {{ formatCurrency(portfolio.value) }}</h2>
  </div>
</template>

<script>
  import mixin from '../mixins/mixin';

  export default {
    computed: {
      portfolio() {
        return this.$store.state.portfolio;
      }
    },
    mixins: [mixin]
  }
</script>

<style lang="css">
</style>
