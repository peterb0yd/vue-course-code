<template lang="html">
  <div id="container">
    <h2>What's {{ equation }}?</h2>
    <hr>
    <ul>
      <li v-for="answer in answers" @click="checkAnswer(answer)">{{ answer }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      x: 0,
      y: 0,
      sign: null,
      equation: null,
      answers: [0,0,0,0]
    };
  },
  methods: {
    randomValue(){
      return (Math.floor(Math.random()*40)) - (Math.floor(Math.random()*40));
    },
    getSign() {
      return ['-', '+'][Math.floor(Math.random()*2)]
    },
    getNewValue() {
      let newVal;
      let hasNewValue = false;
      while (hasNewValue == false) {
        if (Math.floor(Math.random()*2)%2==0) {
          newVal = this.theAnswer() + (Math.floor(Math.random()*10)+1);
        } else {
          newVal = this.theAnswer() - (Math.floor(Math.random()*10)+1);
        }
        hasNewValue = this.answers.indexOf(newVal) < 0;
      }
      return newVal;
    },
    assignAnswers() {
      let answerIndex = Math.floor(Math.random() * this.answers.length);
      this.answers.forEach((answer, index) => {
        if (answerIndex == index) {
          this.answers[index] = this.theAnswer();
        } else {
          this.answers[index] = this.getNewValue();
        }
      });
      return this.answers;
    },
    theAnswer() {
      return this.sign === '+' ? this.x + this.y : this.x - this.y;
    },
    checkAnswer(val) {
      if (val == this.theAnswer()) {
        this.$emit('switchComponent');
      } else {
        alert('shake!');
      }
    }
  },
  created() {
    this.x = this.randomValue();
    this.y = this.randomValue();
    this.sign = this.getSign();
    this.equation = this.x + ' ' + this.sign + ' ' + this.y;
    this.answers = this.assignAnswers();
  }
}
</script>

<style lang="css" scoped>

#container {
  display: block;
  text-align: center;
  width: 500px;
  height: 400px;
  margin: 20px auto;
  border: 1px solid lightblue;
  border-radius: 20px;
  background-color: lightgray;
  padding: 20px;
}

ul { margin: 0; padding: 0 }

li {
  display: inline-block;
  cursor: pointer;
  transform: inherit;
  width: 20%;
  margin: 20px 30px;
  padding: 40px 1%;
  background-color: blue;
  color: white;
  border: 1px solid darkblue;
  border-radius: 10px;
}

</style>
