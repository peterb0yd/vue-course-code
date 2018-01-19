<template lang="html">
  <div class="">
    <div class="title">
      <slot name="title"></slot>
    </div>
    <div>
      <slot></slot>
      <span class="subtitle"><slot name="subtitle">The Subtitle</slot></span>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
  div {
    border: 1px solid gray;
    box-shadow: 1px 1px 2px black;
    padding: 30px;
    margin: auto;
    text-align: center;
  }

  h2 {
    color: red
  }

  .subtitle {
    font-weight: bold;
    color: darkblue;
  }
</style>
