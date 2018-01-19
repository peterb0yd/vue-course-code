var express = require('express');
var _ = require('underscore');
var bodyParser = require('body-parser');
var db = require('./db.js');

var app = express();
var PORT = 3000;

// For parsing post data
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res) {
  res.sendFile('index.html')
});


// Load data
app.get('/load', function(req, res) {
  db.portfolio.findById(1).then((portfolio) => {
    var response = {};

    // Assign portfolio
    response.portfolio = portfolio.toPublicJSON();

    // Get Companies
    db.company.findAll().then(companies => {
      companies.forEach((company, i, arr) => {
        arr[i] = company.toPublicJSON();
      });

      // Assign companies
      response.companies = companies;

      // Get Stocks
      db.stock.findAll().then(stocks => {
        stocks.forEach((stock, i, arr) => {
          arr[i] = stock.toPublicJSON();
        });

        // Assign stocks
        response.stocks = stocks;

        console.log('..loading stocks ...');
        console.log(stocks);

        // Render response with stocks
        res.json(response);

      });
    });
  });
});


// Save data
app.post('/save', function(req, res) {
  var companies = req.body.companies;
  var portfolio = req.body.portfolio;
  var newStocks = req.body.stocks;

  // Update Companies
  companies.forEach(company => {
    db.company.findById(company.id).then(matchedCompany => {
      matchedCompany.update(company);
    })
  });

  // Update Portfolio
  db.portfolio.findById(portfolio.id).then(matchedPortfolio => {
    matchedPortfolio.update(portfolio).then(res => {
    })
  });

  // Initialize array to check for removed items
  let dbStockIds = [],
  newStockIds = [];

  // Iterate over new stocks from client
  newStocks.forEach((newStock, nsIndex) => {
    let matched = false;

    // Add Id to NEW STOCKS array
    newStockIds.push(newStock.companyId);

     // Iterate over stocks in database
    db.stock.findAll().then(dbStocks => {
      dbStocks.forEach((dbStock, dbIndex) => {

        // Add Id to DB STOCKS array
        if (dbStockIds.indexOf(dbStock.companyId) < 0)
          dbStockIds.push(dbStock.companyId);

        // Check for match
        if (dbStock.companyId == newStock.companyId) {
          matched = true;
          db.stock.update(newStock, {where: {companyId: dbStock.companyId}})
        }

        // Remove database stocks that were deleted in client
        if (nsIndex+1 == newStocks.length && dbIndex+1 == dbStocks.length) {
          let dbRemoveIds = dbStockIds.filter((companyId) => newStockIds.indexOf(companyId) < 0);
          db.stock.destroy({where: {companyId: dbRemoveIds}});
        }

      });
      if (!matched) db.stock.create(newStock);
    });
  });

  res.send('Success');
});




// Connect to Database
// db.sequelize.sync().then(function() {
db.sequelize.sync({force: true}).then(function() {

  db.company.bulkCreate([
    { name: 'Apple', price: 210 },
    { name: 'Google', price: 510 },
    { name: 'BMW', price: 53 },
    { name: 'Twitter', price: 16 }
  ]);

  db.portfolio.create({
    available: 10000,
    value: 0
  })

  app.listen(PORT, function() {
    console.log("Express listening on port " + PORT);
  });
});
