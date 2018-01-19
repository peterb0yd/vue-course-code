export const fruitMixin = {
  data() {
    return {
      fruits: ['Apple', 'Orange', 'Mango', 'Banana'],
      filterText: ''
    };
  },
  computed: {
    filteredFruits() {
      return this.fruits.filter((element) => {
        return element.match(this.filterText);
      });
    }
  },
  created() {
    console.log('Created!');
  }
}
