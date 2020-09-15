const express = require('express');
const bodyParser = require('body-parser');
const multiparty = require('multiparty');
const cors = require('cors');

const handlers = require('./lib/handlers');

const { credentials } = require('./config');

const db = require('./db');

const app = express();

app.use('/api', cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3033;

app.use(express.static(__dirname + '/public'));

app.get('/api/vacations', handlers.getVacationApi);
app.get('/api/vacations/:sku', handlers.getVacationBySkuAPI);
app.post('/api/vacations/:sku/notify-when-in-season', handlers.addVacationInSeasonListenerAPI);
app.delete('/api/vacation/:sku', handlers.requestDeleteVacationAPI);

if(require.main === module) {
  app.listen(port, () => {
    console.log(`Express server started on port:${port}`);
  });
} else {
  module.exports = app;
}