<template lang="">
  <div>
    <label>First Name</label>
    <input @input.lazy="sendInput" v-model="firstName">

    <label>Last Name</label>
    <input @input.lazy="sendInput" v-model="lastName">
  </div>
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {
      firstName: 'Peter',
      lastName: 'Boyd'
    };
  },
  methods: {
    sendInput() {
      this.$emit('input', this.firstName + ' ' + this.lastName);
    }
  }
}
</script>

<style lang="css">
</style>
