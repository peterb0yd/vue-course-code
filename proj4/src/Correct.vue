<template lang="html">
  <div id="container">
    <h1>That's correct!</h1>
    <br><hr><br>
    <button @click="nextQuestion">Next Question</button>
  </div>
</template>

<script>
export default {
  methods: {
    nextQuestion() {
      this.$emit('switchComponent');
    }
  }
}
</script>

<style lang="css" scoped>

#container {
  display: block;
  text-align: center;
  width: 400px;
  height: 200px;
  margin: 20px auto;
  border: 1px solid green;
  border-radius: 20px;
  background-color: lightgreen;
  padding: 20px;
}

</style>
