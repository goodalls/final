const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Final';
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (request, response) => {});

app.get('/api/v1/items', (request, response) => {
  database('list')
    .select()
    .then(items => {
      response.status(200).json(items);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.use((request, response) => {
  response.status(404).send('Sorry can\'t find that!');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;