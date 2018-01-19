import Home from './components/Home.vue';
import Portfolio from './components/portfolio/Portfolio.vue';
import Stocks from './components/stocks/Stocks.vue';

export default [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/stocks',
    name: 'stocks',
    component: Stocks
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: Portfolio
  }
]
