<template>
  <div id="app">
    <h1>Super Quiz</h1>
    <br><br>
    <hr>
    <br>
    <transition name="flip" mode="out-in">
      <component
        :is="currentComponent"
        @switchComponent="currentComponent = currentComponent == 'app-quiz' ? 'app-correct' : 'app-quiz'">
      </component>
    </transition>
  </div>
</template>

<script>
import Quiz from './Quiz.vue';
import Correct from './Correct.vue';

export default {
  name: 'app',
  data () {
    return {
      currentComponent: 'app-quiz'
    }
  },
  components: {
    appQuiz: Quiz,
    appCorrect: Correct
  },
}
</script>

<style>

  div { display: block }

  .flip-enter {

  }
  .flip-enter-active {
    animation: flip-in 0.3s ease-out forwards;
  }
  .flip-leave {

  }
  .flip-leave-active {
    animation: flip-out 0.3s ease-out forwards;
  }

  @keyframes flip-out {
    from {
      transform: rotateY(0deg);
    }
    to {
      transform: rotateY(90deg);
    }
  }

  @keyframes flip-in {
    from {
      transform: rotateY(90deg);
    }
    to {
      transform: rotateY(0deg);
    }
  }

</style>
