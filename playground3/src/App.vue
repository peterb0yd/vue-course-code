<template>
  <div id="app">
    <h1>Animations</h1>
    <hr>
    <button @click="show = !show">Show Alert</button>
    <select v-model="alertAnimation">
      <option value="fade">Fade</option>
      <option value="slide">Slide</option>
    </select>
    <transition :name="alertAnimation">
      <div class="info-alert" v-if="show">This is some info</div>
    </transition>
    <transition :name="alertAnimation">
      <div class="info-alert" v-if="show">This is some info</div>
    </transition>
    <transition appear
      enter-class=""
      enter-active-class="animated bounce"
      leave-class=""
      leave-active-class="animated shake">
      <div class="info-alert" v-if="show">
        This is some info
      </div>
    </transition>
    <transition :name="alertAnimation" mode="out-in">
      <div class="info-alert" v-if="show" key="info">This is some info</div>
      <div class="info-alert warning" v-else key="warning">This is a warning</div>
    </transition>
    <hr>
    <button @click="load = !load">Load / Remove element</button>
    <br><br>
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @enter-cancelled="enterCancelled"

      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
      @leave-cancelled="leaveCancelled"
      :css="false">
      <div style="height: 100px; width: 300px; background-color: lightgreen" v-if="load"></div>
    </transition>
    <hr>
    <button @click="selectedComponent = selectedComponent == 'app-success-alert' ? 'app-danger-alert' : 'app-success-alert'">Toggle Components</button>
    <hr>
    <transition :name="alertAnimation" mode="out-in">
      <component :is="selectedComponent"></component>
    </transition>
    <hr>
    <br><br>
    <button @click="addItem">Add Item</button>
    <br>
    <ul>
      <transition-group name="slide">
        <li
          v-for="(number, index) in numbers"
          :key="number"
          @click="removeItem(index)">
          {{ number }}
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script>
import DangerousAlert from './DangerousAlert.vue';
import SuccessAlert from './SuccessAlert.vue';

export default {
  name: 'app',
  data() {
    return {
      load: true,
      show: false,
      alertAnimation: 'fade',
      elementWidth: 100,
      selectedComponent: 'app-success-alert',
      numbers: [1,2,3,4,5]
    };
  },
  methods: {
    addItem() {
      const pos = Math.floor(Math.random() * this.numbers.length);
      this.numbers.splice(pos, 0, this.numbers.length + 1);
    },
    removeItem(index) {
      console.log(index);
      this.numbers.splice(index, 1);
    },
    beforeEnter(el) {
      console.log('before enter');
      this.elementWidth = 100;
      el.style.width = this.elementWidth + 'px';
    },
    enter(el, done) {
      console.log('enter');
      let round = 1;
      const interval = setInterval(() => {
        el.style.width = (this.elementWidth + round*10) + 'px';
        round++;
        if (round > 20) {
          clearInterval(interval);
          done();
        }
      }, 20);
    },
    afterEnter(el) {
      console.log('after enter');
    },
    enterCancelled(el) {
      console.log('enter cancelled');
    },
    beforeLeave(el) {
      console.log('before leave');
      this.elementWidth = 300;
      el.style.width = this.elementWidth + 'px';
    },
    leave(el, done) {
      console.log('leave');
      let round = 1;
      const interval = setInterval(() => {
        el.style.width = (this.elementWidth - round*10) + 'px';
        round++;
        if (round > 20) {
          clearInterval(interval);
          done();
        }
      }, 20);
    },
    afterLeave(el) {
      console.log('after leave');
    },
    leaveCancelled(el) {
      console.log('leave cancelled');
    }
  },
  components: {
    appDangerAlert: DangerousAlert,
    appSuccessAlert: SuccessAlert
  }
}
</script>

<style>
  .info-alert {
    display: block;
    margin: 20px;
    width: 200px;
    height: 50px;
    text-align: center;
    padding: 20px;
    background-color: lightblue;
  }

  .warning {
    background-color: lightyellow;
  }

  li {
    display: block;
    width: 300px;
    outline: 1px solid black;
    padding: 10px;
    cursor: pointer;
  }

  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active {
    transition: opacity 1s;
  }

  .fade-leave {

  }

  .fade-leave-active {
    transition: opacity 1s;
    opacity: 0;
  }

  .slide-enter {
    opacity: 0;
  }

  .slide-enter-active {
    animation: slide-in 1s ease-out forwards;
    transition: opacity 1s;
  }

  .slide-leave {

  }

  .slide-leave-active {
    animation: slide-out 1s ease-out forwards;
    transition: opacity 1s;
    opacity: 0;
    position: absolute;
  }

  .slide-move {
    transition: transform 1s;
  }

  @keyframes slide-in {
    from {
      transform: translateY(20px);
    } to {
      transform: translateY(0);
    }
  }

  @keyframes slide-out {
    from {
      transform: translateY(0);
    } to {
      transform: translateY(20px);
    }
  }

</style>
