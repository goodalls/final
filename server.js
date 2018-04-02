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

app.get('/api/v1/items/:id', (request, response) => {
  const {id} = request.params;
  database('list')
    .select()
    .where('id', id)
    .then(items => {
      if (!items.length) {
        return response.status(404).json({ error: 'item requested not found' });
      }
      response.status(200).json(items);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/items', (request, response) => {
  const { name, packed } = request.body;
  for (let requiredParameter of ['name', 'packed']) {
    if (!request.body[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: { name: <string>, packed: <boolean> } You're missing the "${requiredParameter}" property`
      });
    }
  }

  database('list')
    .insert({
      name, 
      packed
    }, 'id')
    .then(item => {
      response.status(201).json({id: item[0]});
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.delete('/api/v1/items/:id', (request, response) => {
  const {id} = request.params;
  database('list')
  .where('id', id)
  .del()
  .then(item => {
    response.status(200).json(item);
  })
  .catch(error => {
    response.status(500).json({error});
  })
})

app.use((request, response) => {
  response.status(404).send('Sorry can\'t find that!');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;