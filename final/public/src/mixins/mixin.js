export default {
  methods: {
    formatCurrency(amount) {
      if (amount == 0 || typeof amount === 'undefined') return '$0';
      return '$' + amount.toLocaleString();
    }
  }
}
