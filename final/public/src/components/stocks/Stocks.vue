<template lang="html">
  <div id="container">
    <ul>
      <app-company v-for="company in companies" :company="company"></app-company>
    </ul>
  </div>
</template>

<script>
  import Company from './Company.vue';

  export default {
    computed: {
      companies() {
        return this.$store.state.companies;
      }
    },
    components: {
      appCompany: Company
    }
  }
</script>

<style lang="css" scoped>

  #container {
    text-align: center;
  }

</style>
