<template lang="html">
  <div>
    <h3>New Quote</h3>
    <button @click="counter++">Click!</button>
    <p>{{ counter }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0
    };
  },
  activated() {
    console.log('Activaed!');
  },
  destroyed() {
    console.log('Destroy!');
  },
  deactivated() {
    console.log('Deactivated');
  }
}
</script>

<style lang="css">
</style>
