import Vue from 'vue';
import Vuex from 'vuex';
import http from 'axios'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    portfolio: {},
    companies: [],
    stocks: []
  },
  mutations: {
    buy(state, payload) {
      let addedValue = 0;
      let company = getCompanyById(state, payload.companyId);

      // Portfolio has this stock already
      if (contains(state.stocks, company.id)) {
        state.stocks.forEach((stock, i, arr) => {
          if (stock.companyId === company.id) {
            let addedShares = parseInt(payload.shares);

            // Check if user can afford this
            addedValue = addedShares * company.price;
            if (canAfford(state.portfolio, addedValue)) {
              // Update the stock
              arr[i].shares = stock.shares + addedShares;
              // Update funds
              setFunds(state, addedValue);
            }
          }
        });
      // Portfolio does NOT have this stock
      } else {
        let shares = parseInt(payload.shares);

        // Check if user can afford this
        addedValue = shares * company.price;
        if (canAfford(state.portfolio, addedValue)) {
          // Add the stock!
          state.stocks.push({
            companyId: company.id,
            shares: shares
          });
          // Update funds
          setFunds(state, addedValue);
        }
      }
    },
    sell(state, payload) {
      let company = getCompanyById(state, payload.companyId);
      let subtractedShares = payload.shares;
      let subtractedValue = -(payload.shares * company.price);

      state.stocks.forEach((stock, i, arr) => {
        if (stock.companyId === payload.companyId) {
          if (subtractedShares < stock.shares) {
            arr[i].shares = stock.shares - subtractedShares;
          } else if (subtractedShares == stock.shares) {
            arr.splice(i, 1);
          } else {
            alert('You don\'t have enough shares to sell this amount!');
            return;
          }
          setFunds(state, subtractedValue);
        }
      });
    },
    endDay(state) {
      state.companies.forEach((company, i, arr) => {
        let price = company.price;
        let max = Math.floor(Math.random()*5);
        let dif = Math.floor(Math.random()*5);
        let newPrice = price + (max-dif);
        newPrice = newPrice < 0 ? 0 : newPrice;
        arr[i].price = newPrice;
      });
      adjustPortfolio(state);
    }
  },
  actions: {
    loadData(context) {
      http.get('/load').then((res) => {
        context.state.portfolio = res.data.portfolio;
        context.state.companies = res.data.companies;
        if (res.data.stocks) {
          context.state.stocks = res.data.stocks;
        }
      }).catch((err) => {
        console.error(err);
      });
    },
    saveData(context) {
      let body = {
        companies: context.state.companies,
        portfolio: context.state.portfolio,
        stocks: context.state.stocks
      }
      // Send to server
      http.post('/save', body).then((res) => {
        console.log(res);
      });
    }
  }
});



// Set the portfolio values in app
function setFunds(state, addedValue) {
  state.portfolio.available = state.portfolio.available - addedValue;
  state.portfolio.value = state.portfolio.value + addedValue;
}

// Adjust portfolio value for stock fluctuations
function adjustPortfolio(state) {
  let totalValue = 0;
  state.stocks.forEach((stock) => {
    let company = getCompanyById(state, stock.companyId);
    totalValue += company.price * stock.shares;
  });
  state.portfolio.value = totalValue;
}

// Check if portfolio can afford additional stock
function canAfford(portfolio, addedValue) {
  if (portfolio.available - addedValue > 0) {
    return true;
  } else {
    alert('You can not afford this purchase!');
    return false;
  }
}

// Check if this portfolio has this company already
function contains(stocks, companyId) {
  var containsId = false;
  if (Object.keys(stocks).length !== 0) {
    stocks.forEach((stock) => {
      if (stock.companyId == companyId) {
        containsId = true;
        return;
      }
    });
  }
  return containsId;
}

// Return the company object from id
function getCompanyById(state, id) {
  let theCompany = {};
  state.companies.forEach((company) => {
    if (company.id == id) {
      theCompany = company;
    }
  })
  return theCompany;
}
